import { Injectable } from '@angular/core';
import { ConfigProvider } from "./config-provider";
import {Conversation} from "../models/models";
import {Observable} from "rxjs";
import {HttpProvider} from "./http-provider";
import {AlertProvider} from "./alert-provider";

@Injectable()
export class ConversationProvider {
  conversationEndpoint:string;

  constructor(private config:ConfigProvider, private httpProvider:HttpProvider, private alertProvider:AlertProvider) {
    this.conversationEndpoint = config.restApiUrl + "/conversations";
  }

  Conversations:Function = function () {
    var sub = this.httpProvider.get(this.conversationEndpoint);
    var subscription = sub.subscribe(()=> {
    }, (err)=> {
      this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Retrieve Conversations", "Error");
    });
    return sub;
  };

  getConversationsForPost:Function = function (postId) {
    let url = this.conversationEndpoint + "/" + postId;
    var sub = this.httpProvider.get(url);
    var subscription = sub.subscribe(()=> {
    }, (err)=> {
      this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Retrieve Post Conversations", "Error");
    });
    return sub;
  };
  create:Function = function (conversation:Conversation) {
    if (conversation) {
      let body = JSON.stringify(conversation);
      var sub = this.httpProvider.postJSON(this.conversationEndpoint, body);
      var subscription = sub.subscribe(()=> {
      }, (err)=> {
        this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Create Conversation", "Error");
      });
      return sub;
    }
    else {
      return Observable.empty();
    }
  };
}

