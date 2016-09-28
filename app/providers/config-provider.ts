import { Injectable } from '@angular/core';

/*
 Generated class for the ConfigProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ConfigProvider {
  constructor() {
  }


//  private serverUrl = "https://fireappdev.herokuapp.com";
  serverUrl = "http://localhost:3000";
  googleAuthUrl:string = this.serverUrl + "/auth/google";
  debugTokenUrl:string = this.serverUrl + "/auth/generateToken";
  restApiUrl:string = this.serverUrl + "/api/v1";
  departmentName:String = "LAFD";

}

