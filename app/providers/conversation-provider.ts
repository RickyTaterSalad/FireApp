import { Injectable } from '@angular/core';
import { ConfigProvider } from "./config-provider";
import {Conversation} from "../models/conversation";
import {Observable} from "rxjs";
import {HttpProvider} from "./http-provider";

@Injectable()
export class ConversationProvider {
  conversationEndpoint:string;

  constructor( private config:ConfigProvider, private httpProvider:HttpProvider) {
    this.conversationEndpoint = config.restApiUrl + "/conversations";
  }

  Conversations:Function = function () {
    return this.httpProvider.get(this.conversationEndpoint);
  };

  getConversationsForPost:Function = function (postId) {
    let url = this.conversationEndpoint + "/" + postId;
    return this.httpProvider.get(url);
  };
  create:Function = function (conversation:Conversation) {
    if (conversation) {
      let body = JSON.stringify(conversation);
      return this.httpProvider.postJSON(this.conversationEndpoint, body);
    }
    else {
      return Observable.empty();
    }
  };
}

