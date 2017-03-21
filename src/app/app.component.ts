import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, Nav, IonicApp } from 'ionic-angular';
import { StatusBar, Splashscreen, ScreenOrientation } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { NineCodePage } from '../pages/me/set/nine-code/nine-code';
import { SignupPage } from '../pages/signup/signup';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = NineCodePage;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild('myNav') nav: Nav;
  constructor(public ionicApp: IonicApp, public platform: Platform, public toastCtrl: ToastController, private storage: Storage) {
    if (localStorage.getItem('needPassNineCode') == 'false' || !localStorage.getItem('user')) {
      this.rootPage = SignupPage;
    }
    if (localStorage.getItem('toValiPassword')) {
      localStorage.removeItem('toValiPassword')
    }
    console.log(localStorage.getItem('myNineCode'))
    //第一次安装app后设置手势密码页面为登录验证
    if (!localStorage.getItem('needPassNineCode')) {
      localStorage.setItem('needPassNineCode', 'true');
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      // this.registerBackButtonAction();//注册返回按键事件
      // set to either landscape 限制为竖屏显示
      ScreenOrientation.lockOrientation('portrait').catch((error) => {
        console.log(error);
      });
    });
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => { });
        activePortal.onDidDismiss(() => { });
        return;
      }
      let activeVC = this.nav.getActive();
      if (activeVC.component.name == 'TabsPage') {
        let tabs = activeVC.instance.tabs;
        let activeNav = tabs.getSelected();
        return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
      } else {
        return this.showExit()
      }
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }
}
