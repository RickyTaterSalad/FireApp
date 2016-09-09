import { Component } from '@angular/core';
import { NavController,NavParams,AlertController } from 'ionic-angular';
import {Post} from "../../models/post";
import {Day} from "../../models/day";
import {DateUtils} from "../../utils/date-utils";
import {DepartmentProvider} from "../../providers/department-provider";
import {PostProvider} from "../../providers/post-provider";
import {Department} from "../../models/department";

/*
 Generated class for the CreatePostPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
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

  constructor(private nav:NavController, private alertCtrl:AlertController, private navParams:NavParams, private departmentProvider:DepartmentProvider, private postProvider:PostProvider) {
    this.dateUtils = new DateUtils();
    this.day = navParams.data.day;
    if (!this.day) {
      this.showError("No Date To Create Post On");
      return;
    }
    departmentProvider.Department.subscribe((dept:Department) => {
      if (dept && dept.schedule) {
        this.post.shift =  this.dateUtils.dateFromDay(this.day);
        this.post.shiftStartTime =  dept.schedule.shiftStartTime;
      }
      else {
        this.showError("Could Not Retrieve Department");
        return;

      }
    });
  }

  createPost:Function = function () {
    this.postProvider.create(this.post).subscribe(
      (response) =>{
        this.handleCreated();
      },
      (err) =>{
        this.showError(err && err._body ? err._body : "Could Not Create Post")
      }
    )
  };
  handleCreated:Function = function(){
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: "Your Post Was Created.",
      buttons: ['OK']
    });
    alert.present();
    this.nav.pop();
  };
  showError:Function = function (message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
    this.nav.pop();
  };

}
