import { Component, OnInit, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import { ChatService } from '../services/chatService';
import { Config } from '../../../config/default';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-dialogue',
  templateUrl: 'dialogue.html'
})

export class DialoguePage implements OnInit, AfterViewChecked {
  chatting:boolean
  list:any=[];
  input_text:string;
  userinfo:any;
  myurl: string = new Config().baseUrl;
  chatTarget:any;
  status:string = '';
  addS:boolean = false;;
  frontBas64:string = 'data:image/jpeg;base64,';
  constructor(public params: NavParams, private chatService: ChatService, private ref: ChangeDetectorRef, private keyboard: Keyboard) {
  }

  ngOnInit() {
    this.chatting = true;
    this.chatTarget = this.params.data.mes;
    // 设置聊天室id
    this.chatService.setChattingId(this.chatTarget.id);
    let _index:number = this.params.data._index;
    // 对未读数目清零
    this.chatService.reSetUnreadCount(_index);
    // 获取历史消息
    this.list = this.chatTarget.mes;
    this.userinfo = JSON.parse(localStorage.getItem('user'));
    // 接收新消息
    this.chatService.getNetMessage().subscribe((obj) => {
      if(!this.chatting) return;
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
      this.ref.detectChanges();
      let chatArea = document.getElementsByClassName('scroll-content')[2];
      chatArea.scrollTop = chatArea.scrollHeight;
    });
    // 接收状态消息
    this.chatService.getStatus().subscribe((obj) => {
      if(!this.chatting) return;
      if(obj.fromId === this.chatTarget.toId){
        this.status= obj.status === "writing"? "       正在输入":"";
        this.ref.detectChanges();
      }
    })
    this.chatService.unReceiveTerms.subscribe((status) => {
      if(!this.chatting) return;
      this.chatService.getMes().then((mes) => {
        this.list = mes[_index].mes;
        this.ref.detectChanges();
      })
    })

    this.keyboard.onKeyboardShow().subscribe((e) => {
      if(!this.chatting) return;
      let chatArea = document.getElementsByClassName('scroll-content')[2];
      chatArea.scrollTop = chatArea.scrollHeight;
    })
  }

  ngAfterViewChecked() {
    let chatArea = document.getElementsByClassName('scroll-content')[2];
    chatArea.scrollTop = chatArea.scrollHeight;
  }
  ionViewDidEnter() {

  }

  ionViewWillLeave() {
    this.chatting = false;
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
        insideId:insideId,
        type:'T'
      })
      this.chatService.sendMessage(this.input_text,this.chatTarget.toId,this.chatTarget.id,insideId,'T');
      this.input_text = '';
    }
  }
  // 发送状态
  sendStatus(status:string){
    this.chatService.sendStatus(status,this.chatTarget.toId);
  }

  inputFocus() {
    this.addS = false;
    let chatArea = document.getElementsByClassName('scroll-content')[2];
    chatArea.scrollTop = chatArea.scrollHeight;
  }
  src1:any
  sendPicture() {
    this.chatService.getPicure(0).then((data) => {
      if(!data) return;
      let insideId =Date.parse(new Date().toString())+Math.random()*1000;
      this.src1 = data;
      this.list.push({
        toId:this.chatTarget.toId,
        fromId:this.userinfo._id,
        name:this.userinfo.name,
        fromPhoto:this.myurl + this.userinfo.photo,
        content:this.src1,
        unSend:true,
        type:'P',
        time:Date.parse(new Date().toString()),
        insideId:insideId
      })
      this.chatService.sendMessage(this.src1,this.chatTarget.toId,this.chatTarget.id,insideId,'P');
    });
  }
  clearM() {
    this.chatService.clearMes();
  }
}
