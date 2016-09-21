import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth-provider";

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  public loginMode:string = "login";

  constructor(private navCtrl:NavController, private authProvider:AuthProvider) {
  }

  private logUserIn:Function = function () {
    this.authProvider.login();
  }
}

