import { Injectable } from '@angular/core';
import { ConfigProvider } from "./config-provider";
import {Observable,Subject} from "rxjs";
import {HttpProvider} from "./http-provider";
import {AuthProvider} from "../providers/auth-provider";

@Injectable()
export class AccountProvider {
  selfEndpoint:string;
  _self:Object;

  constructor(private config:ConfigProvider, private httpProvider:HttpProvider, private authProvider:AuthProvider) {
    this.selfEndpoint = config.restApiUrl + "/self";
    authProvider.loggedOut.subscribe(()=> {
      this._self = null;
    });
  }

  self:Function = function () {
    if (this._self) {
      return Observable.of(this._self);
    }
    let subject = this.httpProvider.get(this.selfEndpoint);
    subject.subscribe((selfResponse)=> {
      if (selfResponse) {
        this._self = selfResponse;
      }
    });
    return subject;
  }

}

