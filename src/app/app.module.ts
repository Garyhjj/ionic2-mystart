import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { FormsModule }   from '@angular/forms';
import { MyApp } from './app.component';
import { MessagePage } from '../pages/message/message';
import { ApplicationPage } from '../pages/application/application';
import { NamesPage } from '../pages/names/names';
import { MePage } from '../pages/me/me';
import { TabsPage } from '../pages/tabs/tabs';
import { MoreApplicationPage } from '../pages/more-application/more-application';
import { BookLibraryPage } from '../pages/book-library/book-library';

import { WorksPage } from '../pages/work/works/works';
import { WorkPage } from '../pages/work/work11/work';

import { SetPage } from '../pages/me/set/set';
import { MyDetailPage } from '../pages/me/my-detail/my-detail';

import { EGridComponent } from '../components/e-grid/e-grid';
import { DataService } from '../services/data.service';
import { ValidateService } from '../services/validate.service';

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
    MyDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),FormsModule
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
    MyDetailPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, DataService, ValidateService]
})
export class AppModule { }
