import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
/*
  Generated class for the BookLibrary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'my-detail.html'
})
export class MyDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl:ActionSheetController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
  user:any;
  ionViewDidLoad() {
    this.user=this.navParams.data.user;
    this.tabBarElement.style.display = 'none';
  }

  tabBarElement:any;

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  changePhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '更换头像',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: '从相册选择',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: '取消',
          role: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
