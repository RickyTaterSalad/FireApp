import { Component } from '@angular/core';
import { NavController,ActionSheetController,AlertController } from 'ionic-angular';
import {PostProvider} from "../../providers/post-provider";
import {EditPostPage} from "../../pages/edit-post/edit-post"
import {Post} from "../../models/post";
import {MomentToString} from "../../pipes/moment-to-string";
import {MessageUserPage} from "../message-user/message-user";
import {ObjectContainsProperty} from "../../pipes/object-contains-property";
import {AccountProvider} from "../../providers/account-provider";
import {Account} from "../../models/account"
/*
 Generated class for the MyPostsPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

@Component({
  templateUrl: 'build/pages/my-posts/my-posts.html',
  pipes: [MomentToString, ObjectContainsProperty]
})
export class MyPostsPage {
  posts:Array<Post> = [];
  conversations:Object = {};
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

  editPost:Function = function (post) {
    this.nav.push(EditPostPage, {post: post});
  };
  showPostOptions:Function = function (post) {
    var buttons =
      [
        {
          text: 'Edit Post',
          role: null,
          handler: () => {
            this.editPost(post);
          }
        },
        {
          text: 'Remove Post',
          role: null,
          handler: () => {
            this.removePost(post);
          }
        },
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
  removePost:Function = function (post) {
    if (!post) {
      return;
    }
    this.postProvider.delete(post).subscribe(
      (response)=> {
        this.reloadPosts();
      },
      (err) => {
        this.showError("Could Not Delete Post.");
      }
    )
  };
  private showError:Function = function (message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  };

  onPageDidEnter() {
    this.reloadPosts();
  }

  toggleConversation:Function = function (conversation) {
    if (conversation) {
      conversation.collapsed = !conversation.collapsed;
    }
  };
  showConversationOptions:Function = function (conversation) {
    var buttons =
      [
        {
          text: 'Reply',
          role: null,
          handler: () => {
            this.replyToConversation(conversation, null);
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
  };
  replyToConversation:Function = function (conversation, evt:Event) {
    if (evt) {
      evt.stopPropagation();
    }
    if (!conversation) {
      return;
    }
    this.nav.push(MessageUserPage, {conversation: conversation});
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

  reloadPosts:Function = function () {
    this.accountProvider.self().subscribe((account) => {
      this.account = account;
      this.postProvider.getMyPosts().subscribe(
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
