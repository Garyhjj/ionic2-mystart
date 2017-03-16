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
  _id : string;
  name:string;
  photo:string;
  secDim:string;
  mobile:number;
  telephone:string;
  mail:string;
  position:string;
  department:string;
}

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {

  user:User;
  url : string = 'http://10.86.21.46:3700/';
  serverPhoto:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.serverPhoto = this.url + this.user.photo;
  }
  ionViewWillEnter() {
    if(localStorage.getItem('newPicture')){
      this.serverPhoto = localStorage.getItem('newPicture');
      localStorage.removeItem('newPicture');
    }
  }
  toSet():void{
    this.navCtrl.push(SetPage, {

    });
  }

  toMyDetail():void{
    this.navCtrl.push(MyDetailPage,{
      photo:this.serverPhoto
    });
  }

}
