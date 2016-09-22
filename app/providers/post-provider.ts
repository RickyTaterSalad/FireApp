import { Injectable } from '@angular/core';
import { ConfigProvider } from "./config-provider";
import {Day,Account,Post} from "../models/models";
import {Observable} from "rxjs";
import {DateUtils} from "../utils/date-utils";
import {HttpProvider} from "./http-provider";
import {AlertProvider} from "./alert-provider";

@Injectable()
export class PostProvider {
  postsEndpoint:string;
  dateUtils:DateUtils;

  constructor(private config:ConfigProvider, private httpProvider:HttpProvider, private alertProvider:AlertProvider) {
    this.postsEndpoint = config.restApiUrl + "/posts";
    this.dateUtils = new DateUtils();
  }

  getMyPosts:Function = function () {
    var sub = this.httpProvider.get(this.postsEndpoint + "/myPosts");
    var subscription = sub.subscribe(()=> {
    }, (err)=> {
      this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Retrieve Your Posts", "Error");
    });
    return sub;

  };
  getMyOffers:Function = function () {
    var sub = this.httpProvider.get(this.postsEndpoint + "/myOffers");
    var subscription = sub.subscribe(()=> {
    }, (err)=> {
      this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Retrieve Your Offers", "Error");
    });
    return sub;
  };
  getPostsForDay:Function = function (date:Day) {
    var sub = this.httpProvider.get(this.postsEndpoint + "/" + date.year + "/" + (date.month + 1) + "/" + date.dayOfMonth);
    var subscription = sub.subscribe(()=> {
    }, (err)=> {
      this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Retrieve Posts For Day", "Error");
    });
    return sub;
  };
  remove:Function = function (post:Post) {
    if (post && post.id) {
      var sub = this.httpProvider.delete(this.postsEndpoint + "/" + post.id);
      var subscription = sub.subscribe(()=> {
      }, (err)=> {
        this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Remove Post", "Error");
      });
      return sub;
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
      var sub = this.httpProvider.get(this.postsEndpoint + "/postCounts/" + startDay.valueOf());
      var subscription = sub.subscribe(()=> {
      }, (err)=> {
        this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Retrieve Post Counts", "Error");
      });
      return sub;
    }
  };
  userHasPostForDate:Function = function (day:Day) {
    ///hasPost/:year/:month/:day
    var dateTime = this.dateUtils.dateFromDay(day);
    if (!dateTime) {
      return Observable.empty();
    }
    else {
      var sub = this.httpProvider.get(this.postsEndpoint + "/hasPost/" + day.year + "/" + (day.month + 1) + "/" + day.dayOfMonth);
      /*
       var subscription = sub.subscribe(()=> {
       }, (err)=> {
       this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Claim Post", "Error");
       }, ()=> {
       subscription.unsubscribe();
       });
       */
      return sub;
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
      var sub = this.httpProvider.postJSON(this.postsEndpoint + "/claim", body);
      var subscription = sub.subscribe(()=> {
      }, (err)=> {
        this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Claim Post", "Error");
      });
      return sub;
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
      var sub = this.httpProvider.postJSON(this.postsEndpoint, body);
      var subscription = sub.subscribe(()=> {
      }, (err)=> {
        this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Create Post", "Error");
      });
      return sub;

    }
    else {
      return Observable.empty();
    }
  };
}

