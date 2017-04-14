import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Vibration } from '@ionic-native/vibration';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Badge } from '@ionic-native/badge';
@Injectable()
export class PluginsService {
  private unReadTip:number = 0;
  constructor(
    private camera: Camera,
    private vibration: Vibration,
    private localNotifications: LocalNotifications,
    private badge: Badge
  ) {  }
  vibrate() {
    setTimeout(() => {
      this.vibration.vibrate([200, 80, 200]);
    }, 100)
  }
  chatNotification(newMes:any,toVibrate:boolean) {
    this.localNotifications.schedule({
      id: 1,
      title: newMes.name,
      text: newMes.type === 'P'? '图片': newMes.content,
      led: 'FF0000',
      badge: this.unReadTip++
    });
    if(toVibrate) {
      this.vibrate()
    }
  }
  getPicure(type:number,size:number) {
    let options = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 100,                                            //相片质量0-100
      allowEdit: true,                                        //在选择之前允许修改截图
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: type,                                         //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      encodingType: this.camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: size,                                        //照片宽度
      targetHeight: size,                                       //照片高度
      mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
      saveToPhotoAlbum: true                                   //保存进手机相册
    };
    return this.camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      let base64Image = "" + imageData;
      return Promise.resolve(base64Image)
      // this.fileTransfer.upload(this.base64Image, this.url + "user/update/picture", this.uploadOptions)
      //   .then((data: any) => {
      //     console.log(data.response);
      //     this.serverPhoto = this.base64Image;
      //     localStorage.setItem('newPicture',this.base64Image);
      //   }, (err) => {
      //     console.log('服务器没响应')
      //   })
    }, (err) => {
      console.log(err);
    });
  }


}
