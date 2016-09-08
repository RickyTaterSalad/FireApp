import { Component } from '@angular/core';
import { NavController,NavParams,AlertController,Platform } from 'ionic-angular';
import {Post} from "../../models/post";
import {Conversation} from "../../models/conversation";
import {Account} from '../../models/Account';
import {AccountProvider} from "../../providers/account-provider";
import {MomentToString} from "../../pipes/moment-to-string";
import {Message} from "../../models/message";
import {Toast} from 'ionic-native';
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

  constructor(private platform:Platform, private nav:NavController, private alertCtrl:AlertController, private navParams:NavParams, private accountProvider:AccountProvider, private messageProvider:MessageProvider) {
    this.message.conversation = navParams.data.conversation;
  }

  onPageDidEnter() {
    this.accountProvider.self().subscribe((account) => {
      this.account = account;
    });
  }

  showMessage:Function = function (message,title) {
    if (this.platform.is('ios') ||this.platform.is('android')) {
      Toast.show(message, "short", "bottom")
    }
    else {
      let alert = this.alertCtrl.create({
        title: title || 'Alert',
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }
    this.nav.pop();
  };
  sendMessage:Function = function () {
    this.messageProvider.create(this.message).subscribe(
      (response) => {
        this.showMessage("Message Sent");
        this.nav.pop();
      },
      (err) => {
        this.showMessage(err && err._body ? err._body : "Could Not Send Message","Error");
      }
    )

  }

}
