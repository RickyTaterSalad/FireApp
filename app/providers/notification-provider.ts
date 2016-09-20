import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { ConfigProvider } from "./config-provider";
import {Department} from "../models/department";
import {Observable} from "rxjs";
import {HttpProvider} from "./http-provider";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/cache';
/*
 Generated class for the DepartmentProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class NotificationProvider {
  notificationsEndpoint:string;

  constructor(private http:Http, private config:ConfigProvider,private httpProvider:HttpProvider) {
    this.notificationsEndpoint = config.restApiUrl + "/notifications";
    let timer = Observable.timer(0,90000);
    timer.subscribe(()=> this.Notifications)

  }
  get Notifications() {
    let headers = this.httpProvider.createAuthorizationHeader();
    return this.http.get(this.notificationsEndpoint, {headers: headers}).map(res => res.json()).subscribe(
      (res)=>{
        console.log("notification response");
        console.dir(res);
      }
    )
  }


}

