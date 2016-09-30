import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth-provider";
import {Department, Station} from "../../models/models";
import {DepartmentProvider} from "../../providers/department-provider";
import {AccountProvider} from "../../providers/account-provider";
import {StationProvider} from "../../providers/station-provider";


/*
  Generated class for the RegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/register/register.html'
})
export class RegisterPage {
    selectedRank: string;
    selectedPlatoon : string;
    department : Department;
    ranks : string[];
    platoons : string[];
    stations : Station[];

    constructor(private navCtrl: NavController,
                private authProvider:AuthProvider,
                private accountProvider:AccountProvider,
                private departmentProvider:DepartmentProvider,
                private stationProvider:StationProvider) {

            departmentProvider.Department().subscribe(
                (dept) => {
                    this.department = dept;
                    this.ranks = this.department.ranks;
                    this.platoons = this.department.platoons;
                }
            );

            stationProvider.Stations().subscribe(
                (stations) => {
                    this.stations = stations;
                }
            );
    }

  private register:Function = function() {
      this.accountProvider.register("","","");
  }
}
