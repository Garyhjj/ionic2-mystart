import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../../../interfaces/user';
/*
  Generated class for the BookLibrary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'my-qr.html'
})
export class MyQrPage {

  constructor(public navCtrl: NavController, public navParams: NavParams ) {
  }
  user: User;
  url : string = 'http://10.86.21.46:3700/';
  myQr: string;
  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.myQr = this.url + this.user.secDim;
  }


  ionViewWillEnter() {

  }
}
