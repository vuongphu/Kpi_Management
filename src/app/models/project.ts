export  interface IProjectEnvelope{
    projects:IProject[];
    projectCount:number;
}

export  interface IProject{
    id:string;
    title:string;
    description:string;
    level:string;
    date:Date;
    opKpi:number;
    qcKpi:number;
    isHost:boolean;
    isGoing:boolean;
    joins:IJoin[];
    comments:IComment[];
}

export  interface IComment{
    id:string;
    createdAt:Date;
    body:string;
    username:string;
    displayName:string;
    image:string;
}

export interface IProjectFormValues extends Partial<IProject>{
    time?:Date
}
export class ProjectFormValues implements IProjectFormValues{
    id?:string= undefined;
    title:string= '';
    description:string='';
    level:string='';
    opKpi?:number=undefined;
    qcKpi?:number=undefined;
    date?:Date= undefined;
    time?:Date=undefined;
  
    constructor(init?:IProjectFormValues){
        if (init && init.date){
             init.time=init.date
        }
        Object.assign(this,init);
    }
}
export interface IJoin{
    username:string;
    displayName:string;
    isHost:boolean;
    image:string;
    following?:boolean,

}
