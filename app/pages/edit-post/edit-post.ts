import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Post} from "../../models/models"

/*
 Generated class for the EditPostPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/edit-post/edit-post.html',
})
export class EditPostPage {
  post:any = {};
  postModel:any = {
    isTrade: false,
    isOvertime:false,
    comments:""
  }

  constructor(private navCtrl:NavController, private navParams:NavParams) {
    this.post = navParams.data.post;

    if(this.post){
      this.postModel.isTrade = this.post.isTrade;
      this.postModel.isOvertime = this.post.isOvertime;
      this.postModel.comments = this.post.comments;
    }

  }
  editPost:Function = function(){

  }

}
