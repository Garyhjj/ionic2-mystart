import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { MainPage } from './main/main';
import { NewLeavePage } from './new-leave/new-leave';
import { HoildayDetailPage } from './hoildayDetail/hoildayDetail';


@NgModule({
  imports:      [ CommonModule, IonicModule ],
  declarations: [
    MainPage,
    NewLeavePage,
    HoildayDetailPage
  ],
  entryComponents:[
    MainPage,
    NewLeavePage,
    HoildayDetailPage
  ],
  providers:    [ ]
})
export class AttendanceModule {}
