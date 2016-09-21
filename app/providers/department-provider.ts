import {Injectable} from '@angular/core';
import {ConfigProvider} from "./config-provider";
import {HttpProvider} from "./http-provider";
import {AuthProvider} from "./auth-provider";
import {Observable} from "rxjs";

@Injectable()
export class DepartmentProvider {
    departmentEndpoint:string;
    department:any;
    constructor(private config:ConfigProvider, private httpProvider:HttpProvider, private authProvider:AuthProvider) {
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
        subject.subscribe((department)=> {
            if (department) {
                this.department = department;
            }
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

