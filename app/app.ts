import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav,AlertController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {CalendarPage} from './pages/calendar/calendar';
import {AccountPage} from './pages/account/account';
import {NotificationsPage} from './pages/notifications/notifications';
import {MyPostsPage} from './pages/my-posts/my-posts';
import {LoginPage} from './pages/login/login';
import {MyOffersPage} from './pages/my-offers/my-offers';
import {DepartmentProvider} from "./providers/department-provider";
import {AccountProvider} from "./providers/account-provider";
import {ConversationProvider} from "./providers/conversation-provider";
import {PostProvider} from "./providers/post-provider";
import {NotificationProvider} from "./providers/notification-provider";
import {MessageProvider} from "./providers/message-provider";
import {ConfigProvider} from "./providers/config-provider";
import {ConnectivityProvider} from "./providers/connectivity-provider";
import {AuthProvider} from "./providers/auth-provider";
import {HttpProvider} from "./providers/http-provider";
import {PlatformProvider} from "./providers/platform-provider";

@Component({
  templateUrl: 'build/app.html',
  providers: [
    DepartmentProvider,
    AccountProvider,
    ConversationProvider,
    PostProvider,
    MessageProvider,
    ConfigProvider,
    AlertController,
    NotificationProvider,
    ConnectivityProvider,
    PlatformProvider,
    HttpProvider,
    AuthProvider
  ]
})
class MyApp {
  @ViewChild(Nav) nav:Nav;

  // make HelloIonicPage the root (or first) page
  rootPage:any = null;
  pages:Array<{title: string, component: any}>;

  constructor(public platform:Platform,
              public menu:MenuController, private authProvider:AuthProvider, private accountProvider:AccountProvider) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      {title: "Notifications", component: NotificationsPage},
      {title: 'Calendar', component: CalendarPage},
      {title: "My Posts", component: MyPostsPage},
      {title: "My Offers", component: MyOffersPage},
      {title: 'Account', component: AccountPage},
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();

      this.authProvider.loggedOut.subscribe(()=>{
        this.nav.setRoot(LoginPage);
      });

      this.authProvider.isLoggedIn().subscribe((res)=> {
          console.log(res);
          if (!res) {
            this.nav.setRoot(LoginPage);
          }
          else {
            this.nav.setRoot(CalendarPage);
          }
        },
        (err) => {
          this.nav.setRoot(LoginPage);
        }
      );

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
