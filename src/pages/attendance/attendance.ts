import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AttendanceMaintainPage } from './attendance-maintain/attendance-maintain';
@Component({
  selector:'page-attendance',
  templateUrl: 'attendance.html'
})
export class AttendancePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {

  }

  maintain():void{
    this.navCtrl.push(AttendanceMaintainPage);
  }

}
