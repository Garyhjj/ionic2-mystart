import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import { MyApp } from './app.component';
import { MessagePage } from '../pages/message/message';
import { ApplicationPage } from '../pages/application/application';
import { NamesPage } from '../pages/names/names';
import { MePage } from '../pages/me/me';
import { TabsPage } from '../pages/tabs/tabs';
import { MoreApplicationPage } from '../pages/more-application/more-application';
import { BookLibraryPage } from '../pages/book-library/book-library';

import { EGridComponent } from '../components/e-grid/e-grid';
import { DataService } from '../services/data.service';

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
    BookLibraryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    BookLibraryPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, DataService]
})
export class AppModule { }
