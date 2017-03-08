import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera, ImagePicker } from 'ionic-native';
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
    let options = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 100,                                            //相片质量0-100
      allowEdit: false,                                        //在选择之前允许修改截图
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: 200,                                        //照片宽度
      targetHeight: 200,                                       //照片高度
      mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
      saveToPhotoAlbum: true                                   //保存进手机相册
    };
    let actionSheet = this.actionSheetCtrl.create({
      title: '更换头像',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            Camera.getPicture(options).then((imageData) => {
              // imageData is a base64 encoded string
              this.base64Image = "data:image/jpeg;base64," + imageData;
              this.user.photo = this.base64Image;
              console.log(this.user.photo);
            }, (err) => {
              console.log(err);
            });
          }
        }, {
          text: '从相册选择',
          handler: () => {
            ImagePicker.getPictures({
              maximumImagesCount: 1,
              width:400,
              height:400,
              quality: 100
            }).then((results) => {
              this.user.photo = results[0];
            }, (err) => { });
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
