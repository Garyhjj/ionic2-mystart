import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Socket } from 'ng2-socket-io';
import { User } from '../../../interfaces/user';
import { Config } from '../../../config/default';
import { Storage } from '@ionic/storage';
import { Chat } from '../interfaces/chat';
import { Subject }           from 'rxjs/Subject';
import { Vibration } from '@ionic-native/vibration';
import { Network } from '@ionic-native/network';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Camera } from 'ionic-native';

@Injectable()
export class ChatService {

  myurl: string = new Config().baseUrl;

  // 观察是否有新消息
  public updateTerms = new Subject<boolean>();
  public sendTerms = new Subject<any>();
  public unReceiveTerms = new Subject<any>();
  time: number = 0;
  unSendMessages: any = [];
  tempMes: Chat[] = [];
  hasNet: boolean = true;
  num:number = 1;
  constructor(
    private socket: Socket,
    private storage: Storage,
    private vibration: Vibration,
    private network: Network,
    public toastCtrl: ToastController,
    private localNotifications: LocalNotifications
  ) {
    // 获取服务器时间
    this.getTime().subscribe((time) => {
      this.time = Date.parse(time);
    })
    this.getMes().then((mes) => {
      this.tempMes = mes
    })

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.hasNet = false;
      this.toastCtrl.create({
        message: '无可用网络',
        duration: 2000,
        position: 'top'
      }).present()
      this.disconnect();
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.hasNet = true;
      this.connect();
      this.login();
    });
  }
  connect() {
    this.socket.connect()
  }
  disconnect() {
    this.socket.disconnect();
  }
  isConnected() {
    return this.socket.ioSocket.connected;
  }
  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
  login() {
    if (!this.hasNet) return;
    let user: User = this.getUser();
    this.socket.emit("login", {
      id: user._id,
      name: user.name
    })
  }
  vibrate(newMes:any) {
    setTimeout(() => {
      this.localNotifications.schedule({
        title: newMes.name,
        text: newMes.content,
        led: 'FF0000',
      });
      this.vibration.vibrate([200, 80, 200]);
    }, 10)

  }
  getPicure(type:number) {
    let options = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 100,                                            //相片质量0-100
      allowEdit: true,                                        //在选择之前允许修改截图
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: type,                                         //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: 200,                                        //照片宽度
      targetHeight: 200,                                       //照片高度
      mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
      saveToPhotoAlbum: true                                   //保存进手机相册
    };
    return Camera.getPicture(options).then((imageData) => {
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
  clearMes():void{
    let user: User = this.getUser();
    let chat:any;
    if (JSON.parse(localStorage.getItem('user'))._id === '58c756fbd87f6f0b082ff472') {
      chat = [{
        id: '58c756fbd87f6f0b082ff472' + '58c79aa4e82b541968c9a29f',
        fromId: '58c756fbd87f6f0b082ff472',
        toId: '58c79aa4e82b541968c9a29f',
        toName: '吴汉三',
        fromName: '杨元文',
        toPhoto: 'http://10.86.21.56:3700/user/photo/hansan.wu.jpg',
        mes: [{
          content: '小文哥，我穷',
          time: 1480338091398,
          fromId: '58c79aa4e82b541968c9a29f',
          toId: '58c756fbd87f6f0b082ff472',
          fromPhoto: 'http://10.86.21.56:3700/user/photo/hansan.wu.jpg',
          type:'T'
        }],
        unreadCount: 1,
        type: "dialogue"
      }]

    } else {
      chat = [{
        id: '58c756fbd87f6f0b082ff472' + '58c79aa4e82b541968c9a29f',
        fromId: '58c79aa4e82b541968c9a29f',
        toId: '58c756fbd87f6f0b082ff472',
        toName: '杨元文',
        fromName: '吴汉三',
        toPhoto: 'http://10.86.21.56:3700/user/photo/yuanwen.yang.jpg',
        mes: [{
          content: '小三哥，我穷',
          time: 1480338091298,
          fromId: '58c756fbd87f6f0b082ff472',
          toId: '58c79aa4e82b541968c9a29f',
          fromPhoto: 'http://10.86.21.56:3700/user/photo/yuanwen.yang.jpg',
          type:'T'
        }],
        unreadCount: 1,
        type: "dialogue"
      }]
    }
    this.storage.set(user._id + 'chat', chat).then((item) => {
      this.updateTerms.next(true);
    })
  }
  // 信息储存到本地
  saveMes(mes: Chat[], newMes: any) {
    let user: User = this.getUser();
    this.storage.set(user._id + 'chat', mes).then((item) => {
      this.updateTerms.next(true);
      if (!newMes || newMes.length === 0) return;

      if (newMes.length > 0) {
        this.unReceiveTerms.next(true);
        if (newMes[0].fromId != this.getUser()._id) {
          this.hasGottenMes(newMes);
          this.vibrate(newMes[newMes.length-1]);
        }
      } else {
        if (newMes.fromId != this.getUser()._id) {
          this.hasGottenMes(newMes);
          this.vibrate(newMes);
        }
      }
    });
  }
  // 获得本地消息

  getMes() {
    let user: User = this.getUser();
    return this.storage.get(user._id + 'chat');
  }
  getTempMes() {
    return this.tempMes;
  }
  // 发送消息
  sendMessage(msg: string, toId: string, chatId: string, insideId: number,type:string) {
    let user: User = this.getUser();
    let newMes = {
      id: chatId,
      toId: toId,
      fromId: user._id,
      name: user.name,
      fromPhoto: this.myurl + user.photo,
      content: msg,
      type:type,
      time: this.time,
      insideId: insideId,
    }
    if (this.socket.ioSocket.connected) {
      if (this.unSendMessages.length > 0) {
        for (let i = 0; i < this.unSendMessages.length; i++) {
          this.socket.emit("message", this.unSendMessages[i]);
          this.sendTerms.next(newMes);
        }
        this.unSendMessages = [];
      }
      this.socket.emit("message", newMes);
      this.sendTerms.next(newMes);
    } else {
      this.unSendMessages.push(newMes);
      if (this.hasNet) {
        this.toastCtrl.create({
          message: '有网络,但无法连接服务器',
          duration: 2000,
          position: 'top'
        }).present()
      }
    }

  }
  // 设置正在聊天的的聊天室id
  setChattingId(id: string) {
    this.storage.set('chattingId', id);
  }
  // 归零未读消息
  reSetUnreadCount(index: number) {
    this.tempMes[index].unreadCount = 0;
    this.saveMes(this.tempMes, '');
  }
  // 更新未读消息
  changeUnreadCount(mes: Chat[]) {
    if (mes[0].mes[mes[0].mes.length - 1].fromId === this.getUser()._id) {
      return Promise.resolve(mes);
    } else {
      return this.storage.get('chattingId').then((id) => {
        if (mes[0].id != id) {
          mes[0].unreadCount++
        }
        return Promise.resolve(mes);
      })
    }
  }

  // 获取服务器的时间
  getTime() {
    return this.socket
      .fromEvent<any>('time');
  }
  // 更新本地消息
  updateLoalMes(newMes: any) {
    let localMes: Chat[] = this.getTempMes();
    // 不能每次都异步get 会漏数据
    // this.getMes().then((localMes) => {
    let updateMes: Chat[] = localMes.filter((mes) => mes.id === newMes.id);
    let otherMes: Chat[] = localMes.filter((mes) => mes.id != newMes.id);
    updateMes[0].mes.push({
      content: newMes.content,
      time: newMes.time,
      fromId: newMes.fromId,
      toId: newMes.toId,
      fromPhoto: newMes.fromPhoto,
      type:newMes.type
    });
    // let newLocalMes: Chat[] = updateMes.concat(otherMes);
    // this.saveMes(newLocalMes,newMes);
    // this.tempMes = newLocalMes;
    this.changeUnreadCount(updateMes).then((mes) => {
      let newLocalMes: Chat[] = mes.concat(otherMes);
      this.tempMes = newLocalMes;
      this.saveMes(newLocalMes, newMes);
    })
    // })
  }
  // 插入离线消息
  updateOutlineMes(OutlineMessages: any) {
    if (OutlineMessages.length === 0) return;
    // let localMes = this.getTempMes();
    this.getMes().then((localMes: Chat[]) => {
      let newLocalMes: any = [];
      for (let i = 0; i < OutlineMessages.length; i++) {
        let updateMes: Chat[] = localMes.filter((mes) => mes.id === OutlineMessages[i].id);
        let otherMes: Chat[] = localMes.filter((mes) => mes.id != OutlineMessages[i].id);
        updateMes[0].mes.push({
          content: OutlineMessages[i].content,
          time: OutlineMessages[i].time,
          fromId: OutlineMessages[i].fromId,
          toId: OutlineMessages[i].toId,
          fromPhoto: OutlineMessages[i].fromPhoto,
          type: OutlineMessages[i].type
        });
        updateMes[0].unreadCount++;
        newLocalMes = updateMes.concat(otherMes)
      }
      this.saveMes(newLocalMes, OutlineMessages);
    })
  }
  // 获取实时服务器消息
  getNetMessage() {
    return this.socket
      .fromEvent<any>('message' + this.getUser()._id);
  }
  // 获取离线服务器消息
  getOutLineMessages() {
    return this.socket
      .fromEvent<any>('OutlineMessages' + this.getUser()._id);
  }

  // 获取是否有离线消息
  ifOutLineMessages() {
    return this.socket
      .fromEvent<any>('hasOutlineMes' + this.getUser()._id);
  }

  // 发送是否打字的状态
  sendStatus(status: string, toId: string) {
    let user: User = this.getUser();
    this.socket.emit("status", {
      toId: toId,
      fromId: user._id,
      name: user.name,
      status: status
    })
  }

  // 获得是否打字的状态
  getStatus() {
    return this.socket
      .fromEvent<any>("status");
  }
  hasGottenMes(mes: any) {
    this.socket.emit('received', mes);
  }
}
