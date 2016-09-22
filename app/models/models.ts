//interfaces
export interface Account {
  firstName:string;
  lastName:string;
  platoon:string;
  department:string;
  station:string;
  id:string;
  photo:string;
  assignedHireCode:string;
}
export interface Conversation {
  id:string;
  creator:string;
  post:Post;
  collapsed:boolean;
  messages:Array<Message>;
}
export interface Department {
  name:string;
  platoons:string[];
  schedule: Schedule;
  ranks:string[];
}
export interface Message {
  conversation:Conversation;
  sender:string;
  recipient:string;
  content:string;
}
export interface Post {
  id:string,
  creator:Account,
  shift:Number
  department:string,
  station:Station,
  isTrade:boolean
  isOvertime:boolean
  isAssignedHire:boolean,
  isRegular:boolean,
  requestType:string,
  shiftStartTime:string,
  platoon:string,
  created:Number,
  comments:string,
  conversationCount:number;
}
export interface PostFilter {
  isTrade:boolean,
  isOvertime:boolean,
  isOnType:boolean,
  isOffType:boolean,
  sortField:string

}
export interface Schedule {
  name:string,
  numberOfPlatoons:number,
  platoonSchedule:string,
  shiftLengthInHours:number,
  shiftStartTime:string,
  platoonScheduleStartDate:number
  platoonColorCodes:Object
}


export interface Station {
  id:string;
  stationNumber:string;
  community:string;
  street:string;
  city:string;
  state:string;
  zip:Number;
}


//classes

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
export class Day {
  date:Date;
  month:number;
  year:number;
  dayOfMonth:number;
  platoon:string;
  startTime:string;
  color:string = "#DFDFDF";
  utcDayStart:number;
}
export class MonthAndYear {
  year:number;
  month:number;

  constructor(month:number, year:number) {
    this.year = year;
    this.month = month;
  }
}
export class Week {
  days:Array<Day>;

  constructor() {
    this.days = new Array<Day>(7);

    for (let i = 0; i < this.days.length; i++) {
      this.days[i] = new Day();
    }
  }
}
