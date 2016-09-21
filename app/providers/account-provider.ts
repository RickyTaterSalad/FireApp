import {Injectable} from '@angular/core';
import {ConfigProvider} from "./config-provider";
import {Observable, Subject} from "rxjs";
import {HttpProvider} from "./http-provider";
import {AuthProvider} from "./auth-provider";
import {AlertProvider} from "./alert-provider";

@Injectable()
export class AccountProvider {
  selfEndpoint:string;
  _self:Object;

  constructor(private config:ConfigProvider, private httpProvider:HttpProvider, private authProvider:AuthProvider, private alertProvider:AlertProvider) {
    this.selfEndpoint = config.restApiUrl + "/self";
    authProvider.loginState.subscribe((loggedIn)=> {
      if (!loggedIn) {
        this._self = null;
      }
      else {
        this.loadSelf();
      }
    });
  }

  private loadSelf:Function = function () {
    var subject = this.httpProvider.get(this.selfEndpoint);
    var subscription = subject.subscribe((selfResponse)=> {
      if (selfResponse) {
        this._self = selfResponse;
      }
    }, (err)=> {
      this.alertProvider.showMessage(err && err._body ? err._body : "Could Not Load User", "Error");
    }, ()=> {
      subscription.unsubscribe();
    });
    return subject;
  };

  self:Function = function () {
    if (this._self) {
      return Observable.of(this._self);
    }
    else {
      return this.loadSelf();
    }
  };

}

