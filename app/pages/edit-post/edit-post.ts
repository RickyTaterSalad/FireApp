import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Post,Account} from "../../models/models"
import {MomentToString} from "../../pipes/moment-to-string";
/*
 Generated class for the EditPostPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/edit-post/edit-post.html',
  pipes: [MomentToString]
})
export class EditPostPage {
  post:Post;
  account:Account;
  postModel:any = {
    isTrade: false,
    isOvertime: false,
    comments: ""
  };

  constructor(private navCtrl:NavController, private navParams:NavParams) {
    this.post = navParams.data.post;
    this.account = navParams.data.account;
    if (this.post) {
      this.postModel.isTrade = this.post.isTrade;
      this.postModel.isOvertime = this.post.isOvertime;
      this.postModel.comments = this.post.comments;
    }

  }

  editPost:Function = function () {

  }

}
