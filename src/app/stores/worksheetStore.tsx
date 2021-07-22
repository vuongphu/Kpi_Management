import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";
import { SyntheticEvent } from "react";
import agent from "../api/agent";
import { IUserProject, IWorksheet, IWorksheetSumary } from "./../models/worksheet";
import { history } from "./../../index";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import {  setWorksheetProps } from "../common/util/util";


export default class WorksheetStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
    reaction(
      () => this.autorun,
      roleSelected => {
        console.log(roleSelected)
      }
    )
  }
  @observable confirmsumary : IWorksheetSumary[]=[] ;
  @observable worksheetRegistry = new Map();
  @observable loadingInitial = false;
  @observable worksheet: IWorksheet | null = null;
  @observable worksheetArray: IWorksheet[] = [];
  @observable userProjects: IUserProject[] = [];
  @observable leadProjects: IUserProject[] = [];
  @observable submitting = false;
  @observable target = "";
  @observable loading = false;
  @observable roleSelected: any;
  @observable projectSelected: any;
  @observable roleSelectedByLead: any;
  @observable projectSelectedByLead: any;
  @observable autorun = "";
  @action setRoleSelected = (roleSelected: string) => {
    this.roleSelected = roleSelected
  }
  @action setProjectSelected = (projectSelected: string) => {
    this.projectSelected = projectSelected
  }
  @action setRoleSelectedByLead = (roleSelected: string) => {
    this.roleSelectedByLead = roleSelected
  }
  @action setProjectSelectedByLead = (projectSelected: string) => {
    this.projectSelectedByLead = projectSelected
  }
  @action clearWorksheet = () => {
    this.worksheetRegistry.clear();
   
    this.worksheetArray=[]
  }
  @computed get worksheetBy() {
    return Array.from(this.worksheetRegistry.values());
  }
 
  @action createWorksheet = async (worksheet: IWorksheet, role: string,projetId:string) => {
    this.submitting = true;
  
    try {
      await agent.Worksheets.create(worksheet, role,projetId);
      runInAction(() => {
        this.worksheetRegistry.set(worksheet.id, worksheet);
        this.worksheetArray = Array.from(this.worksheetRegistry.values())
        this.submitting = false;
      
      });
    } catch (error) {
      toast.error("Problem submitting data");
   
    } finally {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };
  @action loadWorkSheets = async (id: string, role: string) => {
    this.loadingInitial = true;
    this.worksheetArray = []
    this.worksheetRegistry.clear()
    try {
      const worksheets = await agent.Worksheets.list(id, role);
     
      runInAction(() => {
        this.loadingInitial = false;
        worksheets.forEach((worksheet) => {
          setWorksheetProps(worksheet)
          this.worksheetRegistry.set(worksheet.id, worksheet);
        });
        this.worksheetArray = Array.from(this.worksheetRegistry.values())
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    } finally {
    
    }
  };
  @action loadWorkSheetsForLead = async (id: string, role: string) => {
    this.loadingInitial = true;
    this.worksheetArray = []
    this.worksheetRegistry.clear()
    try {
      const worksheets = await agent.Worksheets.listForLead(id, role);
      runInAction(() => {
        this.loadingInitial = false;
        worksheets.forEach((worksheet) => {
          setWorksheetProps(worksheet)
          this.worksheetRegistry.set(worksheet.id, worksheet);
        });
        this.worksheetArray = Array.from(this.worksheetRegistry.values())
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    } finally {
    
    }
  };
  @action loadUserProjects = async () => {
    this.loadingInitial = true;
    try {
      this.userProjects=[]
      const project = await agent.Worksheets.listProjectsJoined();
      runInAction(() => {
        this.userProjects = project;
        this.loadingInitial = false;
      })
    } catch (error) {
      toast.error('Problem loading projects');
      runInAction(() => {
        this.loadingInitial = false;
      })
    }
  }
  @action loadConfirmSumary = async () => {
    this.loadingInitial = true;
    try {
      const confirmsumary = await agent.Worksheets.sumary();
      runInAction(() => {
        this.confirmsumary = confirmsumary;
        this.loadingInitial = false;
      })
    } catch (error) {
      toast.error('Problem loading projects');
      runInAction(() => {
        this.loadingInitial = false;
      })
    }
  }
  @action loadHostProjects = async () => {
    this.loadingInitial = true;
    try {
      this.leadProjects=[]
      const project = await agent.Worksheets.listProjectsLead();
      runInAction(() => {
        this.leadProjects = project;
     
        this.loadingInitial = false;
      })
    } catch (error) {
      toast.error('Problem loading projects');
      runInAction(() => {
        this.loadingInitial = false;
      })
    }
  }
  @action editWorksheet = async (worksheet: IWorksheet,role:string,projectId:string) => {
    this.submitting = true;
    try {
      await agent.Worksheets.update(worksheet,role,projectId);
      runInAction(() => {
        this.submitting =false;
        this.worksheetRegistry.set(worksheet.id, worksheet);
        this.worksheet = worksheet;
        this.worksheetArray = Array.from(this.worksheetRegistry.values())
      });
    } catch (error) {
      toast.error("Problem submitting data");
    } finally {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };
  @action editWorksheetByHost = async (ids: string[],role:string,projectId:string) => {
    this.submitting = true;
    try {
      await agent.Worksheets.updateByLead(ids,role,projectId,true);
      runInAction(() => {
        this.submitting =false;
        ids.forEach((id)=>{
          let worksheetById =this.worksheetRegistry.get(id);
          worksheetById.confirm=true;
          this.worksheetRegistry.set(id, worksheetById);
        })
        this.worksheetArray = Array.from(this.worksheetRegistry.values())
      });
    } catch (error) {
      toast.error("Problem submitting data");
      console.log(error.response);
    } finally {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };
  @action deleteWorksheet = async (id: string,role:string,projectId:string) => {
    this.loadingInitial = true;
  
    await agent.Worksheets.delete(id,role,projectId)
    // const user = this.rootStore.userStore.user!;
    try {
      runInAction(() => {
        this.worksheetRegistry.delete(id);
        this.worksheetArray = Array.from(this.worksheetRegistry.values())
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };
  @action loadWorksheet = async (id: string) => {
    let worksheet = this.getWorksheet(id);
    console.log(worksheet)
    this.worksheet = worksheet;
    // worksheet.day= undefined;
    // worksheet.time= undefined;
    return worksheet;

  };
 
  getWorksheet = (id: string) => {
    return this.worksheetRegistry.get(id);
  };
}
