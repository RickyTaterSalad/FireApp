import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { ConfigProvider } from "./config-provider";
import {Department} from "../models/department";
import {HttpProvider} from "./http-provider";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/cache';
/*
 Generated class for the DepartmentProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DepartmentProvider {
  departmentEndpoint:string;

  constructor(private http:Http, private config:ConfigProvider, private httpProvider:HttpProvider) {
    this.departmentEndpoint = config.restApiUrl + "/department/" + config.departmentName;
  }
  get Department() {
    let headers = this.httpProvider.createAuthorizationHeader();
    return this.http.get(this.departmentEndpoint, {headers: headers}).map(res => res.json()).cache();
  }


}

