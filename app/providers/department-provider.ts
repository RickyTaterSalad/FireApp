import {Injectable} from '@angular/core';
import {ConfigProvider} from "./config-provider";
import {HttpProvider} from "./http-provider";
import {AuthProvider} from "./auth-provider";
import {Observable,Subject} from "rxjs";
import {AlertProvider} from "./alert-provider";
import {Storage, LocalStorage} from 'ionic-angular';
@Injectable()
export class DepartmentProvider {
  departmentEndpoint:string;
  department:any;
  private storage:Storage;
private departmentKey:string = "department";
  constructor(private config:ConfigProvider, private httpProvider:HttpProvider, private authProvider:AuthProvider, private alertProvider:AlertProvider) {
    this.departmentEndpoint = config.restApiUrl + "/department/" + config.departmentName;
    this.storage = new Storage(LocalStorage);
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
    var subject = new Subject();
    this.storage.get(this.departmentKey).then((departmentString:string) => {
      if (departmentString) {
        try {
          var asJson = JSON.parse(departmentString);
          this.department = asJson;
          subject.next(asJson);
          subject.complete();
          return;
        }
        catch (err) {

        }
      }
      var remoteDeptSubject = this.httpProvider.get(this.departmentEndpoint);
      remoteDeptSubject.subscribe((department)=> {
          if (department) {
            this.department = department;
            this.storage.set(this.departmentKey, JSON.stringify(department));
            subject.next(this.department);
          }
        },
        (err)=> {
          this.alertProvider.showMessage(err && err._body ? err._body : "Could Not Load Department", "Error");
        }
      );
    });
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

