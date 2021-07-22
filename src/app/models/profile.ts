import { category } from './../common/options/categoryOptions';
export interface IProfile{
    displayName:string,
    username:string,
    bio:string,
    image:string,
    photos:IPhoto[],
    following:boolean,
    followersCount:number,
    followingCount:number,

}
export interface IPhoto{
    id:string,
    url:string,
    isMain:boolean,
}
