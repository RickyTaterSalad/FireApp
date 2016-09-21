import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth-provider";
import {Toast} from 'ionic-native';
import {PlatformProvider} from "../../providers/platform-provider";
import {CalendarPage} from '../calendar/calendar';
import {Department} from "../../models/models";
import {DepartmentProvider} from "../../providers/department-provider";

/*
 Generated class for the LoginPage page.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  public loginMode:string = "login";

  selectedRank: string;
  department : Department;
  ranks : string[];

  constructor(  private navCtrl:NavController,
                private navParams: NavParams,
                private authProvider:AuthProvider,
                private platformProvider:PlatformProvider,
                private departmentProvider:DepartmentProvider) {


        departmentProvider.Department().subscribe((dept) => {
          this.department = dept;
          this.ranks = this.department.ranks;
        });
  }

  private logUserIn:Function = function () {
    this.authProvider.login();
  }
}
