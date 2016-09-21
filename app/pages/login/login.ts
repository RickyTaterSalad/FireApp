import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth-provider";
import {Toast} from 'ionic-native';
import {PlatformProvider} from "../../providers/platform-provider";
import {CalendarPage} from '../calendar/calendar';
import {Department} from "../../models/department";
import {DepartmentProvider} from "../../providers/department-provider";

/*
 Generated class for the LoginPage page.

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  public loginMode:string = "login";

  constructor(private navCtrl:NavController,
                private authProvider:AuthProvider,
                private platformProvider:PlatformProvider,
                private alertCtrl:AlertController,
                private departmentProvider:DepartmentProvider) {

  }

  private logUserIn:Function = function () {
    this.authProvider.login();
  }
}
