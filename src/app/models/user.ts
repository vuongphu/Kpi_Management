export interface IUser{
    username:string;
    displayName:string;
    token:string;
    image?:string;
    role:string;
}

export interface IUserManager extends IUser{
    role:string;
    email:string;
}
export interface IUserFormValues{
    email:string;
    password:string;
    displayName?:string;
    username?:string;
    role?:string;
}