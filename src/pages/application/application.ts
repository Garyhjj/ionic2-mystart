import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ApplicationItem } from '../../interfaces/applicationitem';
import { DataService } from '../../services/data.service';
import { MoreApplicationPage } from '../more-application/more-application';
import { MyRouter } from '../../router/router';

@Component({
  selector: 'page-application',
  templateUrl: 'application.html'
})
export class ApplicationPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataService) { }

  items: ApplicationItem[]; // 不分类的所有数据
  itemsByGroup: ApplicationItem[][] = []; //按group分组
  showBtn: boolean = false; // 控制是否显示右上角的减号
  router: MyRouter = new MyRouter();

  ngOnInit() {
    this.refreshData();
  }

  refreshData(): void {
    this.dataService.getApplicationList('FE717').then((datas) => {
      this.items = datas.filter((value, index, newArray) => {
        return value.show;
      });
      this.itemsByGroup = this.selectItems(this.items);
    });
  }

  ionViewWillEnter() {
    this.refreshData();
  }

  showEditBtn(): void {
    this.showBtn = true;
  }

  hideEditBtn(): void {
    this.showBtn = false;
  }

  goToDetailPage(id: number) {
    // this.navCtrl.push(MoreApplicationPage);
    // this.router.go(this.navCtrl, this.navParams, id);
    this.router.go(this.navCtrl, this.navParams, id);

  }

  goToMorePage(): void {
    this.navCtrl.push(MoreApplicationPage);
  }

  // 作用：用于把一维数组的数据按group分成二维数组存储
  selectItems(data: ApplicationItem[]): ApplicationItem[][] {
    let temp: ApplicationItem[][] = [];
    let groupTypes: string[] = [];
    for (let i = 0; i < data.length; i++) {
      if ((groupTypes.indexOf(data[i].group) === -1)) {
        groupTypes.push(data[i].group);
      }
    }

    // 数组初始化
    for (let i = 0; i < groupTypes.length; i++) {
      temp[i] = [];
    }

    for (let i = 0; i < groupTypes.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].group === groupTypes[i]) {
          temp[i].push(data[j]);
        }
      }
    }

    return temp;
  }

  removeItemById(id: number): void {
    for (let i = 0; i < this.itemsByGroup.length; i++) {

      // 判断这个group是否只有一个值，当只有一个值且id等于要删除的元素的id时，把整个group删除
      if (this.itemsByGroup[i].length === 1 && this.itemsByGroup[i][0].id === id) {
        this.itemsByGroup.splice(i, 1);
        // todo 这里应该有句http请求，把id传递出去，后端把这个id的item.show更新为false
        this.dataService.moveAppToMorePage(id).then((res) => {
          // console.log(res);
        });
      }
      // else代表group的个数大于等于2个，只需要把要删除的元素清除就可以
      else {
        for (let j = 0; j < this.itemsByGroup[i].length; j++) {
          if (this.itemsByGroup[i][j].id === id) {
            this.itemsByGroup[i].splice(j, 1);
            // todo 这里应该有句http请求，把id传递出去，后端把这个id的item.show更新为false
            this.dataService.moveAppToMorePage(id).then((res) => {
              // console.log(res);
            });
          }
        }
      }
    }
  }

  moveItemToMoreGroup(id: number) {
    // console.log(id);
    this.removeItemById(id);
  }

}
