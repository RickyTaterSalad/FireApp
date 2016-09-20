import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { GooglePlus } from 'ionic-native';
import {Observable,Subject} from "rxjs";
import {ConfigProvider} from "./config-provider"
import {Storage, LocalStorage} from 'ionic-angular';
import {PlatformProvider} from "./platform-provider";
 import 'rxjs/add/operator/map';

interface UserData {
  token:string;
  user:Object;
}

/*
 Generated class for the AuthProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthProvider {
  private storage:Storage;
  private userDataKey:string = "user_data";
  public  token:string;
  public loggedOut:Subject<any> = new Subject();

  constructor( private configProvider:ConfigProvider, private http:Http,private platformProvider:PlatformProvider) {
    this.storage = new Storage(LocalStorage);
  }

  //reads local storage for JWT. if JWT not found it will fire the loggedOut subject
  isLoggedIn:Function = function () {
    return Observable.create((observer) => {
      this.storage.get(this.userDataKey).then((userData:string)  => {
        console.log(userData);
        if (userData) {
          try {
            var userDataObj:UserData = JSON.parse(userData);
            if (!userDataObj.token) {
              //storage is bad, log user out to clear
              this.logUserOut();
              observer.complete();
            }
            else {
              //token is good
              this.token = userDataObj.token;
              observer.next(true);
              observer.complete();
            }
          }
          catch (err) {
            //oops
            this.logUserOut();
            observer.complete();
          }
        }
        else {
          //nothing in storage
          observer.next(false);
          observer.complete();
        }
      });
    });
  };

  //logs the user in and then stores the token in local storage
  login:Function = function () {
    var tokenSubject = new Subject();
    this.storage.get(this.userDataKey).then((userData:string)  => {
      console.log("found user data in cache");
      if (userData) {
        var userDataObj:UserData = JSON.parse(userData);
        if (!userDataObj.token) {
          this.loginRemote().subscribe(tokenSubject);
        }
        else {
          tokenSubject.next(userDataObj);
        }
      }
      else {
        this.loginRemote().subscribe(tokenSubject)
      }
    });
    tokenSubject.subscribe((userData:UserData)=> {
      console.log("persisting user");
      console.dir(userData);
      if (userData && userData.token) {
        console.log("setting token");
        this.token = userData.token;
        this.persistUser(userData);
      }
    });
    return tokenSubject;
  };
  private persistUser:Function = function (userData) {
    this.storage.set(this.userDataKey, JSON.stringify(userData));
  };
  private loginRemote:Function = function () {
    if (this.platformProvider.isMobile) {
      console.log("log in android/ios");
      return this.loginGoogle();
    }
    else {
      console.log("log in debug token");
      return this.loginDebugToken();
    }
  };
  private loginDebugToken:Function = function () {
    return this.http.get(this.configProvider.debugTokenUrl).map(res => res.json());
  };
  private loginGoogle:Function = function () {
    return Observable.create((observer) => {
      console.log('google login');
      GooglePlus.login({'webClientId': '746307695217-p1o92k627ea6fdtd3s0921gqfs68f78q.apps.googleusercontent.com'})
        .then((res) => {
          if (res && res.idToken) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            var data = JSON.stringify({
              id_token: res.idToken
            });
            console.log("login params");
            console.dir(data);
            this.http.post(this.configProvider.googleAuthUrl, data, {headers: headers}).map(res => res.json()).subscribe(
              (res)=> {
                //todo: store the user
                console.dir(res);
                observer.next(res);
              }, (err)=> {
                console.log("login error");
                console.dir(err);
                observer.next(null);
              }, () => {
                observer.complete();
              }
            )
          }
        },
        (err) => {
          console.log("login error");
          console.log(err);
        });
    });
  };

  logUserOut:Function = function () {
    this.token = null;
    this.storage.remove(this.userDataKey);
    this.loggedOut.next(null);
  }
}

