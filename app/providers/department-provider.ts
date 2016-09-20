import { Injectable } from '@angular/core';
import {ConfigProvider } from "./config-provider";
import {HttpProvider} from "./http-provider";
import {AuthProvider} from "./auth-provider";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
/*
 Generated class for the DepartmentProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DepartmentProvider {
  departmentEndpoint:string;
  department:any;

  constructor( private config:ConfigProvider, private httpProvider:HttpProvider,private authProvider:AuthProvider) {
    this.departmentEndpoint = config.restApiUrl + "/department/" + config.departmentName;
    this.authProvider.loggedOut.subscribe(()=> {
      this.department = null;
    });
  }

  Department:Function = function () {
    if(this.department){
      return Observable.of(this.department);
    }
    var subject = this.httpProvider.get(this.departmentEndpoint);
    subject.subscribe((department)=> {
      this.department = department;
    });
    return subject;
  }


}

