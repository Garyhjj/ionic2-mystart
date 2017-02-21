import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services/data.service';
import { WorkPage } from '../work11/work';
/*
  Generated class for the BookLibrary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'works.html'
})
export class WorksPage implements OnInit{

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService:DataService) {}

  ngOnInit(){
    this.dataService.getWorks().then((works) => this.works = works);
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
  tabBarElement:any;
  works:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad Works1');
    this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  itemSelected(item:any){
    this.navCtrl.push(WorkPage, {
            item: item
        });
  }


}
