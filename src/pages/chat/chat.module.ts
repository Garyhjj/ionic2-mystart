import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ng2-socket-io'
import { IonicModule } from 'ionic-angular';
import { MessagePage } from './message/message';
import { DialoguePage } from './dialogue/dialogue';
import { ChatTimePipe } from './pipe/chat-time.pipe';
import { ChatService } from './services/chatService';

const config: SocketIoConfig = { url: 'http://10.86.21.56:3701', options: {} };

@NgModule({
  imports:      [ CommonModule, IonicModule, SocketIoModule.forRoot(config) ],
  declarations: [
    ChatTimePipe,
    MessagePage,
    DialoguePage
  ],
  entryComponents:[
    MessagePage,
    DialoguePage
  ],
  providers:    [ChatService ]
})
export class ChatModule {}
