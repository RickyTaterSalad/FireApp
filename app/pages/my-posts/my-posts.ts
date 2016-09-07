import { Component } from '@angular/core';
import { NavController,ActionSheetController,AlertController } from 'ionic-angular';
import {PostProvider} from "../../providers/post-provider";
import {EditPostPage} from "../../pages/edit-post/edit-post"
import {Post} from "../../models/post";
import {MomentToString} from "../../pipes/moment-to-string";
/*
 Generated class for the MyPostsPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/my-posts/my-posts.html',
  pipes: [MomentToString]
})
export class MyPostsPage {
  posts:Array<Post> = [];

  constructor(private nav:NavController, private postProvider:PostProvider, private actionSheetCtrl:ActionSheetController, private alertCtrl:AlertController) {

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

  reloadPosts:Function = function () {
    this.postProvider.getMyPosts().subscribe(
      (response) => {
        this.posts = response ? response.posts : []
      },
      (err) => {
        console.log("could not load posts")
      });
  }
}
