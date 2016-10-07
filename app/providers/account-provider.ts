import {Injectable} from '@angular/core';
import {ConfigProvider} from "./config-provider";
import {Observable, Subject, BehaviorSubject} from "rxjs";
import {HttpProvider} from "./http-provider";
import {AuthProvider} from "./auth-provider";
import {AlertProvider} from "./alert-provider";

@Injectable()
export class AccountProvider {
  selfEndpoint:string;
  _self:Object;
  public registeredState:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private config:ConfigProvider, private httpProvider:HttpProvider, private authProvider:AuthProvider, private alertProvider:AlertProvider) {
    this.selfEndpoint = config.restApiUrl + "/self";
    authProvider.loginState.subscribe((loggedIn)=> {
      if (!loggedIn) {
        this._self = null;
        this.registeredState.next(false);
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
        this.registeredState.next(this.isRegistered());
      }
    }, (err)=> {
        this.registeredState.next(false);
        this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Load User", "Error");
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

  private isRegistered:Function = function(){
    return  this._self
            && !this._self.platoon
            && !this._self.station
            && !this._self.assignedHireCode;
  };

  register: Function = function() {
      var account = this._self;
      let body = JSON.stringify(account);
      var sub = this.httpProvider.postJSON(this.selfEndpoint, body);
      var subscription = sub.subscribe(()=> {
      }, (err)=> {
         this.registeredState.next(false);
        this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Register User", "Error");
      });
      this.registeredState.next(true);
      return sub;
  };
}
