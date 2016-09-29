import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth-provider";
import {Department} from "../../models/models";
import {DepartmentProvider} from "../../providers/department-provider";
import {LoginPage} from './pages/login/login';


/*
  Generated class for the RegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/register/register.html',
})
export class RegisterPage {
    @ViewChild(Nav) nav:Nav;
    constructor(private navCtrl: NavController,
                private authProvider:AuthProvider) {

      this.authProvider.loginState.subscribe((loggedIn)=>{
        if(!loggedIn) {
          this.nav.setRoot(LoginPage);
        }
        else{
          this.nav.setRoot(CalendarPage);
        }
      });
  }

}
