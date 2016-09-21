import { Injectable } from '@angular/core';
import { ConfigProvider } from "./config-provider";
import {Observable} from "rxjs";
import {Message} from "../models/models";
import {HttpProvider} from "./http-provider";
import {AlertProvider} from "./alert-provider";
@Injectable()
export class MessageProvider {
  messageEndpoint:string;

  constructor(private config:ConfigProvider, private httpProvider:HttpProvider, private alertProvider:AlertProvider) {
    this.messageEndpoint = config.restApiUrl + "/messages";
  }
  create:Function = function (message:Message) {
    if (message) {
      var sub = this.httpProvider.postJSON(this.messageEndpoint, JSON.stringify(message));
      var subscription = sub.subscribe(()=> {
      }, (err)=> {
        this.alertProvider.showMessage(err && err._body ? err._body : "Could Not Create Message", "Error");
      });
      return sub;
    }
    else {
      return Observable.empty();
    }
  }
}

