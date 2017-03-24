import { Injectable } from '@angular/core';
import { Socket } from 'ng2-socket-io';
import { Observable }        from 'rxjs/Observable';
import { User } from '../interfaces/user';
import { Config } from '../config/default';
import { Storage } from '@ionic/storage';
import { Chat } from '../interfaces/chat';
import { Subject }           from 'rxjs/Subject';
@Injectable()
export class ChatService {

  myurl: string = new Config().baseUrl;

  // 观察是否有新消息
  public updateTerms = new Subject<boolean>();

  constructor(private socket: Socket,private storage: Storage) { }

  getUser():User{
    return JSON.parse(localStorage.getItem('user'));
  }
  login(){
    let user:User = this.getUser();
    this.socket.emit("login",{
      id:user._id,
      name:user.name
    })
  }
  // 信息储存到本地
  saveMes(mes){
    let user:User = this.getUser();
    this.storage.set(user._id+'chat',mes).then((item) => {
      this.updateTerms.next(true);
    });
  }
  // 获得本地消息
  getMes(){
    let user:User = this.getUser();
    return this.storage.get(user._id+'chat');
  }
  // 发送消息
  sendMessage(msg: string, toId:string, chatId) {
    let user:User = this.getUser();
    this.socket.emit("message", {
      id:chatId,
      toId:toId,
      fromId:user._id,
      name:user.name,
      fromPhoto:this.myurl + user.photo,
      content:msg
    });
  }
  // 设置正在聊天的的聊天室id
  setChattingId(id){
    this.storage.set('chattingId',id);
  }

  // 更新未读消息
  changeUnreadCount(mes){
    return this.storage.get('chattingId').then((id) => {
      if(mes[0].id != id) {
        mes[0].unreadCount++
      }
      return Promise.resolve(mes);
    })
  }

  // 更新本地消息
  updateLoalMes(newMes:any){
    this.getMes().then((localMes) => {
      let updateMes:Chat[] = localMes.filter((mes) => mes.id === newMes.id);
      let otherMes:Chat[] = localMes.filter((mes) => mes.id != newMes.id);
      updateMes[0].mes.push({content:newMes.content,
        time:newMes.time,
        fromId:newMes.fromId,
        toId:newMes.toId,
        fromPhoto:newMes.fromPhoto});
      this.changeUnreadCount(updateMes).then((mes) => {
        let newLocalMes :Chat[] = mes.concat(otherMes);
        this.saveMes(newLocalMes);
      })
    })
  }
  // 获取服务器消息
  getNetMessage() {
    return this.socket
      .fromEvent<any>('message');
  }

  // 发送是否打字的状态
  sendStatus(status,toId){
    let user:User = this.getUser();
    this.socket.emit("status",{
      toId:toId,
      fromId:user._id,
      name:user.name,
      status:status
    })
  }

  // 获得是否打字的状态
  getStatus(){
    return this.socket
      .fromEvent<any>("status");
  }
  hasGottenMes(mes){
    this.socket.emit('received',mes);
  }
}
