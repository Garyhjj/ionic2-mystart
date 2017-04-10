import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DialoguePage } from '../dialogue/dialogue';
import { User } from '../../../interfaces/user';
import { ChatService } from '../services/chatService';
import { Chat } from '../interfaces/chat';
/*
  Generated class for the Message page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  messageListItem:Chat[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private chatService: ChatService, private ref: ChangeDetectorRef) {

  }

  user:User;
  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('user'));
    // 观察是否有新消息
    this.chatService.updateTerms.subscribe((item) => {
      this.chatService.getMes().then((mes) => {
        this.messageListItem = mes;
        this.ref.detectChanges();
      })
    })
  }
  ionViewWillEnter() {
    this.chatService.getMes().then((mes) => {
      this.messageListItem = mes;
    })
  }
  ionViewWillLeave() {
  }
  goToMessageDetailPage(item:Chat,index:number) {
    if (item.type === 'dialogue') {
      this.navCtrl.push(DialoguePage, {
        mes:item,
        _index:index
      });
    } else {
      // this.navCtrl.push('notice');
    }
  }

}
