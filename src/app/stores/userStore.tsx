import { action, computed, observable, makeObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IUser, IUserFormValues, IUserManager } from "../models/user";
import { RootStore } from "./rootStore";
import { history } from './../../index';
import { toast } from "react-toastify";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }
  @observable user: IUser | null = null;
  @observable userManager: IUserManager[] = [];
  @observable loading = false;
  @observable editing = false;
  @observable userEdit: string | null = null;
  @observable userChoose: IUserManager | null = null;
  @action setEdit = (editing: boolean, username: string) => {
    if (this.editing) {
      this.userEdit = null
      this.userChoose = null

    }

    this.userChoose = this.userManager.filter(x => x.username == username)[0]
    this.editing = editing;
    this.userEdit = username;
    console.log(this.userChoose)



  }

  @computed get isLoggedIn() {
    return !!this.user;
  }
  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      })
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modelStore.closeModal();
      history.push('/projects')
    } catch (error) {
      throw error
    }
  };
  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      runInAction(() => {
        this.user = user;
      })
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modelStore.closeModal();
      history.push('/projects')

    } catch (error) {
      throw error
    }
  };
  @action getUser = async () => {

    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;

      })
    }
    catch (error) {
      console.log(error);

    }
  }
  @action deleteUser = async (user: IUserManager) => {
    this.loading = true;
    try {
      await agent.User.delete(user.username)
      runInAction(() => {
        this.userManager = this.userManager!.filter(a => a.username !== user.username)
        this.loading = false;
      })
    }
    catch (error) {
      toast.error('Problem deleting user')
      runInAction(() => {
        this.loading = false;
      })
      console.log(error)
    }
  }
  @action createUser = async (values: IUserFormValues) => {
    this.loading = true;
    try {
      const user = await agent.User.create(values);
      runInAction(() => {
        this.userManager.push(user)
        this.loading = false;
      })
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      })
      throw error

    }
  };
  @action updateUser = async (user: Partial<IUserManager>) => {
    this.loading = true;
    try {
      await agent.User.update(user)
      runInAction(() => {
        this.loading = false;
        this.editing = false;
        this.userEdit = null;
        const objIndex = this.userManager.findIndex((obj => obj.username == user.username));
        var obj: IUserManager = {
          displayName: user.displayName!,
          email:user.email!,
          role:user.role!,
          username:user.username!,
          image:user.image!,
          token:user.token!
    
        };
        this.userManager[objIndex]= obj
      })
    }
    catch (error) {
      toast.error('Problem Update User')
      runInAction(() => {
        this.loading = false;
      })
      throw error
    }
  }
  @action getListUser = async () => {
    this.loading = true;
    try {
      const usermanager = await agent.User.list();
      runInAction(() => {
        this.userManager = usermanager
        this.loading = false;
      })
    }
    catch (error) {
      console.log(error);
      this.loading = false;
    }
  }
  @action logout = async () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/')
  };

}
