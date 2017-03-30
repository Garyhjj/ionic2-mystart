import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { SocketIoModule, SocketIoConfig } from 'ng2-socket-io'
import { ChatService } from '../services/ChatService';

import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import { FormsModule }   from '@angular/forms';
import { MyApp } from './app.component';
import { MessagePage } from '../pages/message/message';
import { DialoguePage } from '../pages/message/dialogue/dialogue';
import { ApplicationPage } from '../pages/application/application';
import { NamesPage } from '../pages/names/names';
import { MePage } from '../pages/me/me';
import { TabsPage } from '../pages/tabs/tabs';
import { MoreApplicationPage } from '../pages/more-application/more-application';
import { BookLibraryPage } from '../pages/book-library/book-library';
import '../assets/js/rxjs-extension';

import { WorksPage } from '../pages/work/works/works';
import { WorkPage } from '../pages/work/work11/work';

import { ChatTimePipe } from '../pipe/chat-time.pipe';

import { SetPage } from '../pages/me/set/set';
import { NineCodePage } from '../pages/me/set/nine-code/nine-code';
import { MyDetailPage } from '../pages/me/my-detail/my-detail';
import { UpdateDetailPage } from '../pages/me/my-detail/update-detail/update-detail';
import { MyQrPage }  from '../pages/me/my-detail/my-qr/my-qr';
import { EGridComponent } from '../components/e-grid/e-grid';
import { DataService } from '../services/data.service';
import { ValidateService } from '../services/validate.service';

import { SignupPage } from '../pages/signup/signup';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';

import { AttendancePage } from '../pages/attendance/attendance';
import { AttendanceMaintainPage } from '../pages/attendance/attendance-maintain/attendance-maintain';
import { NewLeavePage } from "../pages/attendance/attendance-maintain/new-leave/new-leave";

let storage = new Storage();
const config: SocketIoConfig = { url: 'http://10.86.21.170:3701', options: {} };

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    noTokenScheme: true, // 如果是false，token前面会自动增加Bearer
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MessagePage,
    ApplicationPage,
    NamesPage,
    MePage,
    EGridComponent,
    MoreApplicationPage,
    BookLibraryPage,
    WorksPage,
    WorkPage,
    SetPage,
    MyDetailPage,
    NineCodePage,
    SignupPage,
    UpdateDetailPage,
    MyQrPage,
    AttendancePage,
    AttendanceMaintainPage,
    NewLeavePage,
    DialoguePage,
    ChatTimePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      backButtonText: '',
    }), FormsModule,SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MessagePage,
    ApplicationPage,
    NamesPage,
    MePage,
    MoreApplicationPage,
    BookLibraryPage,
    WorksPage,
    WorkPage,
    SetPage,
    MyDetailPage,
    NineCodePage,
    SignupPage,
    UpdateDetailPage,
    MyQrPage,
    AttendancePage,
    AttendanceMaintainPage,
    NewLeavePage,
    DialoguePage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, DataService, Storage, ValidateService, ChatService,
    {
        provide: AuthHttp,
        useFactory: getAuthHttp,
        deps: [Http]
      }
    ]
})
export class AppModule { }
