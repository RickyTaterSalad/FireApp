import { Injectable } from '@angular/core';
import {ConfigProvider} from "./config-provider";

import {HttpProvider} from "./http-provider";
import {AuthProvider} from "./auth-provider";
import {AlertProvider} from "./alert-provider";
import {Storage, LocalStorage} from 'ionic-angular';
import {Observable,Subject} from "rxjs";

import 'rxjs/add/operator/map';

/*
  Generated class for the StationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StationProvider {
    stationsEndpoint:string;
    stations:any;
    private storage:Storage;
    private stationsKey:string = "station_list";

    constructor(private config:ConfigProvider,
                private httpProvider:HttpProvider,
                private authProvider:AuthProvider,
                private alertProvider:AlertProvider) {

        this.stationsEndpoint = config.restApiUrl + "/stations";
        this.storage = new Storage(LocalStorage);

    }

    private loadStations:Function = function(){
        var subject = new Subject();
        this.storage.get(this.stationsKey).then(
            (stationsString:string)=> {
                console.log("found station data in cache");
                if(stationsString){
                    try {
                        var asJson = JSON.parse(stationsString);
                        this.stations = asJson;
                        subject.next(asJson);
                        subject.complete();
                        return;
                    }
                    catch (err) {
                        //invalid json in storage
                    }
                }

                //not local, hit the server
                var remoteStationsSubject = this.httpProvider.get(this.stationsEndpoint);
                remoteStationsSubject.subscribe(
                    (stations)=>{
                        if(stations){
                            this.stations = stations;
                            this.storage.set(this.stationsKey, JSON.stringify(stations));
                            subject.next(this.stations);
                        }
                    },
                    (err)=> {
                        this.alertProvider.showShortMessage(err && err._body ? err._body : "Could Not Load Stations", "Error");
                    }
                );
        });
        return subject;
    };

    Stations:Function = function () {
      if (this.stations) {
        return Observable.of(this.stations);
      }
      else {
        return this.loadStations();
      }
    }
};
