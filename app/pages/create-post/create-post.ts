import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Post,Day,Department} from "../../models/models";
import {DateUtils} from "../../utils/date-utils";
import {DepartmentProvider} from "../../providers/department-provider";
import {PostProvider} from "../../providers/post-provider";
import {AlertProvider} from "../../providers/alert-provider";
@Component({
  templateUrl: 'build/pages/create-post/create-post.html',
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

  constructor(private alertProvider:AlertProvider, private nav:NavController, private navParams:NavParams, private departmentProvider:DepartmentProvider, private postProvider:PostProvider) {
    this.dateUtils = new DateUtils();
    this.day = navParams.data.day;
    if (!this.day) {
      this.nav.pop();
      this.alertProvider.showMessage("No Date To Create Post On", "Error");
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
    this.postProvider.create(this.post).subscribe(
      () => {
        this.handleCreated();
      }
    )
  };
  handleCreated:Function = function () {
    this.nav.pop();
    this.alertProvider.showMessage("Your Post Was Created", "Success");
  };
}
