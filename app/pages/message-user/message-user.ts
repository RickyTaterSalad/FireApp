import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import {Post} from "../../models/post";

interface MessageContent{
  post:Post;
  message:String;
}

@Component({
  templateUrl: 'build/pages/message-user/message-user.html',
})
export class MessageUserPage {
  private post:Post;
  private messageData:MessageContent;
  constructor(private nav:NavController,private navParams:NavParams) {
    this.post = navParams.data;
    this.messageData = {post: this.post,message:""}

  }

}
