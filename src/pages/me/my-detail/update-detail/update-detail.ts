import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DataService } from '../../../../services/data.service';
import { ValidateService } from '../../../../services/validate.service';
import { User } from "../../../../interfaces/user";
@Component({
  templateUrl: 'update-detail.html'
})
export class UpdateDetailPage {

  type: string;
  val: string;
  user: User;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataService: DataService,
    private validateService: ValidateService,
    private alertCtrl: AlertController,
    private storage: Storage
  ) { }

  errorMessage: string;
  ionViewDidLoad() {

  }
  ionViewWillEnter() {
    this.type = this.navParams.data.type;
    this.val = this.navParams.data.value;
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  ionViewWillLeave() {
  }

  logForm(accountM) {
    this.dataService.updateDetail({ data: accountM }).then((res: { isPass: boolean, error: string }) => {
      if (res.isPass) {
        for (let prop in accountM) {
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
          title: this.errorMessage,
          inputs: [
            {
              name: 'password',
              placeholder: 'Password',
              type: 'password'
            }
          ],
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              handler: data => {

              }
            },
            {
              text: '登录',
              handler: data => {
                console.log(data)
                this.dataService.checkLogin({ accountName: this.user.accountName, password: data.password }).then((res: { user: User, error: string, token: string }) => {
                  if (res.user) {
                    this.storage.set('id_token', res.token);
                    let alert = this.alertCtrl.create({
                      title: '成功',
                      subTitle: '已重新登录',
                      buttons: ['确认']
                    });
                    alert.present();
                  }else {
                    let alert = this.alertCtrl.create({
                      title: '失败',
                      subTitle: '密码错误',
                      buttons: ['确认']
                    });
                    alert.present();
                  }
                })
              }
            }
          ]
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
