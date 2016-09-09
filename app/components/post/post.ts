import {Component,Input} from '@angular/core'
import { NavController,ActionSheetController,AlertController} from 'ionic-angular';
import {Post} from "../../models/post";
import {Day} from "../../models/day";
import {EditPostPage} from "../../pages/edit-post/edit-post"
import {MomentToString} from "../../pipes/moment-to-string";
import {PostProvider} from "../../providers/post-provider";
import {ConversationProvider} from "../../providers/conversation-provider";
import {Account} from "../../models/Account";
import {MessageUserPage} from "../../pages/message-user/message-user";
import {CreateConversationPage} from '../../pages/create-conversation/create-conversation';
import {ConversationsPage} from '../../pages/conversations/conversations';

@Component({
  selector: 'post',
  templateUrl: 'build/components/post/post.html',
  pipes: [MomentToString]
})
export class PostComponent {
  @Input() post:Post;
  @Input() account:Account;
  @Input() day:Day;
  @Input() showmessageuser:boolean = false;
  @Input() showuserinheader:boolean = false;


  constructor(private nav:NavController, private actionSheetCtrl:ActionSheetController, private alertCtrl:AlertController, private postProvider:PostProvider ,private conversationProvider:ConversationProvider) {
  }

  editPost:Function = function (post) {
    this.nav.push(EditPostPage, {post: post});
  };

  messageUser:Function = function () {
    this.nav.push(CreateConversationPage, {day: this.day, post: this.post});
  };
  private showError:Function = function (message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
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
  showPostOptions:Function = function () {
    var buttons =
      [
        {
          text: 'Edit Post',
          role: null,
          handler: () => {
            this.editPost(this.post);
          }
        },
        {
          text: 'Remove Post',
          role: null,
          handler: () => {
            this.removePost(this.post);
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
  goToConversations:Function = function () {
    this.conversationProvider.getConversationsForPost(this.post.id).subscribe((conversations) => {
        //should be able to use the observable methods to add collapsed
        this.nav.push(ConversationsPage, {conversations: conversations,account: this.account,post: this.post});

      }
    )
  }

}
