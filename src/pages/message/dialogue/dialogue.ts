import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
// import { Message } from '../../classes/Message';
import { Subscription } from 'rxjs/Rx';
import { ChatService } from '../../../services/ChatService';
import { Config } from '../../../config/default';

@Component({
  selector: 'page-dialogue',
  templateUrl: 'dialogue.html'
})

export class DialoguePage implements OnInit {
  list=[];
  input_text:string;
  userinfo;
  myurl: string = new Config().baseUrl;
  userName;
  userNickName;
  chatTarget;
  status = '';

  constructor(public params: NavParams, private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatTarget = this.params.data.mes;
    // 设置聊天室id
    this.chatService.setChattingId(this.chatTarget.id);
    let _index:number = this.params.data._index;
    // 获取历史消息
    this.chatService.getMes().then((mes) => {
      this.list = mes[_index].mes;
      mes[_index].unreadCount = 0;
      this.chatService.saveMes(mes);
    })
    this.userinfo = JSON.parse(localStorage.getItem('user'));
    // 接收新消息
    this.chatService.getNetMessage().subscribe((obj) => {
      if(obj.fromId != this.userinfo._id){
          this.chatService.hasGottenMes(obj);
      }
      if(obj.fromId === this.userinfo._id) {
        this.list.pop();
      }
      this.list.push(obj);
    });
    // 接收状态消息
    this.chatService.getStatus().subscribe((obj) => {
      if(obj.fromId === this.chatTarget.toId){
        this.status= obj.status === "writing"? "       正在输入":"";
      }
    })
  }

  ionViewDidEnter() {
    document.getElementById('msgarea')
  }

  ionViewWillLeave() {
    // 设置正在聊天的房间号为空
    this.chatService.setChattingId('');
  }

  // 发送消息
  sendMes(){
    if(this.input_text){
      this.list.push({
        toId:this.chatTarget.toId,
        fromId:this.userinfo._id,
        name:this.userinfo.name,
        fromPhoto:this.myurl + this.userinfo.photo,
        content:this.input_text + '**'
      })
      this.chatService.sendMessage(this.input_text,this.chatTarget.toId,this.chatTarget.id);
      this.input_text = '';
    }
  }
  // 发送状态
  sendStatus(status){
    this.chatService.sendStatus(status,this.chatTarget.toId);
  }
}
