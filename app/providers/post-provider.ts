import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ConfigProvider } from "./config-provider";
import {Day} from "../models/day";
import {Post} from "../models/post";
import {Observable} from "rxjs";

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
  helperMethods:HelperMethods = new HelperMethods();

  constructor(private http:Http, private config:ConfigProvider) {
    this.postsEndpoint = config.restApiUrl + "/posts";
    this.http = http;
  }
  getPostsForDay:Function = function (date:Day) {
    let headers = new Headers();
    this.helperMethods.createAuthorizationHeader(headers);
    console.log("sending dept query");
    var url = this.postsEndpoint + "/" + date.year + "/" + date.month + "/" + date.dayOfMonth;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).map(res => res.json());
  };
  delete:Function = function (post:Post) {
    if (post && this.helperMethods.validObjectId(post.id)) {
      let headers = new Headers();
      this.helperMethods.createAuthorizationHeader(headers);
      let options = new RequestOptions({headers: headers});
      let url = this.postsEndpoint + "/" + post.id;
      return this.http.delete(url ,options).map(res => res.json());
    }
    else {
      return Observable.empty();
    }
  };
  create:Function = function (post:Post) {
    if (post) {
      let body = JSON.stringify({post: post});
      let headers =this.helperMethods.createJsonContentTypeHeader();
      let options = new RequestOptions({headers: headers});
      return this.http.post(this.postsEndpoint, body, options).map(res => res.json());
    }
    else {
      return Observable.empty();
    }
  };
}

