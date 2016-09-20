import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import {AuthProvider} from "../providers/auth-provider";
/*
 Generated class for the HttpProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class HttpProvider {

  constructor(private authProvider:AuthProvider) {
  }

  public generateJsonContentHeader:Function = function ():Headers {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authProvider.token);
    headers.append('Content-Type', 'application/json');
    return headers;

  };
  public createAuthorizationHeader() {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authProvider.token);
    return headers;
  }

}




