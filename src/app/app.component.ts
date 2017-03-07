import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { NineCodePage } from '../pages/me/set/nine-code/nine-code';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = NineCodePage;

  constructor(platform: Platform) {
    console.log(localStorage.getItem('myNineCode'))
    //设置手势密码页面为登录验证功能
    localStorage.setItem('isPassNineCode','false');
    if(!localStorage.getItem('myNineCode')){
      localStorage.setItem('myNineCode','036');
    };
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

    });
  }
}
