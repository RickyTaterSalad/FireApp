import {Component } from '@angular/core';
import {NavParams, NavController,AlertController,LoadingController } from 'ionic-angular';
import {Day} from '../../models/day';
import {Account} from '../../models/Account';
import {MessageUserPage} from '../message-user/message-user';
import {CreatePostPage} from '../create-post/create-post';
import {CreateConversationPage} from '../create-conversation/create-conversation';
import {PostFilter} from "../../models/post-filter";
import {Post} from "../../models/post";
import {Station} from "../../models/station";
import {PostProvider} from "../../providers/post-provider";
import {AccountProvider} from "../../providers/account-provider";
import {StationProvider} from "../../providers/station-provider";
import {PostBriefComponent} from "../../components/post-brief/post-brief";

import * as moment from 'moment';



/*
 Generated class for the CalendarDetailPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/calendar-detail/calendar-detail.html',
  directives:[PostBriefComponent],
})
export class CalendarDetailPage {
  private day:any;
  private loading:boolean = true;
  yes:boolean = true;
  private account:Account = {
    firstName: "",
    lastName: "",
    platoon: "",
    department: "",
    station: "",
    id: "",
    photo: "",
    assignedHireCode: ""
  };
  private posts:Array<Post> = new Array<Post>();
  private searchParameters:PostFilter = {
    isOvertime: true,
    isTrade: true,
    isOnType: true,
    isOffType: true,
    sortField: "sortByCreatedDescending",
    showListOptions: false
  };
  private filteredPosts:Array<Post>;

  constructor(private Loading:LoadingController,private nav:NavController, private accountProvider:AccountProvider, private alertCtrl:AlertController, private navParams:NavParams, private postProvider:PostProvider, private stationProvider:StationProvider) {
    this.day = navParams.data;
  }
  private showMessage:Function = function (title,message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  };
  private showError:Function = function (message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  };

  onPageDidEnter() {
    console.dir(arguments);
   this.reloadPosts();
  }

  private reloadPosts:Function = function(){
    console.log("reloadPosts");
    this.loading = true;
    this.accountProvider.self().subscribe((account) => {
      console.log("Account");
      console.dir(account);
      this.account = account;
      this.postProvider.getPostsForDay(this.day).subscribe(posts=> {
        this.posts = this.filteredPosts = posts;
        this.loading  = false;
      });
    })
  };


  private sortPostArray:Function = function (postArray:Array<Post>) {
    if (!postArray || !this.searchParameters || !this.searchParameters.sortField) {
      return;
    }
    if (this[this.searchParameters.sortField] instanceof Function) {
      console.log("sorting by " + this.searchParameters.sortField);
      return postArray.sort(this[this.searchParameters.sortField]);
    }
    else {
      console.log("cannot sort by field: " + this.searchParameters.sortField);
      return postArray;
    }
  };
  toggleTrade:Function = function () {
    //  console.log("toggle trade");
    this.searchParameters.isTrade = !this.searchParameters.isTrade;
    this.filterResults();
  };
  toggleOvertime:Function = function () {
    //console.log("toggle overtime");
    this.searchParameters.isOvertime = !this.searchParameters.isOvertime;
    this.filterResults();
  };
  toggleOff:Function = function () {
    //  console.log("toggle off");
    this.searchParameters.isOffType = !this.searchParameters.isOffType;
    this.filterResults();
  };
  toggleOn:Function = function () {
    // console.log("toggle on");
    this.searchParameters.isOnType = !this.searchParameters.isOnType;
    this.filterResults();
  };
  sortPosts:Function = function () {
    this.sortPostArray(this.filteredPosts);
  };
  messageUser:Function = function (post) {
    this.nav.push(CreateConversationPage, {day: this.day, post: post});
  };
  removePost:Function = function (post) {
    if(!post){
      return;
    }
    let confirm = this.alertCtrl.create({
      title: 'Remove Post?',
      message: 'Are You Sure You Want To Remove This Post?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.postProvider.delete(post).subscribe(
              (response)=> {
                this.reloadPosts();
              },
              (err) =>{
                this.showError("Could Not Delete Post.");
              }
            )
          }
        },
        {
          text: 'No',
          handler: () => {

          }
        }

      ]
    });
    confirm.present();

  };
  createPost:Function = function () {
    this.postProvider.userHasPostForDate(this.day).subscribe(
        response => {
        this.nav.push(CreatePostPage, {day: this.day});
      },
      (err) => {this.showError(err && err._body ? err._body : "Could Not Create Post")}
    );
  };

  filterResults:Function = function () {
    console.dir(this.searchParameters);
    // console.dir(this.searchParameters);
    let tempFilteredPosts = this.posts.filter((post:Post) => {
      if (!this.searchParameters.isOffType && post.requestType == "off") {
        // console.log("off type and shift is off. return false");
        return false;
      }
      if (!this.searchParameters.isOnType && post.requestType == "on") {
        //  console.log("on type and shift is on. return false");
        return false;
      }
      var tradeGood = this.searchParameters.isTrade && post.isTrade;
      var overtimeGood = this.searchParameters.isOvertime && post.isOvertime;
      //  console.log("trade good: " + tradeGood + " overtime: " + overtimeGood);
      return tradeGood || overtimeGood;

    });
    this.filteredPosts = this.sortPostArray(tempFilteredPosts);
  };
  private sortByLastNameAscending:Function = function (a:Post, b:Post):Number {
    if (a.creator.lastName < b.creator.lastName) {
      return -1;
    } else if (a.creator.lastName > b.creator.lastName) {
      return 1;
    } else {
      return 0;
    }
  };


  private sortByCreatedAscending:Function = function (a:Post, b:Post):Number {
    if (a.created < b.created) {
      return -1;
    } else if (a.created > b.created) {
      return 1;
    } else {
      return 0;
    }
  };

  private sortByCreatedDescending:Function = function (a:Post, b:Post):Number {
    if (a.created < b.created) {
      return 1;
    } else if (a.created > b.created) {
      return -1;
    } else {
      return 0;
    }
  };
  private sortByStationNumberAscending:Function = function (a:Post, b:Post):Number {
    if (a.station.stationNumber < b.station.stationNumber) {
      return 1;
    } else if (a.station.stationNumber > b.station.stationNumber) {
      return -1;
    } else {
      return 0;
    }
  };

}
