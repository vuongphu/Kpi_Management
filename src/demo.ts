let demo:number|string;
demo='42';
export interface ICar{
    color:string;
    model:string;
    topspeed?:number;
}
const car1:ICar={
    color:'Blue',
    model:'BMW'
}
const car2:ICar={
    color:'Blue',
    model:'BMWX',
    topspeed:100
}
const multiply= (x:number,y:number)=>{
    (x*y).toString();
}
export const cars=[car1,car2];
