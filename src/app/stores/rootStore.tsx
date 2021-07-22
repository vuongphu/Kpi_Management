import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from './commonStore';
import ModelStore from './modelStore';
import ProfileStore from "./profileStore";
import WorksheetStore from './worksheetStore';
import ProjectStore from './projectStore';
import StatisticStore from './statisticStore';
configure({ enforceActions: "always" });
export class RootStore {
  userStore: UserStore;
  commonStore: CommonStore;
  modelStore: ModelStore;
  profileStore: ProfileStore;
  worksheetStore: WorksheetStore
  projectStore: ProjectStore
  statisticStore: StatisticStore
  constructor() {
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modelStore = new ModelStore(this);
    this.profileStore = new ProfileStore(this);
    this.worksheetStore = new WorksheetStore(this);
    this.projectStore = new ProjectStore(this);
    this.statisticStore = new StatisticStore(this);
  }
}
export const RootStoreContext = createContext(new RootStore());
