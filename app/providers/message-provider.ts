import { Injectable } from '@angular/core';
import { ConfigProvider } from "./config-provider";
import {Observable} from "rxjs";
import {Message} from "../models/models";
import {HttpProvider} from "./http-provider";
@Injectable()
export class MessageProvider {
  messageEndpoint:string;

  constructor( private config:ConfigProvider, private httpProvider:HttpProvider) {
    this.messageEndpoint = config.restApiUrl + "/messages";
  }
  create:Function = function (message:Message) {
    if (message) {
      return this.httpProvider.postJSON(this.messageEndpoint, JSON.stringify(message));
    }
    else {
      return Observable.empty();
    }
  }
}

