import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav,AlertController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {CalendarPage} from './pages/calendar/calendar';
import {AccountPage} from './pages/account/account';
import {MyPostsPage} from './pages/my-posts/my-posts';
import {MyOffersPage} from './pages/my-offers/my-offers';
import {DepartmentProvider} from "./providers/department-provider";
import {AccountProvider} from "./providers/account-provider";
import {ConversationProvider} from "./providers/conversation-provider";
import {PostProvider} from "./providers/post-provider";
import {NotificationProvider} from "./providers/notification-provider";
import {MessageProvider} from "./providers/message-provider";
import {ConfigProvider} from "./providers/config-provider";

import {StationProvider} from "./providers/station-provider";
@Component({
  templateUrl: 'build/app.html',
  providers: [
    DepartmentProvider,
    AccountProvider,
    ConversationProvider,
    PostProvider,
    MessageProvider,
    ConfigProvider,
    StationProvider,
    AlertController,
    NotificationProvider
  ]
})
class MyApp {
  @ViewChild(Nav) nav:Nav;

  // make HelloIonicPage the root (or first) page
  rootPage:any = CalendarPage;
  pages:Array<{title: string, component: any}>;

  constructor(public platform:Platform,
              public menu:MenuController) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      {title: 'Calendar', component: CalendarPage},
      {title: "My Posts",component:MyPostsPage},
      {title: "My Offers",component:MyOffersPage},
      {title: 'Account', component: AccountPage}
    ];
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
