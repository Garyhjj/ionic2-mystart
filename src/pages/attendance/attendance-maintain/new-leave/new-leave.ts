import { Component, AfterContentChecked } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { ValidateService }   from '../../../../services/validate.service';

@Component({
  selector: 'page-new-leave',
  templateUrl: 'new-leave.html'
})
export class NewLeavePage implements  AfterContentChecked{

  private searchTerms = new Subject<string>();
  leaveMes:{
    type :string,
    startTime: string,
    endTime: string,
    boss:string,
    reason:string
  }

  todo:FormGroup;

  isSelectBoss:boolean = false;   // todo 判断是否正确选择代理人
  tempBoss :string =''; // 临时作保存的中间代理人
  colleague:any;// 搜索得到的候选代理人
  timeError:string ='';
  dayLeave:string = '0';
  hourLeave:string = '0';
  tempStartTime:string='';
  tempEndTime:string='';
  startTime;
  endTime;
  holidayType=[
    {type:'A',name:'年休假'},
    {type:'B',name:'產假 - 產假【98天】'},
    {type:'B1',name:'難產 - 難產【15天】'},
    {type:'B3',name:'多胞胎 - 多胞胎【15天】'},
    {type:'B4',name:'生育獎勵假 - 生育獎勵假【80天】'},
    {type:'C',name:'工傷假 - 因工受傷【180天】'},
    {type:'F',name:'丧假 - 員工的直系親屬(本人之父母、配偶、子女)去世【8天】'},
    {type:'H',name:'流產假 - 流產【42天】'},
    {type:'H1',name:'陪產假 - 配偶分娩【15天】'},
    {type:'H2',name:'產檢假 - 產檢假【1天】'},
    {type:'H3',name:'上環/結扎假 - 上環/結扎假【21天】'},
    {type:'I',name:'授乳假 - 授乳假(一胞胎)【.13天】'},
    {type:'L',name:'曠職'},
    {type:'M',name:'停線'},
    {type:'O',name:'公假 - 公假【7天】'},
    {type:'P',name:'事假 - 一年累積不得超過30天（含)【30天】'},
    {type:'R',name:'補假'},
    {type:'R1',name:'補休'},
    {type:'S',name:'病假 - 病假【90天】'},
    {type:'T',name:'調休'},
    {type:'W',name:'婚假 - 婚假【3天】'},
    {type:'Y',name:'忘刷卡'},
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private validateService: ValidateService) { }

  ngAfterContentChecked() {
    // viewChild is updated after the view has been checked
    if(this.todo && this.todo.value.startTime && this.todo.value.endTime){
      // 判断数据是否有改变,减少脏数据检查
      if(this.todo.value.startTime == this.tempStartTime && this.todo.value.endTime == this.tempEndTime) return;
      this.tempStartTime =this.todo.value.startTime;
      this.tempEndTime = this.todo.value.endTime
      let interval = Date.parse(this.tempEndTime) - Date.parse(this.tempStartTime)
      if(interval<= 0){
        this.timeError = '结束时间必须迟于开始时间';
      }else {
        this.timeError ='';
        this.dayLeave = (interval/(1000*60*60*24)).toFixed(1);
        this.hourLeave = (interval/(1000*60*60)).toFixed(1);
      }
    }
  }

  ionViewDidLoad() {
    this.leaveMes={
      type :'P',
      startTime: '',
      endTime: '',
      boss:'',
      reason:'123'
    }
    this.todo = this.initWork(this.leaveMes);
    this.colleague = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => {
        if(term){
        console.log(123)
        return Observable.of<any>([{name:'xiaomi'},{name:'xiaodong'}])
      }else{
        console.log(456);
        return Observable.of<any>([])
      }})
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<number>(678);
      });
  }

  //初始化原始數據
  initWork(work):FormGroup{
    return this.formBuilder.group({
            type: [work.type, Validators.required],
            startTime: [work.startTime, Validators.required],
            endTime: [work.endTime, Validators.required],
            boss: [work.boss, Validators.required],
            reason : [work.reason, Validators.required],
        });
  }
  // keyup觸發的方法
  search(item){
    // todo 判断是否正确选择代理人
    if(this.tempBoss){
      this.isSelectBoss = item.value != this.tempBoss? false: true;
    }
    this.searchTerms.next(item.value);
  }
  // 选取上级
  getBoss(name: string){

    this.isSelectBoss = true;
    this.tempBoss = name;
    this.searchTerms.next('')
    this.todo.controls['boss'].setValue(name);
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
  leaveForm(end:any){
    console.log(this.todo.value);
    return false;
  }
}
