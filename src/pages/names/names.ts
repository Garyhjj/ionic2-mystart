import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Contacter } from '../../interfaces/contacter';

/*
  Generated class for the Names page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-names',
  templateUrl: 'names.html'
})
export class NamesPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  // mock data
  // contacter: Contacter[] = [{
  //   name: '哲雄',
  //   full_name: '陈哲雄',
  //   company: '维森集团',
  //   position: '研发工程师',
  //   department: '市场部'
  // }, {
  //   name: '伟德',
  //   full_name: '陈伟德',
  //   company: '维森集团',
  //   position: '研发工程师',
  //   department: '销售部'
  // }];
  contacter: Contacter[];

  // 获取输入的信息
  getInputs(ev: any) {
    let val = ev.target.value;
    console.log(val);
  }

  // ionViewWillEnter() {
  //   this.storage.set('nearContacter', this.contacter);
  //   this.storage.get('nearContacter').then((val) => {
  //     console.log(val);
  //   })
  // }

  ngOnInit() {
    // this.storage.set('nearContacter', this.contacter);
  }

}
