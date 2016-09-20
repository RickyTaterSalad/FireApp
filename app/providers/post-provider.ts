import { Injectable } from '@angular/core';
import { ConfigProvider } from "./config-provider";
import {Day} from "../models/day";
import {Account} from "../models/account";
import {Post} from "../models/post";
import {Observable} from "rxjs";
import {DateUtils} from "../utils/date-utils";
import {HttpProvider} from "./http-provider";
import 'rxjs/add/operator/map';

/*
 Generated class for the PostProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PostProvider {
  postsEndpoint:string;
  dateUtils:DateUtils;
  constructor( private config:ConfigProvider, private httpProvider:HttpProvider) {
    this.postsEndpoint = config.restApiUrl + "/posts";
    this.dateUtils = new DateUtils();
  }

  getMyPosts:Function = function () {
    var url = this.postsEndpoint + "/myPosts";
    return this.httpProvider.get(url);
  };
  getMyOffers:Function = function () {
    var url = this.postsEndpoint + "/myOffers";
    return this.httpProvider.get(url);
  };
  getPostsForDay:Function = function (date:Day) {
    var url = this.postsEndpoint + "/" + date.year + "/" + (date.month + 1) + "/" + date.dayOfMonth;
    return this.httpProvider.get(url);
  };
  delete:Function = function (post:Post) {
    if (post && post.id) {
      let url = this.postsEndpoint + "/" + post.id;
      return this.httpProvider.delete(url);
    }
    else {
      return Observable.empty();
    }
  };
  postCountForCalendar:Function = function (startDay) {
    if (!startDay || !startDay.valueOf) {
      return Observable.empty();
    }
    else {
      let url = this.postsEndpoint + "/postCounts/" + startDay.valueOf();
      return this.httpProvider.get(url);
    }
  };
  userHasPostForDate:Function = function (day:Day) {
    ///hasPost/:year/:month/:day
    var dateTime = this.dateUtils.dateFromDay(day);
    if (!dateTime) {
      return Observable.empty();
    }
    else {
      let url = this.postsEndpoint + "/hasPost/" + day.year + "/" + (day.month + 1) + "/" + day.dayOfMonth;
      return this.httpProvider.get(url);
    }
  };
  claimPost:Function = function (post:Post, account:Account) {
    if (post && account) {
      let body = JSON.stringify({
        post: {
          id: post.id
        },
        claiment: {
          id: account.id
        }
      });
      let url = this.postsEndpoint + "/claim";
      return this.httpProvider.postJSON(url, body);
    }
    else {
      return Observable.empty();
    }
  };
  create:Function = function (post:Post) {
    if (post) {
      let body = JSON.stringify({
        post: {
          isTrade: post.isTrade,
          isOvertime: post.isOvertime,
          isAssignedHire: post.isAssignedHire,
          isRegular: post.isRegular,
          requestType: post.requestType,
          shift: post.shift.valueOf(),
          comments: post.comments
        }
      });
      return this.httpProvider.postJSON(this.postsEndpoint, body);
    }
    else {
      return Observable.empty();
    }
  };
}

