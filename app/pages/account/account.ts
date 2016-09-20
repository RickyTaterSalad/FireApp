import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth-provider";

/*
 Generated class for the AccountPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/account/account.html',
})
export class AccountPage {

  constructor(private navCtrl:NavController, private authProvider:AuthProvider) {

  }

  private logUserOut:Function = function () {
    this.authProvider.logUserOut();
  }

}
