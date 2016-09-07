import { Component } from '@angular/core';
import { NavController,ActionSheetController  } from 'ionic-angular';
import {Account} from '../../models/Account';
import {Station} from '../../models/station';
import {Conversation} from "../../models/conversation";
import {ConversationProvider} from "../../providers/conversation-provider";
import {AccountProvider} from "../../providers/account-provider";
import {StationProvider} from "../../providers/station-provider";
import {PostProvider} from "../../providers/post-provider";
import {MomentToString} from "../../pipes/moment-to-string";
import {MessageUserPage} from "../message-user/message-user";
/*
 Generated class for the ConversationsPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/conversations/conversations.html',
  pipes: [MomentToString]
})
export class ConversationsPage {
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
  conversations:Array<Conversation> = [];
  stations:Object = {};

  constructor(private postProvider:PostProvider, private actionSheetCtrl:ActionSheetController, private nav:NavController, private conversationProvider:ConversationProvider, private accountProvider:AccountProvider, private stationProvider:StationProvider) {

  }

  replyToConversation:Function = function (conversation, evt:Event) {
    if (evt) {
      evt.stopPropagation();
    }
    if (!conversation) {
      return;
    }
    this.nav.push(MessageUserPage, {conversation: conversation});
  };

  onPageDidEnter() {
    this.reloadConversations();
  }

  toggleConversation:Function = function (conversation) {
    conversation.collapsed = !conversation.collapsed;
  };
  sortConversations:Function = function (a, b) {
    if (a.post.shift < b.post.shift) {
      return -1;
    }
    if (a.post.shift > b.post.shift) {
      return 1;
    }
    return 0;

  }

  reloadConversations:Function = function () {
    this.accountProvider.self().subscribe((account) => {
      this.stationProvider.Stations.subscribe((stations) => {
        this.stations = stations;
        console.log("Account");
        console.dir(account);
        this.account = account;
        this.conversationProvider.Conversations.subscribe((conversations) => {
            //should be able to use the observable methods to add collapsed
            if (conversations) {
              for (var i = 0; i < conversations.length; i++) {
                conversations[i].collapsed = false;
              }
              conversations.sort(this.sortConversations);
            }
            console.dir(conversations);
            this.conversations = conversations || [];
          }
        )
      });
    });
  };
  confirmShift:Function = function (conversation) {

    this.postProvider.claimPost(conversation.post, conversation.recipient).subscribe(
      (response)=> {
        console.log("claimed shift");
        console.dir(response);
      },
      (err) => {
        console.log("could not claim shift");
        console.dir(err);
      }
    )
  };

  showConversationOptions:Function = function (conversation) {
    var buttons =
      [
        {
          text: 'Reply',
          role: null,
          handler: () => {
            this.replyToConversation(conversation,null);
          }
        },

        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }];

    if (this.account.id == conversation.post.creator) {
      var confirmButton = {
        role: null,
        text: 'Confirm Swap',
        handler: () => {
          this.confirmShift(conversation)

        }
      };
      buttons.unshift(confirmButton);
    }

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Post Options',
      buttons: buttons
    });
    actionSheet.present();
  }

}
