import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DialoguePage } from './dialogue/dialogue';
import { User } from '../../interfaces/user';
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

  messageListItem1= [{
      "avatarSrc": "http://10.86.21.157:3700/user/photo/hansan.wu.jpg",
      "userNickName": "吴汉三",
      "lastmsg": "小三哥，我穷",
      "timedesc": new Date(1480338091398).toTimeString(),
      "type": "dialogue",
      "unread": false,
      "unreadCount":2,
      "id":"58c79aa4e82b541968c9a29f"
  }];

  messageListItem2= [{
      "avatarSrc": "http://10.86.21.157:3700/user/photo/yuanwen.yang.jpg",
      "userNickName": "杨元文",
      "lastmsg": "小文哥，我穷",
      "timedesc": new Date(1480338091390).toTimeString(),
      "type": "dialogue",
      "unread": false,
      "unreadCount":5,
      "id":"58c756fbd87f6f0b082ff472"
  }];
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  user:User;

  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  goToMessageDetailPage(item) {
    if (item.type === 'dialogue') {
      this.navCtrl.push(DialoguePage, item);
    } else {
      // this.navCtrl.push('notice');
    }
  }

}
