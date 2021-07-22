
export interface IWorksheet {
  id: string;
  productivity: number;
  day: Date;
  hour: Date;
  note: string;
  confirm: boolean;
  displayName?:string;
}
export interface IWorksheetSumary {
  title: string;
  ops: number;
  qcs: number;
}
export interface IWorksheetFormValues extends Partial<IWorksheet> {
  time?: Date
}
export class WorksheetFormValues implements IWorksheetFormValues {
  id?: string = undefined;
  productivity?: number;
  day?: Date = undefined;
  hour?: Date = undefined;
  note: string = '';
  confirm: boolean = false;
  constructor(init?: IWorksheetFormValues) {
    if (init && init.hour) {
      init.time = init.hour
    }

    Object.assign(this, init);
  }
}
export interface IUserProject {
  id: string,
  title: string,
  level: string,
  date: Date,
}