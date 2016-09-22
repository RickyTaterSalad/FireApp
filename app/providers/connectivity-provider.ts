import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Observable, BehaviorSubject} from 'rxjs';
import {PlatformProvider} from "./platform-provider"
import {Network} from 'ionic-native';
@Injectable()
export class ConnectivityProvider {

  constructor(private platformProvider:PlatformProvider) {

  }
  get isOnline():boolean {
    return this.platformProvider.isMobile ? Network.connection != 'none' : navigator.onLine;
  }
}
