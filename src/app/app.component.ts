import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { NineCodePage } from '../pages/me/set/nine-code/nine-code';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = NineCodePage;

  constructor(platform: Platform) {
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
