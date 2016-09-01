import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {Day} from '../../models/day';
import {MessageUserPage} from '../message-user/message-user';
import {CreatePostPage} from '../create-post/create-post';
import {RemovePostPage} from '../remove-post/remove-post';
import {OfferPostPage} from '../offer-post/offer-post';
import {PostFilter} from "../../models/post-filter";
import {Post} from "../../models/post";
import {Station} from "../../models/station";
import {PostProvider} from "../../providers/post-provider";
import {StationProvider} from "../../providers/station-provider";

import * as moment from 'moment';



/*
 Generated class for the CalendarDetailPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/calendar-detail/calendar-detail.html'
})
export class CalendarDetailPage {
  private day:any;
  private posts:Array<Post> = new Array<Post>();
  private searchParameters:PostFilter = {
    isCover: true,
    isTrade: true,
    isOnType: true,
    isOffType: true,
    sortField: "sortByCreatedDescending",
    showListOptions: false
  };
  private filteredPosts:Array<Post>;
  private nav:NavController;
  private stationList:Object;

  constructor(nav:NavController, private navParams:NavParams, private postProviders:PostProvider, private stationProvider:StationProvider) {
    this.day = navParams.data;
    this.nav = nav;

    stationProvider.Stations.subscribe(stationList => {
      this.stationList = stationList || {};
      postProviders.getPostsForDay(this.day).subscribe(posts=> {
        this.posts = this.filteredPosts = posts;
      });
    });
  }


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
    this.searchParameters.isCover = !this.searchParameters.isCover;
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


  offerOnPost:Function = function (post) {
    this.nav.push(OfferPostPage, {day: this.day, post: post});
  };
  removePost:Function = function () {
    //get the users posts
    this.nav.push(RemovePostPage, this.day);
  };
  createPost:Function = function () {
    this.nav.push(CreatePostPage, this.day);
  };

  filterResults:Function = function () {
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
      var overtimeGood = this.searchParameters.isCover && post.isOvertime;
      //  console.log("trade good: " + tradeGood + " overtime: " + overtimeGood);
      return tradeGood || overtimeGood;

    });
    this.filteredPosts = this.sortPostArray(tempFilteredPosts);
  };
  messageUser:Function = function (post) {
    if (post) {
      this.nav.push(MessageUserPage, post);
    }
  }
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

