import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { SetPage } from './set/set';
import { MyDetailPage } from './my-detail/my-detail';
import { User } from '../../interfaces/user';
import { Config } from '../../config/default';
/*
  Generated class for the Me page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {

  user: User;
  url: string = new Config().baseUrl;
  serverPhoto: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.serverPhoto = this.url + this.user.photo;
  }
  ionViewWillEnter() {
    if (localStorage.getItem('newPicture')) {
      this.serverPhoto = localStorage.getItem('newPicture');
      localStorage.removeItem('newPicture');
    }
  }
  toSet(): void {
    this.navCtrl.push(SetPage, {

    });
  }

  toMyDetail(): void {
    this.navCtrl.push(MyDetailPage, {
      photo: this.serverPhoto
    });
  }

  // 获取二维码信息
  getQrMessage(): void {
    BarcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData)
    }, (err) => {
      console.log(err)
    });


  }

}
