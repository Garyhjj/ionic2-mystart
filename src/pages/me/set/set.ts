import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NineCodePage }  from './nine-code/nine-code';
import { SignupPage } from '../../signup/signup';
/*
  Generated class for the BookLibrary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'set.html'
})
export class SetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }
  ionViewDidLoad() {
  }
  ionViewWillEnter() {

  }
  ionViewWillLeave() {

  }

  // 注销用户
  exit():void {
    // let confirm = this.alertCtrl.create({
    //   title: '确定退出',
    //   buttons: [
    //     {
    //       text: '取消',
    //       handler: () => {
    //
    //       }
    //     },
    //     {
    //       text: '确定',
    //       handler: () => {
    //
    //       }
    //     }
    //   ]
    // });
    // confirm.present();
    this.navCtrl.setRoot(SignupPage);
  }
  // 到手势密码修改
  toNineCode():void {
    this.navCtrl.push(NineCodePage,{
      reset:true
    });
  }
}
