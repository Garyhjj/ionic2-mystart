import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl,FormGroup } from '@angular/forms';
import { ValidateService } from '../../../services/validate.service';
@Component({
  templateUrl: 'work.html'
})
export class WorkPage{

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private validateService: ValidateService
   ) {
     this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
   }


   tabBarElement:any;

  canEdit:boolean = false;
  work:any;
  todo:FormGroup;
  passNum:number;
  tempWork:{
    name: string,
    content: string,
    period: number,
    unit: number,
    monthPlan: string,
    weekPlan: string
  };
  ionViewDidLoad() {
    this.work = this.navParams.data.item;
    this.todo = this.initWork(this.work);
    this.save();
    console.log(111)
    this.tabBarElement.style.display = 'none';

  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  //初始化原始數據
  initWork(work):FormGroup{
    return this.formBuilder.group({
            name: new FormControl(work.name),
            content: new FormControl(work.content),
            period: new FormControl(work.period),
            unit: new FormControl(work.unit),
            monthPlan: new FormControl({value: work.monthPlan, disabled: false}),
            weekPlan: new FormControl({value: work.weekPlan, disabled: false})
        });
  }
  save():void{
    this.canEdit = false;
    this.tempWork = this.todo.value;
    console.log(this.tempWork)
  }
  callBack():void{
    this.canEdit = false;
    this.todo = this.initWork(this.tempWork);
  }
  tosubmit(form:any,_items:any[]) :void{
    this.passNum=0;
    let y = 0;
    for(let i=0;i<form.children.length-1;i++){
      if(i%2 === 0){
        this.check(form[i],_items[y],'').then((item)=> {
          this.passNum = item.Error?this.passNum-1:this.passNum+1;
          this.passNum = Math.max(this.passNum,0);
          //判定通過項目是否都通過
          if(this.passNum === _items.length){
            console.log("pass")
          }
        }),
        y++;
      }
    }
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
