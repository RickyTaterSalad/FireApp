import {Component,
  OnInit,
  OnDestroy,
  ElementRef,
  trigger, state, style, transition, animate, keyframes
} from '@angular/core';
import {NavController,Loading } from 'ionic-angular';
import { CalendarDetailPage } from '../calendar-detail/calendar-detail';
import {Day} from "../../models/day";
import {Week} from "../../models/week";
import {CalendarMonth} from "../../models/calendar-month";
import {MonthAndYear} from "../../models/month-and-year";
import {Department} from "../../models/department";
import {DepartmentProvider} from "../../providers/department-provider";
import {PostProvider} from "../../providers/post-provider";
import {ObjectContainsProperty} from "../../pipes/object-contains-property";

import {DateUtils} from "../../utils/date-utils";

import * as moment from 'moment';

@Component({
  templateUrl: 'build/pages/calendar/calendar.html',
  pipes: [ObjectContainsProperty],
  animations: [
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('visible <=> invisible', animate('1500ms linear'))
    ]),
    trigger('flyInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('outRight', style({
        transform: 'translate3d(105%, 0, 0)'
      })),
      state('outLeft', style({
        transform: 'translate3d(-105%, 0, 0)'
      })),
      transition('in => outLeft', animate('400ms ease-in')),
      transition('in => outRight', animate('400ms ease-in')),
      transition('outLeft => in', animate('400ms ease-out')),
      transition('outRight => in', animate('400ms ease-out'))
    ]),
  ]
})
export class CalendarPage/* implements OnInit, OnDestroy */ {
  calendarMonth:CalendarMonth = new CalendarMonth();
  daysOfWeek:string[] = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  monthLookup:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  flyInOutState:string = "in";
  fadeState:string = "visible";
  systemMonthAndYear:MonthAndYear;
  currentCalendarMonthAndYear:MonthAndYear;
  postCounts:Object = {};
  totalOn:number = 0;
  totalOff:number = 0;
  department:Department;
  dateUtils:DateUtils = new DateUtils();
  private nav:NavController;

  constructor(nav:NavController, private departmentController:DepartmentProvider, private postProvider:PostProvider) {
    this.nav = nav;
    this.updateCurrentSystemMonthAndYear();
    this.currentCalendarMonthAndYear = new MonthAndYear(this.systemMonthAndYear.month, this.systemMonthAndYear.year);

    departmentController.Department.subscribe((dept) => {
      this.department = dept;
      this.populateCalendar();

    });
  }

;

  private updateCurrentSystemMonthAndYear:Function = function () {
    let dt = new Date();
    this.systemMonthAndYear = new MonthAndYear(dt.getMonth(), dt.getFullYear());
  };
  showDetails:Function = function (evt:Event, day:Day) {
    if (evt && evt.srcElement) {
      evt.srcElement.classList.toggle("pressed");
      setTimeout(() => {
        evt.srcElement.classList.toggle("pressed");
      }, 450);
    }
    this.nav.push(CalendarDetailPage, day);
  };
  previousMonth:Function = function () {
    this.animateCalendarChange("outRight");
    if (this.currentCalendarMonthAndYear.month == 0) {
      this.currentCalendarMonthAndYear.year--;
      this.currentCalendarMonthAndYear.month = 11;
    }
    else {
      this.currentCalendarMonthAndYear.month--;
    }
    this.populateCalendar();
    this.endAnimation();

  };
  nextMonth:Function = function () {
    this.animateCalendarChange("outLeft");
    if (this.currentCalendarMonthAndYear.month == 11) {
      this.currentCalendarMonthAndYear.year++;
      this.currentCalendarMonthAndYear.month = 0;
    }
    else {
      this.currentCalendarMonthAndYear.month++;
    }
    this.populateCalendar();
    this.endAnimation();

  };

  goToCurrentMonth:Function = function () {
    this.animateCalendarChange("outRight");
    this.updateCurrentSystemMonthAndYear();
    this.currentCalendarMonthAndYear = this.systemMonthAndYear;
    this.populateCalendar();
    setTimeout(() => {
      this.flyInOutState = "in";
      this.fadeState = "visible";
    }, 100);
    this.endAnimation();
  };

  populateCalendar:Function = function () {
    this.updateCurrentSystemMonthAndYear();
    let scheduleOffset = this.getScheduleOffset(this.currentCalendarMonthAndYear.month, this.currentCalendarMonthAndYear.year);
    let date = new Date(this.currentCalendarMonthAndYear.year, this.currentCalendarMonthAndYear.month, 1);
    //get the day of the week the first day of the month falls on
    let dayOfTheWeekOffset = date.getDay();
    //back up the date so we fill in dates before the first day of the month (previous month)
    date.setDate(date.getDate() - dayOfTheWeekOffset);

    console.dir(date);
    //load the post count
    var obj = {year: date.getFullYear(), month: date.getMonth(), day: date.getDate()};
    console.dir(obj);
    var startMoment = moment.utc(obj);
    this.postCounts = {};
    this.postProvider.postCountForCalendar(startMoment).subscribe(
      (response)=> {
        if (response) {
          this.postCounts = response.days || {};
          this.totalOn = response.totalOn || 0;
          this.totalOff = response.totalOff || 0;
        }
        else {
          this.totalOn = 0;
          this.totalOff = 0;
          this.postCounts = {};
        }

      },
      (err) => {
      }
    );

    //load the calendar days
    var calendarMonth = new CalendarMonth();
    calendarMonth.yearShort = this.currentCalendarMonthAndYear.year.toString().substr(2, 2);
    //loop through all cells in the calendar, populating the date
    for (let i = 0; i < 6; i++)
      for (let j = 0; j < 7; j++) {
        var day = new Day();
        day.dayOfMonth = date.getDate();
        day.year = date.getFullYear();
        day.month = date.getMonth();
        day.utcDayStart = this.dateUtils.dateFromDay(day).valueOf();
        day.date = new Date(date.getTime());

        calendarMonth.weeks[i].days[j] = day;
        day.platoon = this.department.schedule.platoonSchedule[scheduleOffset % this.department.schedule.platoonSchedule.length];
        day.startTime = this.department.schedule.shiftStartTime;
        day.color = this.department.schedule.platoonColorCodes[day.platoon] || "#ffffff";
        date.setDate(date.getDate() + 1);
        scheduleOffset++
      }
    calendarMonth.year = this.currentCalendarMonthAndYear.year;
    calendarMonth.month = this.monthLookup[this.currentCalendarMonthAndYear.month];
    this.calendarMonth = calendarMonth;
  };
  private endAnimation:Function = function () {
    setTimeout(() => {
      this.flyInOutState = "in";
      this.fadeState = "visible";
    }, 100);
  };

  private getScheduleOffset:Function = function (month, year) {
    var dt = this.dateUtils.dateFromMS(this.department.schedule.platoonScheduleStartDate);
    var dt2 = moment([year, month, 1, 0, 0]);
    var diff = dt2.diff(dt, "days");
    return diff % (this.department.schedule.platoonSchedule.length);
  };
  private animateCalendarChange:Function = function (outDirection) {
    this.flyInOutState = outDirection;
    this.fadeState = "invisible";
  };

}
