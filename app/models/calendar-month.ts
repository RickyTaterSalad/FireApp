import { Week } from './week';
export class CalendarMonth {
  weeks:Array<Week>;
  year:number;
  yearShort:string;
  month:string;

  constructor() {
    this.weeks = new Array<Week>(6);
    for (let i = 0; i < this.weeks.length; i++) {
      this.weeks[i] = new Week();
    }
  }
}
