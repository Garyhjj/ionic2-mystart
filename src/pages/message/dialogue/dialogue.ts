import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
// import { Message } from '../../classes/Message';
import { Subscription } from 'rxjs/Rx';
import { ChatService } from '../../../services/ChatService';

@Component({
  selector: 'page-dialogue',
  templateUrl: 'dialogue.html'
})

export class DialoguePage implements OnInit {
  list=[];
  input_text:string;
  userinfo;

  userName;
  userNickName;
  chatTarget;
  status = '';
  jmessageHandler: Subscription; //接收句柄，再view被关闭的时候取消订阅，否则对已关闭的view进行数据脏检查会报错

  constructor(public params: NavParams, private ref: ChangeDetectorRef, private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatTarget = this.params.data;
    this.userinfo = JSON.parse(localStorage.getItem('user'));
    this.chatService.getMessage().subscribe((obj) => {
      this.list.push(obj);
    });
    this.chatService.getStatus().subscribe((obj) => {
      if(obj.fromId === this.chatTarget.id){
        this.status=obj.status === "writing"? "       正在输入":"";
      }
    })
  }

  ionViewDidEnter() {


  }

  ionViewWillLeave() {

  }

  sendMes(){
    this.chatService.sendMessage(this.input_text,this.chatTarget.id);
    this.input_text = '';
  }
  sendStatus(status){
    this.chatService.sendStatus(status,this.chatTarget.id);
  }
}
