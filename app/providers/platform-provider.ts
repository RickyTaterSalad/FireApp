import { Injectable } from '@angular/core';
import {Platform} from 'ionic-angular';
/*
 Generated class for the PlatformProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PlatformProvider {

  constructor(private platform:Platform) {
  }
  get isMobile() {
    return this.platform.is('ios') || this.platform.is('android');
  }

}

