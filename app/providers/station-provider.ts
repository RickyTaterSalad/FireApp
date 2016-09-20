import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { ConfigProvider } from "./config-provider";
import {Station} from "../models/station";
import {Observable} from "rxjs";
import {Storage, LocalStorage} from 'ionic-angular';
import {HttpProvider} from "./http-provider";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/cache';
/*
 Generated class for the DepartmentProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class StationProvider {
  stationsEndpoint:string;
  storage:Storage;

  constructor(private http:Http, private config:ConfigProvider, private httpProvider:HttpProvider) {
    this.stationsEndpoint = config.restApiUrl + "/stations";
    this.storage = new Storage(LocalStorage);
  }
  get Stations():Observable<Array<Station>> {
    return Observable.create((observer) => {
      this.storage.get('station_list').then(stationList  => {
        if (stationList) {
          observer.next(JSON.parse(stationList));
          observer.complete()
        }
        else {
          let headers =  this.httpProvider.createAuthorizationHeader();
          this.http.get(this.stationsEndpoint, {headers: headers}).map(res => res.json()).cache().subscribe(stationList => {
            this.storage.set('station_list', JSON.stringify(stationList));
            observer.next(stationList);
            observer.complete();
          });
        }
      });

    });

  }


}

