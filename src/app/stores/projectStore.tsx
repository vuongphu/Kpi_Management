import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
  toJS,
} from "mobx";
import { SyntheticEvent } from "react";
import agent from "../api/agent";

import { history } from "../../index";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";

import {HubConnection, HubConnectionBuilder, LogLevel} from '@aspnet/signalr';
import { IProject } from "../models/project";
import { createJoin, setProjectProps } from './../common/util/util';
const LIMIT=3;
export default class ProjectStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
    reaction(
      ()=>this.predicate.keys(),
      () =>{
        this.page=0;
        this.projectRegistry.clear();
        this.loadProjects();
      }
    )
  }
  @observable activityRegistry = new Map();
  @observable projectRegistry = new Map();
  @observable loadingInitial = false;
  @observable project: IProject | null = null;
  @observable submitting = false;
  @observable target = "";
  @observable loading = false;
  @observable.ref hubConnection:HubConnection|null =null;
  @observable projectCount=0;
  @observable page=0;
  @observable predicate=new Map();
  @action setPredicate=(predicate:string,value:string|Date)=>{
    this.predicate.clear();
    if(predicate!=='all')
    {
      this.predicate.set(predicate,value);
    }
  }
  @computed get axiosParams()
  {
    const params =new URLSearchParams();
    params.append('limit',String(LIMIT));
    params.append('offset',`${this.page?this.page*LIMIT:0}`);
    this.predicate.forEach((value,key)=>{
      if(key==='startDate')
      {
        params.append(key,value.toISOString())
      }
      else{
        params.append(key,value);
      }
    })
    return params;
  }
  @computed get totalPage(){
    return Math.ceil(this.projectCount/LIMIT)
  }
  @action setPage= (page:number)=>{
    this.page=page
  }
 
  @action stopHubConnection=()=>{
    this.hubConnection!.stop();
  }
  @computed get projectsByDate() {
    console.log(
      this.groupProjectsByDate(Array.from(this.projectRegistry.values()))
    );
    return this.groupProjectsByDate(
      Array.from(this.projectRegistry.values())
    );
  }
  groupProjectsByDate(projects: IProject[]) {
    const sortedActivities = projects.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    console.log(sortedActivities)
    return Object.entries(
      sortedActivities.reduce(function (projects, project) {
        const date = project.date.toISOString().split("T")[0];
        projects[date] = projects[date]
          ? [...projects[date], project]
          : [project];
        return projects;
      }, {} as { [key: string]: IProject[] })
    );
  }

  @action loadProjects = async () => {
    this.loadingInitial = true;
    try {
      const projectsEnvelope = await agent.Projects.list(this.axiosParams);
      const {projects,projectCount}=projectsEnvelope;
      runInAction(() => {
        
        projects.forEach((project) => {
          console.log(project)
          setProjectProps(project, this.rootStore.userStore.user!);
          this.projectRegistry.set(project.id, project);
          this.projectCount=projectCount;
        });
        console.log( this.projectRegistry)
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };
  @action loadProject = async (id: string) => {
    let project = this.getProject(id);
    if (project) {
      this.project = project;
      return toJS(project);
    } else {
      this.loadingInitial = true;
      try {
        project = await agent.Projects.detail(id);
        runInAction(() => {
          setProjectProps(project, this.rootStore.userStore.user!);
    
          this.project = project;
          this.projectRegistry.set(project.id, project);
          this.loadingInitial = false;
        });
        return project;
      } catch (error) {
        console.log(error);
        // throw error;
      } finally {
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  };

  @action clearProject = () => {
    this.project = null;
  };

  getProject = (id: string) => {
    return this.projectRegistry.get(id);
  };
  @action createProject = async (project: IProject) => {
    console.log(project)
    this.submitting = true;
    try {
      await agent.Projects.create(project);
      const join = createJoin(this.rootStore.userStore.user!)
      join.isHost=true;
      let joins=[]
      project.comments=[]
      joins.push(join);
      project.joins=joins;
      project.isHost=true;
      runInAction(() => {
        this.projectRegistry.set(project.id, project);
        this.submitting = false;
        console.log(this.projectRegistry)
      });
      history.push(`/projects/${project.id}`);
    } catch (error) {
      toast.error("Problem submitting data");
      console.log(error.response);
    } finally {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };
  @action editProject = async (project: IProject) => {
    this.submitting = true;
    try {
      await agent.Projects.update(project);
      runInAction(() => {
        this.projectRegistry.set(project.id, project);
        this.project = project;
      });
      history.push(`/projects/${project.id}`);
    } catch (error) {
      toast.error("Problem submitting data");
      console.log(error.response);
    } finally {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };
  @action deleteProject = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: String
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Projects.delete(id);
      runInAction(() => {
        this.projectRegistry.delete(id);
      
      });
      history.push(`/projects`);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.submitting = false;
        this.target = "";
      });
    }
  };

  @action openCreateForm = () => {
    this.project = null;
  };

  @action cancelSelectedProject = () => {
    this.project = null;
  };
  @action joinProject = async () => {
    const join = createJoin(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Projects.join(this.project!.id);
      runInAction(() => {
        if (this.project) {
          this.project.joins.push(join);
          this.project.isGoing = true;
          this.projectRegistry.set(this.project.id, this.project);
          this.loading=false;
        }
      });
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loading = false;
        
      });
      toast.error("Problem signing up to Project");
    }
  };
  @action cancelJoin = async () => {
    this.loading = true;
    try {
      await agent.Projects.unjoin(this.project!.id);
      runInAction(() => {
        if (this.project) {
          this.project.joins = this.project.joins.filter(
            (a) => a.username !== this.rootStore.userStore.user!.username
          );
          this.project.isGoing = false;
          this.projectRegistry.set(this.project.id, this.project);
          this.loading=false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem signing up to Project");
    }
  };
}
