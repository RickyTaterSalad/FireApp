import { Injectable,Output, EventEmitter } from '@angular/core';
import {Post,Message} from "../models/models";

/*
 Generated class for the EventProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class EventProvider {
  @Output() postRemoved:EventEmitter<Post> = new EventEmitter<Post>(true);
  constructor() {
  }

}

