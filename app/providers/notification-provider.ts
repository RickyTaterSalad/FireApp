import { Injectable } from '@angular/core';
import { ConfigProvider } from "./config-provider";
import {Observable} from "rxjs";
import {HttpProvider} from "./http-provider";
/*
 Generated class for the DepartmentProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class NotificationProvider {
  notificationsEndpoint:string;

  constructor(private config:ConfigProvider, private httpProvider:HttpProvider) {
    this.notificationsEndpoint = config.restApiUrl + "/notifications";
    let timer = Observable.timer(0, 90000);
    timer.subscribe(()=> this.Notifications)
  }

  Notifications:Function = function () {
    return this.httpProvider.get(this.notificationsEndpoint);
  }


}

