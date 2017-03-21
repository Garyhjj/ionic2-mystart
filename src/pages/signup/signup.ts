import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataService } from '../../services/data.service';
import { NineCodePage } from '../me/set/nine-code/nine-code';
import { ValidateService } from '../../services/validate.service';
import { Keyboard } from 'ionic-native';
import { TabsPage } from '../tabs/tabs';
@Component({
  templateUrl: 'signup.html'
})
export class SignupPage{

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataService: DataService,
    private validateService: ValidateService,
    private alertCtrl: AlertController,
    private storage :Storage
   ) {}

  toValiPassword :boolean
  errorMessage:string;
  accountName :string;
  ionViewDidLoad() {
  }
  ionViewWillEnter() {
    this.toValiPassword = localStorage.getItem('toValiPassword')? true :false;
    this.accountName = this.toValiPassword? JSON.parse(localStorage.getItem('user')).accountName : '';
  }
  ionViewWillLeave() {

  }

  logForm(accountM) {
    // Keyboard.close();
    this.dataService.checkLogin(accountM).then((res:{user:any,error:string,token:string}) => {
      if(res.user){
        this.storage.set('id_token',res.token);
        localStorage.setItem('user',JSON.stringify(res.user));
        // 清除验证密码的设定
        if(this.toValiPassword){
          localStorage.removeItem('validateId');
        }
        // 清除手势密码
        localStorage.removeItem('myNineCode');
        setTimeout(() => {
          if(localStorage.getItem('needPassNineCode') == 'false') {
            this.navCtrl.setRoot(TabsPage);
          }else {
            this.navCtrl.setRoot(NineCodePage);
          }
        },100);
      }else{
        this.errorMessage = this.toValiPassword? '密码错误' :res.error;
        let alert = this.alertCtrl.create({
          title: '登录失败!',
          subTitle: this.errorMessage,
          buttons: ['确认']
        });
        alert.present();
      }
    });
    return false;
  }

  //單獨輸入塊驗證
  check(event:any,_item:any,Equalto:any): Promise<any>{
      let item = event.target? event.target : event;
      let other:any = Equalto?Equalto:"";
      return this.validateService.check(item,other).then(function(prams) {
        _item.Error = prams.mes;
        _item.pass = !prams.mes;
        return Promise.resolve(_item);
      });
  }
}
