import { IStatistic } from './../../models/statistic';
import { IWorksheet } from './../../models/worksheet';
import { IUser } from './../../models/user';
import { IJoin, IProject } from '../../models/project';
import { addHours } from 'date-fns';
export const combineDateAndTime = (date: Date, time: Date) => {
    // const timeString = time.getHours() + ":" + time.getMinutes() + ":00";
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // const dateString = `${year}-${month}-${day}`;
    const dateString =date.toISOString().split('T')[0];
    const timeString =time.toISOString().split('T')[1];
    return new Date(dateString + ' ' + timeString)

}
// : React.FC<IProps> 
export const getLocationZone = () => {
    const offset=new Date().getTimezoneOffset()*-1;
    return offset/60 ;

}
export const changeZoneDate = (date: Date) => {
    return addHours(date, 7)

}

export const setProjectProps = (project: IProject, user: IUser) => {
    project.date = new Date(project.date);
    project.isHost = project.joins.some(
        a => a.username === user.username && a.isHost
    )
    project.isGoing = project.joins.some(
        a => a.username === user.username && !project.isHost
    )

}
export const setWorksheetProps = (project: IWorksheet) => {
    project.day = new Date(project.day);
    project.hour = new Date(project.hour);

}

export const createJoin = (user: IUser): IJoin => {
    return {
        displayName: user.displayName,
        isHost: false,
        username: user.username,
        image: user.image!
    }
}
