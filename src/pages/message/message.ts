import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  fdg:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }
  mes:string[]=[];
  send2(mes){
    this.mes.push(`<h4 class="pull-right">${mes.value}</h4>`);
    this.fdg = this.mes.join('');
    setTimeout(() =>{
      let new1 :any = document.querySelectorAll('.pull-right');
      console.log(new1);



    },0);



  }
  send3(mes){
    this.fdg += `<h4 class="pull-left">${mes.value}</h4>`;
  }

  showMes(event:any){
    console.log(123)
  }
}
