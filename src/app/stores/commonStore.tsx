import { RootStore } from './rootStore';
import { action, observable, reaction,  makeObservable } from 'mobx';

export default class CommonStore {

    rootStore:RootStore;
    constructor(rootStore:RootStore){
        this.rootStore=rootStore 
        makeObservable(this);
        reaction(
            () =>this.token,
            token =>{
                if (token){
              
                    window.localStorage.setItem('jwt',token);
                }
                else
                {
          
                    window.localStorage.removeItem('jwt');
                }
            }
        )
       
         
    }
    @observable tagetMenu:string="";
    @observable token: string | null=window.localStorage.getItem('jwt');
    @observable appLoaded=false;
    @action setTagetMenu()
    {
        
    }
    @action setToken =(token:string | null)=>{
        // window.localStorage.setItem('jwt',token!);
        this.token=token;
    }
    @action setAppLoaded =()=>{
        this.appLoaded=true;
        
    }
}
