import * as moment from 'moment';

export class DateUtils {
  DAY:string = "day";

//month is passed with january as 1. we decrement internally
  public dateFromDayMonthYear:Function = function (day, month, year) {
    if (!day || (!month && month != 0) || !year) {
      return null;
    }
    try {
      var obj = {year: year, month: month - 1, day: day};
      return moment.utc(obj);
    }
    catch (err) {
      return null;
    }
  };
//date in ms: 1472586908000
  public dateFromMS:Function = function (/*Number*/ dateInMs, /* {startOfDay:true|false,endOfDay:true|false} */options) {
    if (!dateInMs) {
      return null;
    }
    var date = moment.utc(dateInMs);
    if (options) {
      if (options.startOfDay) {
        date.minute(0);
        date.second(0);
        date.hour(0);
        date.millisecond(0);
      }
      else if (options.endOfDay) {
        date.minute(59);
        date.second(59);
        date.hour(23);
        date.millisecond(999);
      }
    }
    return date;
  };
  public isDateBeforeToday:Function = function (/* Moment */ date) {
    if (!date) {
      return null;
    }
    return date.isBefore(this.todayUtc(), this.DAY);

  };

  public isDateToday:Function = function (/* Moment */ date) {
    if (!date) {
      return null;
    }

    return date.isSame(this.todayUtc(), this.DAY);

  };
  public isDateAfterToday:Function = function (/* Moment */ date) {
    if (!date) {
      return null;
    }
    return date.isAfter(this.todayUtc(), this.DAY);
  };
  todayUtc:Function = function () {
    return moment().utc();
  };
}
