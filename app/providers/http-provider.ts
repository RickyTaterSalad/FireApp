import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import {AuthProvider} from "./auth-provider";
import {Observable,Subject} from "rxjs";
import {ConnectivityProvider} from "./connectivity-provider"
import {AlertProvider} from "./alert-provider"
/*
 Generated class for the HttpProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
interface HttpOptions {
  headers:Headers
}


@Injectable()
export class HttpProvider {

  constructor(private alertProvider:AlertProvider, private http:Http, private authProvider:AuthProvider, private connectivityProvider:ConnectivityProvider) {

  }

  public createAuthorizationHeader() {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authProvider.token);
    return headers;
  }


  private showNoNetwork:Function = function () {
    this.alertProvider.showShortMessage("No Internet Connection", "Error");
    return Observable.empty();
  };

  public get(url:string, options:HttpOptions) {
    console.log("GET: " + url + " Online: " + this.connectivityProvider.isOnline);
    if (!this.connectivityProvider.isOnline) {
      return this.showNoNetwork();
    }
    options = this.setHeaders(options);
    let subject = new Subject();
    this.http.get(url, options).subscribe((res)=> {
      var json = res.json();
      subject.next(json);
    }, (err)=> {
      if (err.status == 401) {
        this.authProvider.logUserOut();
      }
      else if (err.status == 400) {
        subject.error(err);
      }

       else {
       //network error of some sort
       subject.error("Could Not Perform Request");
       }

    }, ()=> {
      subject.complete()
    });
    return subject;
  }

  public postJSON(url:string, body:Object, options:HttpOptions) {
    console.log("postJSON: " + url + " Online: " + this.connectivityProvider.isOnline);
    if (!this.connectivityProvider.isOnline) {
      return this.showNoNetwork();
    }
    options = this.setHeaders(options);
    if (!options.headers.has("Content-Type")) {
      options.headers.append('Content-Type', 'application/json');
    }
    return this.post(url, body, options);
  }

  public delete(url, options:HttpOptions) {
    console.log("delete: " + url + " Online: " + this.connectivityProvider.isOnline);
    if (!this.connectivityProvider.isOnline) {
      return this.showNoNetwork();
    }
    options = this.setHeaders(options);
    let subject = new Subject();
    this.http.delete(url, options).subscribe((res)=> {
      var json = res.json();
      subject.next(json);
    }, (err)=> {
      if (err.status == 401) {
        this.authProvider.logUserOut();

      }
      else if (err.status == 400) {
        subject.error(err);
      }

       else {
       //network error of some sort
       subject.error("Could Not Perform Request");
       }

    }, ()=> {
      subject.complete()
    });
    return subject;
  }

  public post(url:string, body:Object, options:HttpOptions) {
    console.log("post: " + url + " Online: " + this.connectivityProvider.isOnline);
    if (!this.connectivityProvider.isOnline) {
      return this.showNoNetwork();
    }
    options = this.setHeaders(options);
    let subject = new Subject();
    this.http.post(url, body, options).subscribe((res)=> {
      var json = res.json();
      subject.next(json);
    }, (err)=> {
      if (err.status == 401) {
        this.authProvider.logUserOut();
      }
      else if (err.status == 400) {
        subject.error(err);
      }

       else {
       //network error of some sort
       subject.error("Could Not Perform Request");
       }

    }, ()=> {
      subject.complete()
    });
    return subject;
  }

  private setHeaders:Function = function (options:HttpOptions) {
    if (options && options.headers) {
      if (!options.headers.has("Authorization")) {
        options.headers.append('Authorization', 'Bearer ' + this.authProvider.token);
      }
    }
    if (!options || !options.headers) {
      if (!options) {
        options = {headers: this.createAuthorizationHeader()};
      }
    }
    return options;
  }


}




