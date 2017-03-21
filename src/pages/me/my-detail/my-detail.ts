import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera, Transfer, BarcodeScanner } from 'ionic-native';
import { UpdateDetailPage } from './update-detail/update-detail';
import { MyQrPage } from './my-qr/my-qr';
import { User } from '../../../interfaces/user';
import { Config } from '../../../config/default';
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
  user: User;
  url : string = new Config().baseUrl;
  base64Image: string;
  uploadOptions: any;
  serverPhoto:string;
  fileTransfer = new Transfer();
  fileStore : string = 'file:///storage/emulated/0/com.shundaOa/user/images/' //安卓的物件存放位置
  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.uploadOptions = {
      fileKey: 'file',
      fileName: this.user.accountName + '.jpg',
      params: { 'accountName': this.user.accountName }
    };
    this.serverPhoto = this.navParams.data.photo;
  }


  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));
    // let url = 'http://10.86.21.46:3700/images/1489386271550yuanwen.yang.jpg';
    // // console.log(cordova.file.dataDirectory);
    // this.fileTransfer.download(url, this.fileStore + this.user.accountName+'.jpg').then((entry) => {
    //   console.log('download complete: ' + entry.toURL());
    // }, (error) => {
    //   console.log(error)
    // });
  }
  getNewPhoto(type: number) {


    let options = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 100,                                            //相片质量0-100
      allowEdit: true,                                        //在选择之前允许修改截图
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: type,                                         //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: 800,                                        //照片宽度
      targetHeight: 800,                                       //照片高度
      mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
      saveToPhotoAlbum: true                                   //保存进手机相册
    };
    Camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.fileTransfer.upload(this.base64Image, this.url + "user/update/picture", this.uploadOptions)
        .then((data: any) => {
          console.log(data.response);
          this.serverPhoto = this.base64Image;
          localStorage.setItem('newPicture',this.base64Image);
        }, (err) => {
          console.log('服务器没响应')
        })
    }, (err) => {
      console.log(err);
    });
  }
  changePhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '更换头像',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.getNewPhoto(1);
          }
        }, {
          text: '从相册选择',
          handler: () => {
            this.getNewPhoto(0);
          }
        }, {
          text: '取消',
          role: '取消',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

  changM(type,val):void {
    this.navCtrl.push(UpdateDetailPage,{
      type:type,
      value:val
    })
  }

  showQr():void {
    // 从前端获取
    BarcodeScanner.encode('TEXT_TYPE',this.user.accountName).then((res) => {
    }, (err) => {
      console.log(err)
    })
    // // 从后台获取
    // this.navCtrl.push(MyQrPage);
  }
}
