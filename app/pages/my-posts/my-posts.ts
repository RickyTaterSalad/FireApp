import { Component } from '@angular/core';
import { NavController,ActionSheetController,AlertController } from 'ionic-angular';
import {PostProvider} from "../../providers/post-provider";
import {Post} from "../../models/post";
import {ObjectContainsProperty} from "../../pipes/object-contains-property";
import {AccountProvider} from "../../providers/account-provider";
import {Account} from "../../models/account"
import {ConversationComponent} from "../../components/conversation/conversation";
import {PostComponent} from "../../components/post/post";
/*
 Generated class for the MyPostsPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

@Component({
  templateUrl: 'build/pages/my-posts/my-posts.html',
  directives: [ConversationComponent, PostComponent],
  pipes: [ObjectContainsProperty]
})
export class MyPostsPage {
  private loading:boolean = true;
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
    this.loading = true;
    this.accountProvider.self().subscribe((account) => {
        this.account = account;
        this.postProvider.getMyPosts().subscribe(
          (response) => {
            this.posts = [];
            this.conversations = {};
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
            this.loading = false;
          },
          (err) => {
            console.log("could not load posts")
            this.loading = false;
          });
      },
      (err) => {
        console.log("could not load account")
        this.loading = false;
      });
  }
}
