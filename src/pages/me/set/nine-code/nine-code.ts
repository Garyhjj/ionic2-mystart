import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../../../tabs/tabs';
/*
  Generated class for the BookLibrary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'nine-code.html'
})
export class NineCodePage {

  R: number = 26;
  canvasWidth: number = 400;
  canvasHeight: number = 320;
  OffsetX: number = 30;
  OffsetY: number = 30;
  circleArr = [];
  message:string = '请输入原来的密码';
  canChange:boolean;
  isVal:boolean = true;
  headHeight:number;

  myCode:number[] =[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // 判定是否是进行验证功能还是更改功能
    this.isVal = localStorage.getItem('isPassNineCode')=='false'? true: false;
  }


  ionViewWillEnter() {
    this.myCode = [];
    //设置为先验证旧密码
    this.canChange = false;

    var canvas:any = document.getElementById("lockCanvas");
    let headCode:any = document.getElementById('headCode');
    //获取canvas顶部元素的高度，对后面的触摸判断作调整
    this.headHeight = headCode.offsetHeight;

    this.canvasWidth = document.body.offsetWidth;//网页可见区域宽
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    var cxt = canvas.getContext("2d");
    /**
     * 每行3个圆
     * OffsetX为canvas x方向内边距
     * */
    var X = (this.canvasWidth - 2 * this.OffsetX - this.R * 2 * 3) / 2;
    var Y = (this.canvasHeight - 2 * this.OffsetY - this.R * 2 * 3) / 2;

    this.createCirclePoint(X, Y);

    this.bindEvent(canvas, cxt);
    //CW=2*offsetX+R*2*3+2*X
    this.Draw(cxt, this.circleArr, [], null);
  }
  ionViewWillLeave() {
  }

  createCirclePoint(diffX, diffY) {
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        // 计算圆心坐标
        var Point = {
          X: (this.OffsetX + col * diffX + (col * 2 + 1) * this.R),
          Y: (this.OffsetY + row * diffY + (row * 2 + 1) * this.R)
        };
        this.circleArr.push(Point);
      }
    }
  }

  Draw(cxt, circleArr, pwdArr, touchPoint) {
    if (pwdArr.length > 0) {
      cxt.beginPath();
      for (var i = 0; i < pwdArr.length; i++) {
        var pointIndex = pwdArr[i];
        cxt.lineTo(circleArr[pointIndex].X, circleArr[pointIndex].Y);
      }
      cxt.lineWidth = 10;
      cxt.strokeStyle = "#627eed";
      cxt.stroke();
      cxt.closePath();
      if (touchPoint != null) {
        var lastPointIndex = pwdArr[pwdArr.length - 1];
        var lastPoint = circleArr[lastPointIndex];
        cxt.beginPath();
        cxt.moveTo(lastPoint.X, lastPoint.Y);
        cxt.lineTo(touchPoint.X, touchPoint.Y);
        cxt.stroke();
        cxt.closePath();
      }
    }
    for (var i = 0; i < circleArr.length; i++) {
      var Point = circleArr[i];
      cxt.fillStyle = "#627eed";
      cxt.beginPath();
      cxt.arc(Point.X, Point.Y, this.R, 0, Math.PI * 2, true);
      cxt.closePath();
      cxt.fill();
      cxt.fillStyle = "#ffffff";
      cxt.beginPath();
      cxt.arc(Point.X, Point.Y, this.R - 3, 0, Math.PI * 2, true);
      cxt.closePath();
      cxt.fill();
      if (pwdArr.indexOf(i) >= 0) {
        cxt.fillStyle = "#627eed";
        cxt.beginPath();
        cxt.arc(Point.X, Point.Y, this.R - 16, 0, Math.PI * 2, true);
        cxt.closePath();
        cxt.fill();
      }

    }
  }

  getSelectPwd(touches, pwdArr) {
    for (var i = 0; i < this.circleArr.length; i++) {
      var currentPoint = this.circleArr[i];
      var xdiff = Math.abs(currentPoint.X - touches.pageX);
      var ydiff = Math.abs(currentPoint.Y+this.headHeight - touches.pageY);
      var dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
      if (dir > this.R*1.1 || pwdArr.indexOf(i) >= 0){
        continue;
      }
      pwdArr.push(i);
      break;
    }
  }

  bindEvent(canvas, cxt) {
    var pwdArr = [];
    canvas.addEventListener("touchstart", (e) => {
      this.getSelectPwd(e.touches[0], pwdArr);
      this.message ='';
    }, false);
    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      var touches = e.touches[0];
      this.getSelectPwd(touches, pwdArr);
      cxt.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.Draw(cxt, this.circleArr, pwdArr, { X: touches.pageX, Y: touches.pageY-this.headHeight });
    }, false);
    canvas.addEventListener("touchend", (e) => {
      cxt.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.Draw(cxt, this.circleArr, [], null);

      //用户验证判定
      if(this.isVal){
        if(localStorage.getItem('myNineCode') == pwdArr.join('')){
          this.message = '密码正确'
          localStorage.setItem('isPassNineCode','true');
          setTimeout(() => {
            this.navCtrl.setRoot(TabsPage)
          },300)
        }else{
          this.message = '密码错误！！！'
        }
        // 更改手势密码判定
      }else{
        // 判定是否已经验证原始密码
        if(this.canChange){
          if(this.myCode.length>0){
            if(this.myCode.join('') == pwdArr.join('')){
              this.message ='已更新密码';
              localStorage.setItem('myNineCode', this.myCode.join(''));
              setTimeout(() =>{
                this.navCtrl.pop();
              },300)
            }else{
              this.message ='两次密码不一致,请重新设置';
              this.myCode =[];
            }
          }else{
            this.myCode = pwdArr;
            this.message = '请再次输入密码';
          }
        }else{
          if(localStorage.getItem('myNineCode') == pwdArr.join('')){
            this.canChange = true;
            this.message = '请设置新的密码'
          }else{
            this.canChange = false;
            this.message = '请重新输入,与原密码不一致'
          }
        }
      }

      pwdArr = [];
    }, false);
  }
}
