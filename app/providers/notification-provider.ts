import { Injectable } from '@angular/core';
import { ConfigProvider } from "./config-provider";
import {Observable} from "rxjs";
import {HttpProvider} from "./http-provider";
import {AlertProvider} from "./alert-provider";

@Injectable()
export class NotificationProvider {
  notificationsEndpoint:string;

  constructor(private config:ConfigProvider, private httpProvider:HttpProvider, private alertProvider:AlertProvider) {
    this.notificationsEndpoint = config.restApiUrl + "/notifications";
    Observable.timer(0, 90000).subscribe(()=> this.Notifications)
  }

  Notifications:Function = function () {
    var sub =  this.httpProvider.get(this.notificationsEndpoint);
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


}

