import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DataService } from '../../../../services/data.service';
import { ValidateService } from '../../../../services/validate.service';

@Component({
  templateUrl: 'update-detail.html'
})
export class UpdateDetailPage {

  type: string;
  val: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataService: DataService,
    private validateService: ValidateService,
    private alertCtrl: AlertController
  ) { }

  errorMessage: string;
  ionViewDidLoad() {

  }
  ionViewWillEnter() {
    this.type = this.navParams.data.type;
    this.val = this.navParams.data.value;
  }
  ionViewWillLeave() {
  }

  logForm(accountM) {
    this.dataService.updateDetail({accountName:'yuanwen.yang',data:accountM}).then((res: { isPass: boolean, error: string }) => {
      if (res.isPass) {
        for(let prop in accountM) {
          let user = JSON.parse(localStorage.getItem('user'));
          user[prop] = accountM[prop];
          localStorage.setItem('user', JSON.stringify(user));
        }
        setTimeout(() => {
          this.navCtrl.pop();
        }, 300)
      } else {
        this.errorMessage = res.error;
        let alert = this.alertCtrl.create({
          title: '更改失败!',
          subTitle: this.errorMessage,
          buttons: ['确认']
        });
        alert.present();
      }
    });
    return false;
  }

  //單獨輸入塊驗證
  check(event: any, _item: any, Equalto: any): Promise<any> {
    let item = event.target ? event.target : event;
    let other: any = Equalto ? Equalto : "";
    return this.validateService.check(item, other).then(function(prams) {
      _item.Error = prams.mes;
      _item.pass = !prams.mes;
      return Promise.resolve(_item);
    });
  }
}
