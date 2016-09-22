import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AccountPage} from "../account/account";
import {CalendarPage} from "../calendar/calendar";
import {MyPostsPage} from "../my-posts/my-posts";
import {MyOffersPage } from "../my-offers/my-offers";

import {NotificationsPage } from "../notifications/notifications";

/*
 Generated class for the HomePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
  constructor(private navCtrl:NavController) {

  }

  private goToCalendar:Function = function () {
    this.navCtrl.setRoot(CalendarPage);

  };
  private goToMessages:Function = function () {
    this.navCtrl.setRoot(NotificationsPage);
  };
  private goToShiftManager:Function = function () {
    this.navCtrl.setRoot(MyPostsPage);
  };
  private goToPayback:Function = function () {
    this.navCtrl.setRoot(MyPostsPage);
  };
  private goToAccount:Function = function () {
    this.navCtrl.setRoot(AccountPage);
  };
  private goToSettings:Function = function () {
    this.navCtrl.setRoot(AccountPage);
  };

}
