import {Injectable} from '@angular/core';
import {ConfigProvider} from "./config-provider";
import {HttpProvider} from "./http-provider";
import {AuthProvider} from "./auth-provider";
import {Observable} from "rxjs";
import {AlertProvider} from "./alert-provider";

@Injectable()
export class DepartmentProvider {
  departmentEndpoint:string;
  department:any;

  constructor(private config:ConfigProvider, private httpProvider:HttpProvider, private authProvider:AuthProvider, private alertProvider:AlertProvider) {
    this.departmentEndpoint = config.restApiUrl + "/department/" + config.departmentName;
    this.authProvider.loginState.subscribe((loggedIn)=> {
      if (!loggedIn) {
        this.department = null;
      }
      else {
        this.loadDepartment();
      }
    });
  }

  private loadDepartment:Function = function () {
    var subject = this.httpProvider.get(this.departmentEndpoint);
    var subscription = subject.subscribe((department)=> {
        if (department) {
          this.department = department;
        }
      },
      (err)=> {
        this.alertProvider.showMessage(err && err._body ? err._body : "Could Not Load Department", "Error");
      },
      ()=> {
        subscription.unsubscribe();
      }
    );
    return subject;
  };

  Department:Function = function () {
    if (this.department) {
      return Observable.of(this.department);
    }
    else {
      return this.loadDepartment();
    }
  }
}

