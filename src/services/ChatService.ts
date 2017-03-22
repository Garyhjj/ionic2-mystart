import { Injectable } from '@angular/core';
import { Socket } from 'ng2-socket-io';
import { Observable }        from 'rxjs/Observable';
import { User } from '../interfaces/user';
import { Config } from '../config/default';
@Injectable()
export class ChatService {

  myurl: string = new Config().baseUrl;
  constructor(private socket: Socket) { }
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

  sendMessage(msg: string, toId:string) {
    let user:User = this.getUser();
    this.socket.emit("message", {
      toId:toId,
      fromId:user._id,
      name:user.name,
      photo:this.myurl + user.photo,
      mes:msg
    });
  }

  getMessage() {
    return this.socket
      .fromEvent<any>("message");
  }
  sendStatus(status,toId){
    let user:User = this.getUser();
    this.socket.emit("status",{
      toId:toId,
      fromId:user._id,
      name:user.name,
      status:status
    })
  }
  getStatus(){
    return this.socket
      .fromEvent<any>("status");
  }
}
