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
    this.reloadPosts();
  }


  confirmShift:Function = function (conversation) {
    this.postProvider.claimPost(conversation.post, conversation.recipient).subscribe(
      (response)=> {
      },
      (err) => {
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
            this.posts =  response.posts || [];
            this.conversations = response.conversations || {};
            for (var i = 0; i < this.posts.length; i++) {
                this.posts[i].conversationCount = this.conversations[this.posts[i].id] ? this.conversations[this.posts[i].id].length : 0;
            }
            this.loading = false;
          },
          (err) => {
            this.loading = false;
          });
      },
      (err) => {
        this.loading = false;
      });
  }
}
