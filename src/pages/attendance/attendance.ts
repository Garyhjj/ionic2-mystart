import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewLeavePage } from './attendance-maintain/new-leave/new-leave';

@Component({
  selector:'page-attendance',
  templateUrl: 'attendance.html'
})
export class AttendancePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {

  }

  maintain():void{
    this.navCtrl.push(NewLeavePage);
  }

}
