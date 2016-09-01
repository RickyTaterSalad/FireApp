import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { ConfigProvider } from "./config-provider";
import {Day} from "../models/day";
import 'rxjs/add/operator/map';

/*
 Generated class for the PostProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PostProvider {
  postsEndpoint:string;

  constructor(private http:Http, private config:ConfigProvider) {
    this.postsEndpoint = config.restApiUrl + "/posts";
  }
  createAuthorizationHeader:Function = function (headers:Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('fire:fire'));
  };
  getPostsForDay(date:Day) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    console.log("sending dept query");
    var url = this.postsEndpoint + "/" + date.year + "/" + date.month + "/" + date.dayOfMonth;
    return this.http.get(url, {headers: headers}).map(res => res.json());
  }

}

