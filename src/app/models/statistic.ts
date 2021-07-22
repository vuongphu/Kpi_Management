
export interface IStatistic {
  displayName:string;
  kpiTarget: number;
  kpiEmployee: number;
  totalHour: number;
  totalProductivity: number;
  kpiTargetInHour: number;
  kpiEmpoyeeInHour: number;
  result: string;
}

export interface ISumaryBarChart {
  displayName:string;
  producility: number;
  hour: number;
}


