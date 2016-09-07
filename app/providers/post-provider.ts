import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ConfigProvider } from "./config-provider";
import {Day} from "../models/day";
import {Account} from "../models/account";
import {Post} from "../models/post";
import {Observable} from "rxjs";
import {DateUtils} from "../utils/date-utils";

import {HelperMethods} from "../utils/helper-methods";
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
  helperMethods:HelperMethods = new HelperMethods();

  constructor(private http:Http, private config:ConfigProvider) {
    this.postsEndpoint = config.restApiUrl + "/posts";
    this.dateUtils = new DateUtils();
    this.http = http;
  }
  getMyPosts:Function = function(){
    let headers = new Headers();
    this.helperMethods.createAuthorizationHeader(headers);
    console.log("sending dept query");
    var url = this.postsEndpoint + "/myPosts";
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(res => res.json());
  };
  getMyOffers:Function = function(){
    let headers = new Headers();
    this.helperMethods.createAuthorizationHeader(headers);
    console.log("sending dept query");
    var url = this.postsEndpoint + "/myOffers";
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(res => res.json());
  };

  getPostsForDay:Function = function (date:Day) {
    let headers = new Headers();
    this.helperMethods.createAuthorizationHeader(headers);
    console.log("sending dept query");
    var url = this.postsEndpoint + "/" + date.year + "/" + (date.month +1) + "/" + date.dayOfMonth;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(res => res.json());
  };
  delete:Function = function (post:Post) {
    if (post && this.helperMethods.validObjectId(post.id)) {
      let headers = new Headers();
      this.helperMethods.createAuthorizationHeader(headers);
      let options = new RequestOptions({headers: headers});
      let url = this.postsEndpoint + "/" + post.id;
      return this.http.delete(url, options).map(res => res.json());
    }
    else {
      return Observable.empty();
    }
  };
  userHasPostForDate:Function = function (day:Day) {
    ///hasPost/:year/:month/:day
    var dateTime = this.dateUtils.dateFromDay(day);
    if (!dateTime) {
      return Observable.empty();
    }
    else {
      let headers = new Headers();
      this.helperMethods.createAuthorizationHeader(headers);
      console.log("headers");
      console.dir(headers);
      let url = this.postsEndpoint + "/hasPost/" + day.year + "/" +(day.month + 1) + "/" + day.dayOfMonth;
      return this.http.get(url, {headers: headers}).map(res => res.json());
    }
  };
  claimPost:Function = function(post:Post,account:Account){
    if (post && account) {
      let body = JSON.stringify({
        post: {
          id: post.id
        },
        claiment:{
          id: account.id
        }

      });
      let headers = this.helperMethods.generateJsonContentHeader();
      let options = new RequestOptions({headers: headers});
      console.dir(options);
      let url = this.postsEndpoint + "/claim";
      return this.http.post(url, body, options).map(res => res.json());
    }
    else {
      return Observable.empty();
    }
  }
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
      let headers = this.helperMethods.generateJsonContentHeader();
      let options = new RequestOptions({headers: headers});
      console.dir(options);
      return this.http.post(this.postsEndpoint, body, options).map(res => res.json());
    }
    else {
      return Observable.empty();
    }
  };
}

