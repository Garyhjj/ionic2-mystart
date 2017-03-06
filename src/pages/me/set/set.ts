import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NineCodePage }  from './nine-code/nine-code';
/*
  Generated class for the BookLibrary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'set.html'
})
export class SetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  ionViewWillEnter() {

  }
  ionViewWillLeave() {

  }

  toNineCode():void {
    this.navCtrl.push(NineCodePage);
  }
}
