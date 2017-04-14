import { Component, ViewChild } from '@angular/core';
import { Tabs } from "ionic-angular";
import { MessagePage } from '../chat/message/message';
import { ApplicationPage } from '../application/application';
import { NamesPage } from '../names/names';
import { MePage } from '../me/me';
import { ChatService }  from '../chat/services/chatService';
import { Chat }  from '../chat/interfaces/chat';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MessagePage;
  tab2Root: any = ApplicationPage;
  tab3Root: any = NamesPage;
  tab4Root: any = MePage;
  chat: Chat[];
  constructor(private chatService: ChatService) {

  }

  ionViewDidLoad() {
    // this.chatService.clearMes();
    this.chatService.login();
    this.chatService.getOutLineMessages().subscribe((messages) => {
      this.chatService.updateOutlineMes(messages);
    })
    // 开始监控聊天消息
    this.chatService.getNetMessage().subscribe((obj) => {
      this.chatService.updateLoalMes(obj);
    });
    // // 接收中途离线的消息
    this.chatService.ifOutLineMessages().subscribe((status) => {
      this.chatService.login();
    })
  }
}
