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
        sound: null
      });
      this.vibration.vibrate([200, 80, 200]);
    }, 10)

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
          console.log(2)
          this.hasGottenMes(newMes);
          this.vibrate(newMes);
        }
      } else {
        if (newMes.fromId != this.getUser()._id) {
          console.log(1)
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
  sendMessage(msg: string, toId: string, chatId: string, insideId: number) {
    let user: User = this.getUser();
    let newMes = {
      id: chatId,
      toId: toId,
      fromId: user._id,
      name: user.name,
      fromPhoto: this.myurl + user.photo,
      content: msg,
      time: this.time,
      insideId: insideId
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
      fromPhoto: newMes.fromPhoto
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
          fromPhoto: OutlineMessages[i].fromPhoto
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
