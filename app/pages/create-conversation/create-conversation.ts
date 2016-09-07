import { Component } from '@angular/core';
import { NavController,NavParams,AlertController } from 'ionic-angular';
import {Post} from "../../models/post";
import {Day} from "../../models/day";
import {Account} from "../../models/account";
import {ConversationProvider} from "../../providers/conversation-provider"
import {AccountProvider} from "../../providers/account-provider"
import {MessageProvider} from "../../providers/message-provider"
import {Conversation} from "../../models/conversation";
import {Message} from "../../models/message";
import 'rxjs/add/operator/catch';

interface CreateConversation {
  post:Post;
  message:String;
  swapType:string;
}

/*
 Generated class for the OfferPostPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/create-conversation/create-conversation.html',
})
export class CreateConversationPage {
  private post:Post;
  private account:Account;
  private day:Day;
  private messageData:CreateConversation;

  constructor(private nav:NavController,private alertCtrl:AlertController, private navParams:NavParams, private conversationProvider:ConversationProvider, private accountProvider:AccountProvider, private messageProvider:MessageProvider) {
    this.post = navParams.data.post;
    this.day = navParams.data.day;
    this.messageData = {post: this.post, message: "", swapType: ""};
    if (this.post) {
      if (this.post.isOvertime && this.post.isTrade) {
        this.messageData.swapType = "trade";
      }
    }
  }

  showSuccess:Function = function () {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Message Sent',
      buttons: ['OK']
    });
    alert.present();
    this.nav.pop();
  };
  showError:Function = function (err) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: err._body || "Could Not Message User",
      buttons: ['OK']
    });
    alert.present();
    this.nav.pop();
  };
  createConversation:Function = function () {
    var conversation = {
      conversation: {
        post: {id: this.post.id}
      }
    };
    this.accountProvider.self().subscribe(account => {
      console.dir(account);
      this.conversationProvider.create(conversation).subscribe(
          response => {
          console.dir(response);
          var message = {
            conversation: {id:response.id},
            content: this.messageData.message
          };
            console.log("MESSAGE");
            console.dir(message);
          this.messageProvider.create(message).subscribe(
              response => {
              console.dir(response);
              this.showSuccess();
            }
          )
        },
        (err) =>this.showError(err)
      )
    });
  }
}
