import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import { FormsModule }   from '@angular/forms';
import { MyApp } from './app.component';

import { ApplicationPage } from '../pages/application/application';
import { NamesPage } from '../pages/names/names';
import { MePage } from '../pages/me/me';
import { TabsPage } from '../pages/tabs/tabs';
import { MoreApplicationPage } from '../pages/more-application/more-application';
import { BookLibraryPage } from '../pages/book-library/book-library';
import '../assets/js/rxjs-extension';

import { WorksPage } from '../pages/work/works/works';
import { WorkPage } from '../pages/work/work11/work';


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

import { ChatModule } from '../pages/chat/chat.module';
import { AttendanceModule } from '../pages/attendance/attendance.module'

let storage = new Storage();

export function getAuthHttp(http:any) {
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
    MyQrPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      backButtonText: '',
    }), FormsModule, IonicStorageModule.forRoot(), ChatModule, AttendanceModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
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
    MyQrPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, DataService, ValidateService,
    {
        provide: AuthHttp,
        useFactory: getAuthHttp,
        deps: [Http]
      }
    ]
})
export class AppModule { }
