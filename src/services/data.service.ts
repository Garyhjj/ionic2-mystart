import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApplicationItem } from '../interfaces/applicationitem';

export class Work {
  id: number;
  name:string;
  content:string;
  period: number;
  unit:string;
  monthPlan:string;
  weekPlan:string;
}


@Injectable()
export class DataService {
    constructor(private http: Http) { }

    url: string = 'http://10.86.3.31:1234/emobile';
    getApplicationList(empno: string): Promise<ApplicationItem[]> {
        // 正式环境应该像这样写
        // return this.http.get(this.url).toPromise().then((res => {
        //     return <ApplicationItem[]>res.json().data;
        // }));

        // 测试阶段暂时hard code
        return Promise.resolve(this.items);
    };

    moveAppToMorePage(id: number): Promise<Object> {
        return this.http.post(this.url + '/update', { id: id, show: false }).toPromise().then((res) => {
            return <Object>res.json();
        });
    }

    moveToAppPage(id: number) {
        return this.http.post(this.url + '/update', { id: id, show: true }).toPromise().then((res) => {
            return <Object>res.json();
        });
    }

    getWorks():Promise<Work[]>{
      return Promise.resolve(this.works);
    }
    works:Work[] = [
      {id: 1,name:'2月保養', content:'每隔兩個月保養', period: 2, unit:'Month(月)', monthPlan:'Y', weekPlan:'N'},
      {id: 2,name:'AOI機械月保養', content:'每隔一個月保養', period: 1, unit:'Month(月)', monthPlan:'Y', weekPlan:'N'},
      {id: 3,name:'as required', content:'根據狀況需要進行保養', period: 2, unit:'Week(周)', monthPlan:'N', weekPlan:'N'},
      {id: 4,name:'A月保養', content:'設備維護', period: 1, unit:'Month(月)', monthPlan:'Y', weekPlan:'N'},
      {id: 5,name:'BOSE功能測試機械月保養', content:'BOSE功能測試機械月保養', period: 1, unit:'Month(月)', monthPlan:'Y', weekPlan:'N'},
      {id: 6,name:'CE周保養', content:'每週固定保養', period: 1, unit:'Week(周)', monthPlan:'N', weekPlan:'Y'},
      {id: 7,name:'CE月保養', content:'每月固定保養一次', period: 1, unit:'Month(月)', monthPlan:'Y', weekPlan:'Y'},
      {id: 8,name:'COCFE年保養', content:'每隔一年保養', period: 12, unit:'Month(月)', monthPlan:'Y', weekPlan:'N'},
      {id: 9,name:'EMDD周保養', content:'每周一次', period: 1, unit:'Week(周)', monthPlan:'N', weekPlan:'Y'},
      {id: 10,name:'EOC周保養', content:'每隔兩個月保養', period: 2, unit:'Month(月)', monthPlan:'Y', weekPlan:'N'},
      {id: 11,name:'FMD2年保養', content:'每隔兩年保養一次', period: 2, unit:'Year(年)', monthPlan:'Y', weekPlan:'N'},
      {id: 12,name:'FMD2月保養', content:'每隔兩月保養一次', period: 2, unit:'Month(月)', monthPlan:'Y', weekPlan:'N'},
      {id: 13,name:'FMD季保養', content:'4DZB季保養', period: 3, unit:'Month(月)', monthPlan:'Y', weekPlan:'N'},
      {id: 14,name:'FMD月保養', content:'4DZB月保養', period: 1, unit:'Month(月)', monthPlan:'Y', weekPlan:'N'}]




    // mock data
    items: ApplicationItem[] = [{
        id: 1,
        href: '#',
        src: '../../assets/icon/book.ico',
        name: '图书管理',
        group: '工作相关',
        show: true
    }, {
        id: 2,
        href: '#',
        src: '../../assets/icon/todo.ico',
        name: '待办事宜',
        group: '工作相关',
        show: true
    }, {
        id: 3,
        href: '#',
        src: '../../assets/icon/finish.ico',
        name: '已办事宜',
        group: '工作相关',
        show: true
    }, {
        id: 4,
        href: '#',
        src: '../../assets/icon/meeting.ico',
        name: '会议',
        group: '企业应用',
        show: true
    }, {
        id: 5,
        href: '#',
        src: '../../assets/icon/schedule.ico',
        name: '日程',
        group: '企业应用',
        show: true
    }, {
        id: 6,
        href: '#',
        src: '../../assets/icon/news.ico',
        name: '新闻',
        group: '企业应用',
        show: true
    }, {
        id: 7,
        href: '#',
        src: '../../assets/icon/document.ico',
        name: '文档',
        group: '即时沟通',
        show: true
    }, {
        id: 8,
        href: '#',
        src: '../../assets/icon/weibo.ico',
        name: '微博',
        group: '商务出行',
        show: true
    }, {
        id: 9,
        href: '#',
        src: '../../assets/icon/teamwork.ico',
        name: '协作',
        group: '商务出行',
        show: false
    }, {
        id: 10,
        href: '#',
        src: '../../assets/icon/location.ico',
        name: '移动签到',
        group: '即时沟通',
        show: false
    }];






}
