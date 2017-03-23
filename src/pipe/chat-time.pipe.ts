import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'chatTime'})
export class ChatTimePipe implements PipeTransform {
  transform(value: number): string {
    let mesTime = new Date(value);
    let year = mesTime.getFullYear();
    let month = mesTime.getMonth();
    let day = mesTime.getDay();
    let hour = mesTime.getHours();
    let minute = mesTime.getMinutes();
    let nowTime = new Date();
    let nowyear = nowTime.getFullYear();
    let nowmonth = nowTime.getMonth();
    let nowday = nowTime.getDay();
    let show = '';
    if((nowyear - year) > 0) {
      show = 'year'
    }else if((nowday - day) > 0) {
      if((nowday - day) === 1){
        show = '昨天'
      }else if((nowday - day) === 2) {
        show = '前天'
      }else {
        show = 'month'
      }
    }else {
      show = 'time'
    }
    if(show === 'year') {
      return year+'年'+month+'月'+day+'日'
    } else if(show === 'month') {
      return month+'月'+day+'日'
    } else if(show == '昨天') {
      return '昨天'
    } else if(show == '前天') {
      return '前天'
    } else {
      return hour + ':' +minute
    }
  }
}