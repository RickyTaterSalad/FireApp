import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Post,Conversation,Account,Message} from "../../models/models";
import {AccountProvider} from "../../providers/account-provider";
import {MomentToString} from "../../pipes/moment-to-string";
import {MessageProvider} from "../../providers/message-provider";
import {AlertProvider} from "../../providers/alert-provider";
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

  constructor(private alertProvider:AlertProvider, private nav:NavController, private navParams:NavParams, private accountProvider:AccountProvider, private messageProvider:MessageProvider) {
    this.message.conversation = navParams.data.conversation;
  }

  onPageDidEnter() {
    this.accountProvider.self().subscribe((account) => {
      this.account = account;
    });
  }

  sendMessage:Function = function () {
    this.messageProvider.create(this.message).subscribe(
      (response) => {
        if (response && response.id) {
          this.message.conversation.messages.push(response);
          this.nav.pop();
          this.alertProvider.showShortMessage("Message Sent", "Success");
        }
        else {
          this.alertProvider.showShortMessage("Could Not Send Message", "Error");
        }
      });
  }

}
