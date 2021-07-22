import {
    action,
    computed,
    makeObservable,
    observable,
    reaction,
    runInAction,
} from "mobx";
import agent from "../api/agent";
import { IUserProject } from "./../models/worksheet";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { setWorksheetProps } from "../common/util/util";
import { IStatistic, ISumaryBarChart } from "../models/statistic";
import { timeLog } from "console";
export default class StatisticStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
        reaction(
            ()=>this.predicate.keys(),
            () =>{
              console.log("Working")
            }
          )
    }
    @observable loadingInitial = false;
    @observable statisticRegistry = new Map();
    @observable sumaryBarChartRegistry = new Map();
    @observable sumaryBarChartArray: ISumaryBarChart[] = [];
    @observable statisticArray: IStatistic[] = [];
    @observable userProjects: IUserProject[] = [];
    @observable submitting = false;
    @observable target = "";
    @observable loading = false;
    @observable roleSelected: any;
    @observable projectSelected: any;
    @observable fromDay: Date | null = null;
    @observable today: Date | null = null;
    @observable predicate = new Map();
    @action setPredicate = (predicate: string, value: string | Date|number) => {
        this.predicate.set(predicate, value);
    }
    @computed get axiosParams() {
        const params = new URLSearchParams();
        this.predicate.forEach((value, key) => {
            if (key === 'fromDay' || key === 'toDay') {
                params.append(key, value.toISOString())
            }
            else {
                params.append(key, value);
            }
        })
        return params;
    }
    @action setFromDay = (fromDay: Date) => {
        this.fromDay = fromDay
    }
    @action setToDay = (today: Date) => {
        this.today = today
    }
    @action setRoleSelected = (roleSelected: string) => {
        this.roleSelected = roleSelected
    }
    @action setProjectSelected = (projectSelected: string) => {
        this.projectSelected = projectSelected
    }
    @action clearStatistic = () => {
        this.statisticRegistry.clear();
        this.statisticArray = []
    }
    @computed get worksheetBy() {
        return Array.from(this.statisticRegistry.values());
    }
    @action loadStatistics = async () => {
        this.loadingInitial = true;
        this.clearStatistic();
        try {
            const statistics = await agent.Statistics.list(this.axiosParams);
            // const statistics = await agent.Statistics.list(id, role, fromDay, toDay);
            runInAction(() => {
                this.loadingInitial = false;
                statistics.forEach((statistic) => {
                    console.log(statistic)
                    this.statisticRegistry.set(statistic.displayName, statistic);
                });
                this.statisticArray = Array.from(this.statisticRegistry.values())
            });
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            });
        } finally {

        }
    };
    @action loadSumary = async (id:string ,role:string,time:number) => {
        this.loadingInitial = true;
        try {
            const barchart = await agent.Statistics.barchart(id,role,time);
            runInAction(() => {
                this.loadingInitial = false;
                barchart.forEach((item) => {
                    this.sumaryBarChartRegistry.set(item.displayName, item);
                });
                this.sumaryBarChartArray = Array.from(this.sumaryBarChartRegistry.values())
            });
            return this.sumaryBarChartArray
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            });
        } finally {
        }
    };
   
    @action loadProjects = async () => {
        this.loadingInitial = true;
        try {
            this.userProjects=[]
            const project = await agent.Statistics.listProjects();
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


    getStatistic = (id: string) => {
        return this.statisticRegistry.get(id);
    };
}
