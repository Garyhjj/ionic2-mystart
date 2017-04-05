import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
// import { Message } from '../../classes/Message';
import { Subscription } from 'rxjs/Rx';
import { ChatService } from '../services/chatService';
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
    this.chatService.reSetUnreadCount(_index);
    // 获取历史消息
    this.chatService.getMes().then((mes) => {
      this.list = mes[_index].mes;
      mes[_index].unreadCount = 0;
      this.chatService.saveMes(mes,[]);
    })
    this.userinfo = JSON.parse(localStorage.getItem('user'));
    // 接收新消息
    this.chatService.getNetMessage().subscribe((obj) => {
      if(obj.fromId === this.userinfo._id){
        for(let i = this.list.length-1;i>=0;i--){
          if(this.list[i].insideId === obj.insideId){
            this.list[i].time =obj.time;
            this.list[i].unSend = false;
            break;
          }
        }
      }else {
        this.list.push(obj);
      }
    });
    // 接收状态消息
    this.chatService.getStatus().subscribe((obj) => {
      if(obj.fromId === this.chatTarget.toId){
        this.status= obj.status === "writing"? "       正在输入":"";
      }
    })
    this.chatService.unReceiveTerms.subscribe((status) => {
      this.chatService.getMes().then((mes) => {
        this.list = mes[_index].mes;
      })
    })
  }

  ionViewDidEnter() {
    document.getElementById('msgarea')
  }

  ionViewWillLeave() {
    // 设置正在聊天的房间号为空
    this.chatService.setChattingId('');
    this.chatService.getMes().then((mes) => {
      let index = -1;
      for(let i = 0 ;i<mes.length; i++) {
        if(mes[i].id === this.chatTarget.id) {
          index = i;
          break;
        }
      }
      if(index != -1){
        mes[index].mes = this.list;
        this.chatService.saveMes(mes,[]);
      }
    })
  }

  // 发送消息
  sendMes(){
    if(this.input_text){
      let insideId =Date.parse(new Date().toString())+Math.random()*1000;
      this.list.push({
        toId:this.chatTarget.toId,
        fromId:this.userinfo._id,
        name:this.userinfo.name,
        fromPhoto:this.myurl + this.userinfo.photo,
        content:this.input_text,
        unSend:true,
        time:Date.parse(new Date().toString()),
        insideId:insideId
      })
      this.chatService.sendMessage(this.input_text,this.chatTarget.toId,this.chatTarget.id,insideId);
      this.input_text = '';
    }
  }
  // 发送状态
  sendStatus(status){
    this.chatService.sendStatus(status,this.chatTarget.toId);
  }
}
