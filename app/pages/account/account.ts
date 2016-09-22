import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth-provider";
import {AccountProvider} from "../../providers/account-provider";
import {Account}  from "../../models/models";

/*
 Generated class for the AccountPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/account/account.html',
})
export class AccountPage {
  private account:any = {};

  constructor(private navCtrl:NavController, private authProvider:AuthProvider, private accountProvider:AccountProvider) {
    this.authProvider.loginState.subscribe((loggedIn)=> {
      if (!loggedIn) {
        this.account = {}
      }
      else {
        this.accountProvider.self().subscribe((account)=> {
          this.account = account;
        })
      }
    });

  }

  private logUserOut:Function = function () {
    this.authProvider.logUserOut();
  }
}
