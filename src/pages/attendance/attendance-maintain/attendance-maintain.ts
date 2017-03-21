import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewLeavePage } from './new-leave/new-leave';

@Component({
  selector: 'page-attendance-maintain',
  templateUrl: 'attendance-maintain.html'
})
export class AttendanceMaintainPage {

  availableHoliday = {
    year: 5,
    day: 2,
    hour: 3
  }

  uesdHoliday = [{
    name: '事假',
    day: 5
  },
  { name: '病假', day: 4 },
  { name: '公假', day: 3 },
  { name: '補假', day: 2 },
  { name: '补休', day: 1 },
  { name: '停线', day: 0 },
  { name: '婚假', day: 0 },
  { name: '产假',day: 0 },
  { name: '陪产假',day: 0 },
  { name: '授乳假',day: 5 },
  { name: '曠職',day: 0 },
  { name: '流產假',day: 0 },
  { name: '喪假',day: 0 },
  { name: '工傷',day: 0 }]
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {

  }

  newLeave():void{
    this.navCtrl.push(NewLeavePage);
  }
}
