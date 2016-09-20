import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { ConfigProvider } from "./config-provider";
import {HelperMethods} from "../utils/helper-methods";
import {Observable,Subject} from "rxjs";
import {HttpProvider} from "./http-provider";
import {AuthProvider} from "../providers/auth-provider";
import 'rxjs/add/operator/map';

/*
 Generated class for the AccountProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AccountProvider {
  selfEndpoint:string;
  _self:Object;

  constructor(private http:Http, private config:ConfigProvider, private httpProvider:HttpProvider,private authProvider:AuthProvider) {
    this.selfEndpoint = config.restApiUrl + "/self";
    authProvider.loggedOut.subscribe(()=>{
      this._self = null;
    })
  }
  self:Function = function () {
    if (this._self) {
      return Observable.of(this._self);
    }
    let headers = this.httpProvider.createAuthorizationHeader();
    let subject = new Subject();
    this.http.get(this.selfEndpoint, {headers: headers}).map(res => res.json()).subscribe(subject);
    subject.subscribe((selfResponse)=> {
      if (selfResponse) {
        this._self = selfResponse;
      }
    });
    return subject;
  }

}

