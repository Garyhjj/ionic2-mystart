import { Component, ViewChild } from '@angular/core';
import {Tabs} from "ionic-angular";
import { MessagePage } from '../message/message';
import { ApplicationPage } from '../application/application';
import { NamesPage } from '../names/names';
import { MePage } from '../me/me';
import { ChatService }  from '../../services/ChatService';
import { Chat }  from '../../interfaces/chat';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs:Tabs;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MessagePage;
  tab2Root: any = ApplicationPage;
  tab3Root: any = NamesPage;
  tab4Root: any = MePage;
  chat:Chat[];
  constructor(private chatService: ChatService) {
    console.log(new Date().getTime())
  }

  ionViewDidLoad() {
    this.chatService.getMes().then((mes) => {
    },(err) =>{
      if(JSON.parse(localStorage.getItem('user'))._id === '58c756fbd87f6f0b082ff472'){
        this.chat = [{
          id:'58c756fbd87f6f0b082ff472' + '58c79aa4e82b541968c9a29f',
          fromId : '58c756fbd87f6f0b082ff472',
          toId:'58c79aa4e82b541968c9a29f',
          toName:'吴汉三',
          fromName:'杨元文',
          toPhoto:'http://10.86.21.157:3700/user/photo/hansan.wu.jpg',
          mes:[{content:'小文哥，我穷',
            time:'1480338091398',
            fromId:'58c79aa4e82b541968c9a29f',
            toId:'58c756fbd87f6f0b082ff472',
            fromPhoto:'http://10.86.21.157:3700/user/photo/hansan.wu.jpg'
            }],
          unreadCount:1,
          type:"dialogue"
        }]

      }else{
        this.chat = [{
          id: '58c756fbd87f6f0b082ff472' + '58c79aa4e82b541968c9a29f',
          fromId : '58c79aa4e82b541968c9a29f',
          toId:'58c756fbd87f6f0b082ff472',
          toName:'杨元文',
          fromName:'吴汉三',
          toPhoto:'http://10.86.21.157:3700/user/photo/yuanwen.yang.jpg',
          mes:[{content:'小三哥，我穷',
          time:'1480338091298',
          fromId:'58c756fbd87f6f0b082ff472',
          toId:'58c79aa4e82b541968c9a29f',
          fromPhoto:'http://10.86.21.157:3700/user/photo/yuanwen.yang.jpg'
        }],
          unreadCount:1,
          type:"dialogue"
        }]
      }
      this.chatService.saveMes(this.chat);
    })
    // 开始监控聊天消息
    this.chatService.getNetMessage().subscribe((obj) => {
      this.chatService.updateLoalMes(obj);
    });
  }
}
