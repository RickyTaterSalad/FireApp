import { Component } from '@angular/core';
import { NavController,AlertController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth-provider";
import {Toast} from 'ionic-native';
import {PlatformProvider} from "../../providers/platform-provider";

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  public loginMode:string = "login";

  constructor(private navCtrl:NavController, private authProvider:AuthProvider, private platformProvider:PlatformProvider, private alertCtrl:AlertController) {
  }
  private showLoginError:Function = function () {
    if (this.platformProvider.isMobile) {
      Toast.show("Login Failed", "short", "bottom");
    }
    else {
      let alert = this.alertCtrl.create({
        title: "Failed",
        subTitle: "Login Failed",
        buttons: ['OK']
      });
      alert.present();
    }
  };
  private logUserIn:Function = function () {
    this.authProvider.login().subscribe((res)=> {
      },
      (err)=> {
        this.showLoginError();
      }
    );
  }
}

