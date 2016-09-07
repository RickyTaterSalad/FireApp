import { Component } from '@angular/core';
import { NavController,NavParams,AlertController} from 'ionic-angular';
import {Post} from "../../models/post";
import {Conversation} from "../../models/conversation";
import {Account} from '../../models/Account';
import {AccountProvider} from "../../providers/account-provider";
import {MomentToString} from "../../pipes/moment-to-string";
import {Message} from "../../models/message";

import {MessageProvider} from "../../providers/message-provider";
@Component({
  templateUrl: 'build/pages/message-user/message-user.html',
  pipes: [MomentToString]
})
export class MessageUserPage {
  account:Account = {
    firstName: "",
    lastName: "",
    platoon: "",
    department: "",
    station: "",
    id: "",
    photo: "",
    assignedHireCode: ""
  };
  private message:Message = {
    conversation: null,
    sender: "",
    recipient: "",
    content: ""
  };

  constructor(private nav:NavController, private alertCtrl:AlertController, private navParams:NavParams, private accountProvider:AccountProvider, private messageProvider:MessageProvider) {
    this.message.conversation = navParams.data.conversation;
  }

  onPageDidEnter() {
    this.accountProvider.self().subscribe((account) => {
      this.account = account;
    });
  }
  showError:Function = function (message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
    this.nav.pop();
  };
  sendMessage:Function = function () {
    this.messageProvider.create(this.message).subscribe(
      (response) => {
        this.nav.pop();
      },
      (err) => {
        this.showError(err && err._body ? err._body : "Could Not Send Message")
      }
    )
  }

}
