import { Day } from './day';

export class Week {
  days:Array<Day>;

  constructor() {
    this.days = new Array<Day>(7);

    for (let i = 0; i < this.days.length; i++) {
      this.days[i] = new Day();
    }
  }
}
