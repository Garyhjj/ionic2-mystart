import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SetPage } from './set/set';
import { MyDetailPage } from './my-detail/my-detail';
/*
  Generated class for the Me page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

class User{
  name:string;
  photo:string;
  secDim:string;
  mobile:number;
  telephone:number;
  mail:string;
  position:string;
  department:string;
}

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {

  user:User={
    name:"杨元文",
    photo:"../assets/images/head.jpg",
    secDim:"",
    mobile:12345678910,
    telephone:12345678,
    mail:"123@163.com",
    position:"总经理",
    department:"维森集团/集团总经办"
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    
  }
  toSet():void{
    this.navCtrl.push(SetPage, {

    });
  }

  toMyDetail():void{
    this.navCtrl.push(MyDetailPage, {
      user:this.user,
    });
  }

}
