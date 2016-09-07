import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({name: 'objectContainsProperty'})
export class ObjectContainsProperty implements PipeTransform {
  transform(value:Object,args:string):boolean {
    console.log("---START---")
    console.dir(value);
    console.log(args);
    console.log("---END---")
    var hasConv =  args && value ? value[args] : false;
    console.log(hasConv);
    return hasConv;
  }
}
