import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
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


  constructor(private http:Http, private config:ConfigProvider,private httpProvider:HttpProvider) {
    this.postsEndpoint = config.restApiUrl + "/posts";
    this.dateUtils = new DateUtils();
    this.http = http;
  }

  getMyPosts:Function = function () {
    let headers =  this.httpProvider.createAuthorizationHeader();
    var url = this.postsEndpoint + "/myPosts";
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(res => res.json());
  };
  getMyOffers:Function = function () {
    let headers =  this.httpProvider.createAuthorizationHeader();
    var url = this.postsEndpoint + "/myOffers";
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(res => res.json());
  };

  getPostsForDay:Function = function (date:Day) {
    let headers =  this.httpProvider.createAuthorizationHeader();
    var url = this.postsEndpoint + "/" + date.year + "/" + (date.month + 1) + "/" + date.dayOfMonth;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(res => res.json());
  };
  delete:Function = function (post:Post) {
    if (post && this.helperMethods.validObjectId(post.id)) {
      let headers =  this.httpProvider.createAuthorizationHeader();
      let options = new RequestOptions({headers: headers});
      let url = this.postsEndpoint + "/" + post.id;
      return this.http.delete(url, options).map(res => res.json());
    }
    else {
      return Observable.empty();
    }
  };
  postCountForCalendar:Function = function (startDay) {
    return Observable.create((observer) => {
      if (!startDay || !startDay.valueOf) {
        observer.next({});
        observer.complete()
      }
      else {
        let headers =  this.httpProvider.createAuthorizationHeader();
        let url = this.postsEndpoint + "/postCounts/" + startDay.valueOf();
        return this.http.get(url, {headers: headers}).map(res => res.json()).subscribe(
          (response)=> {
            observer.next(response);
            observer.complete();
          }
        )
      }
    });

  };
  userHasPostForDate:Function = function (day:Day) {
    ///hasPost/:year/:month/:day
    var dateTime = this.dateUtils.dateFromDay(day);
    if (!dateTime) {
      return Observable.empty();
    }
    else {
      let headers =  this.httpProvider.createAuthorizationHeader();
      let url = this.postsEndpoint + "/hasPost/" + day.year + "/" + (day.month + 1) + "/" + day.dayOfMonth;
      return this.http.get(url, {headers: headers}).map(res => res.json());
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
      let headers = this.httpProvider.generateJsonContentHeader();
      let options = new RequestOptions({headers: headers});
      let url = this.postsEndpoint + "/claim";
      return this.http.post(url, body, options).map(res => res.json());
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
      let headers = this.httpProvider.generateJsonContentHeader();
      let options = new RequestOptions({headers: headers});
      return this.http.post(this.postsEndpoint, body, options).map(res => res.json());
    }
    else {
      return Observable.empty();
    }
  };
}

