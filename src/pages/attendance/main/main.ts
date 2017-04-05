import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewLeavePage } from '../new-leave/new-leave';

@Component({
  selector:'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {

  }

  maintain():void{
    this.navCtrl.push(NewLeavePage);
  }

}
