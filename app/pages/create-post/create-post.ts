import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Post,Day,Department,Account} from "../../models/models";
import {DateUtils} from "../../utils/date-utils";
import {DepartmentProvider} from "../../providers/department-provider";
import {PostProvider} from "../../providers/post-provider";
import {AlertProvider} from "../../providers/alert-provider";
import {MomentToString} from "../../pipes/moment-to-string";
@Component({
  templateUrl: 'build/pages/create-post/create-post.html',
  pipes: [MomentToString]

})
export class CreatePostPage {
  post:Post = {
    conversationCount: 0,
    id: null,
    creator: null,
    shift: null,
    isTrade: true,
    comments: "",
    isOvertime: true,
    isAssignedHire: false,
    isRegular: true,
    requestType: "on",
    shiftStartTime: null,
    platoon: null,
    department: null,
    station: null,
    created: null
  };
  day:Day;
  dateUtils:DateUtils;
  account:Account;
  calendarStart:number;

  constructor(private alertProvider:AlertProvider, private nav:NavController, private navParams:NavParams, private departmentProvider:DepartmentProvider, private postProvider:PostProvider) {
    this.dateUtils = new DateUtils();
    this.day = navParams.data.day;
    this.calendarStart = navParams.data.calendarStart;
    this.account = navParams.data.account;
    if (!this.day) {
      this.nav.pop();
      this.alertProvider.showShortMessage("No Date To Create Post On", "Error");
      return;
    }
    departmentProvider.Department().subscribe((dept:Department) => {
      if (dept && dept.schedule) {
        this.post.shift = this.dateUtils.dateFromDay(this.day);
        this.post.shiftStartTime = dept.schedule.shiftStartTime;
      }
    });
  }

  createPost:Function = function () {
    this.postProvider.create({post:this.post,calendarStart:this.calendarStart}).subscribe(
      () => {
        this.handleCreated();
      }
    )
  };
  handleCreated:Function = function () {
    this.nav.pop();
    this.alertProvider.showShortMessage("Your Post Was Created", "Success");
  };
}
