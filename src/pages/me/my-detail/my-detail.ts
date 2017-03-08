import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera } from 'ionic-native';
/*
  Generated class for the BookLibrary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'my-detail.html'
})
export class MyDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController) {
  }
  user: any;
  base64Image: string;

  ionViewDidLoad() {
    this.user = this.navParams.data.user;
  }


  ionViewWillLeave() {
  }

  changePhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '更换头像',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            Camera.getPicture({
              destinationType: Camera.DestinationType.DATA_URL,
              targetWidth: 1000,
              targetHeight: 1000
            }).then((imageData) => {
              // imageData is a base64 encoded string
              this.base64Image = "data:image/jpeg;base64," + imageData;
              this.user.photo = this.base64Image;
            }, (err) => {
              console.log(err);
            });
          }
        }, {
          text: '从相册选择',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
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
