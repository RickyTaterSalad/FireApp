import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ConfigProvider } from "./config-provider";
import {Message} from "../models/message";
import {Conversation} from "../models/conversation";
import {Observable} from "rxjs";
import {HttpProvider} from "./http-provider";

import 'rxjs/add/operator/map';
/*
 Generated class for the ConversationProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ConversationProvider {
  conversationEndpoint:string;

  constructor(private http:Http, private config:ConfigProvider, private httpProvider:HttpProvider) {
    this.conversationEndpoint = config.restApiUrl + "/conversations";
  }

  get Conversations() {
    let headers = this.httpProvider.createAuthorizationHeader();
    return this.http.get(this.conversationEndpoint, {headers: headers}).map(res => res.json()).cache();
  }

  getConversationsForPost:Function = function (postId) {
    let headers = this.httpProvider.createAuthorizationHeader();
    let url = this.conversationEndpoint + "/" + postId;
    return this.http.get(url, {headers: headers}).map(res => res.json());
  }


  create:Function = function (conversation:Conversation) {
    if (conversation) {
      let body = JSON.stringify(conversation);
      let headers = this.httpProvider.generateJsonContentHeader();
      let options = new RequestOptions({headers: headers});
      return this.http.post(this.conversationEndpoint, body, options).map(res => res.json());
    }
    else {
      return Observable.empty();
    }
  };
}

