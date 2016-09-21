import { Injectable } from '@angular/core';
import {PlatformProvider} from "./platform-provider";
import { AlertController } from 'ionic-angular';
import {Toast} from 'ionic-native';
/*
  Generated class for the AlertProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertProvider {

  constructor(private alertCtrl:AlertController,private platformProvider:PlatformProvider) {

  }
  showMessage:Function = function (message, title) {
    if (this.platformProvider.isMobile) {
      Toast.show(message, "short", "bottom");

    }
    else {
      let alert = this.alertCtrl.create({
        title: title || 'Alert',
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }
  };
}

