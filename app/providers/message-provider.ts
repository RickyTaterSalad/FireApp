import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ConfigProvider } from "./config-provider";
import {Station} from "../models/station";
import {Observable} from "rxjs";
import {HelperMethods} from "../utils/helper-methods";
import {Message} from "../models/message";
import {HttpProvider} from "./http-provider";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/cache';
/*
 Generated class for the DepartmentProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class MessageProvider {
  messageEndpoint:string;

  constructor(private http:Http, private config:ConfigProvider,private httpProvider:HttpProvider) {
    this.messageEndpoint = config.restApiUrl + "/messages";
  }

  create:Function = function (message:Message) {
    if (message) {
      let body = JSON.stringify(message);
      let headers = this.httpProvider.generateJsonContentHeader();
      let options = new RequestOptions({headers: headers});
      return this.http.post(this.messageEndpoint, body,options).map(res => res.json());
    }
    else {
      return Observable.empty();
    }
  }
}

