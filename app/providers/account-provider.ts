import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { ConfigProvider } from "./config-provider";
import {HelperMethods} from "../utils/helper-methods";
import 'rxjs/add/operator/map';

/*
 Generated class for the AccountProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AccountProvider {
  selfEndpoint:string;
  helperMethods:HelperMethods = new HelperMethods();
  constructor(private http:Http,private config:ConfigProvider) {
    this.selfEndpoint = config.restApiUrl + "/self";
  }
  self:Function = function() {
    let headers = new Headers();
    this.helperMethods.createAuthorizationHeader(headers);
    return this.http.get(this.selfEndpoint, {headers: headers}).map(res => res.json()).cache();
  }

}

