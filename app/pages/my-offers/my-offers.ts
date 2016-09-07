import { Component } from '@angular/core';
import { NavController,ActionSheetController} from 'ionic-angular';
import {PostProvider} from "../../providers/post-provider";
import {Post} from "../../models/post";
import {MomentToString} from "../../pipes/moment-to-string";

/*
 Generated class for the MyOffersPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/my-offers/my-offers.html',
  pipes:[MomentToString]
})
export class MyOffersPage {
  posts:Array<Post> = [];

  constructor(private navCtrl:NavController, private postProvider:PostProvider, private actionSheetCtrl:ActionSheetController) {

  }
  showPostOptions:Function = function(post){
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
  reloadPosts:Function = function(){
    this.postProvider.getMyOffers().subscribe(
      (response) => {this.posts = response ? response.posts: []},
      (err) => {console.log("could not load posts")});
  }

}
