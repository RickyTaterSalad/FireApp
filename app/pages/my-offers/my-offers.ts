import { Component } from '@angular/core';
import { NavController,ActionSheetController,AlertController} from 'ionic-angular';
import {PostProvider} from "../../providers/post-provider";
import {Post} from "../../models/post";
import {MomentToString} from "../../pipes/moment-to-string";
import {ObjectContainsProperty} from "../../pipes/object-contains-property";
import {MessageUserPage} from "../message-user/message-user";
import {AccountProvider} from "../../providers/account-provider";
import {Account} from "../../models/account"
import {ConversationComponent} from "../../components/conversation/conversation";
import {PostComponent} from "../../components/post/post";
/*
 Generated class for the MyOffersPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/my-offers/my-offers.html',
  directives:[ConversationComponent,PostComponent],
  pipes: [MomentToString, ObjectContainsProperty]
})
export class MyOffersPage {
  private posts:Array<Post> = [];
  private conversations:Object = {};
  private account:Account = {
    firstName: "",
    lastName: "",
    platoon: "",
    department: "",
    station: "",
    id: "",
    photo: "",
    assignedHireCode: ""
  };

  constructor(private nav:NavController, private postProvider:PostProvider, private actionSheetCtrl:ActionSheetController, private alertCtrl:AlertController, private accountProvider:AccountProvider) {

  }
  showPostOptions:Function = function (post) {
    var buttons =
      [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }];

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Post Options',
      buttons: buttons
    });
    actionSheet.present();
  };

  onPageDidEnter() {
    this.reloadPosts();
  }

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
  reloadPosts:Function = function () {
    this.accountProvider.self().subscribe((account) => {
      this.account = account;
      this.postProvider.getMyOffers().subscribe(
        (response) => {
          this.posts = [];
          this.conversations = {};
          if (response) {
            this.posts = response ? response.posts : [];
            if (response.conversations) {
              for (var i = 0; i < response.conversations.length; i++) {
                let curr = response.conversations[i];
                if (!curr || !curr.post) {
                  continue;
                }
                curr.collapsed = true;
                if (!this.conversations[curr.post]) {
                  this.conversations[curr.post] = [];
                }
                this.conversations[curr.post].push(curr);
              }
              console.dir(this.conversations);
            }
          }
        },
        (err) => {
          console.log("could not load posts")
        });
    });
  }

}
