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

  restApiUrl:string = "https://fireappdev.herokuapp.com/api/v1";
  departmentName:String = "LAFD";

}

