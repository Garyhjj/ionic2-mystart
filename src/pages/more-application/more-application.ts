import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { ApplicationItem } from '../../interfaces/applicationitem';
import { DataService } from '../../services/data.service';
import { MyRouter } from '../../router/router';

@Component({
  selector: 'page-more-application',
  templateUrl: 'more-application.html'
})
export class MoreApplicationPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public dataService: DataService) { }
  items: ApplicationItem[];
  showBtn: boolean = false;
  router: MyRouter = new MyRouter();

  moveItemToAppPage(id: number): void {
    // console.log(id);
    this.items = this.items.filter((value) => {
      return value.id !== id;
    });
    //todo 这里应该更新item的show为true
    this.dataService.moveToAppPage(id).then((res) => {
      // console.log(res);
    });
  }

  goToDetailPage(id: number) {
    // this.router.go(this.navCtrl, this.navParams, id);
    this.router.go(this.navCtrl, this.navParams, id);
  }

  ngOnInit() {
    this.viewCtrl.setBackButtonText('返回');
    this.dataService.getApplicationList('FE717').then((datas) => {
      this.items = datas.filter((value, index, newArray) => {
        return !value.show;
      });

    });
    // console.log('init');
  }

  showEditBtn(): void {
    this.showBtn = true;
  }

  hideEditBtn(): void {
    this.showBtn = false;
  }


}
