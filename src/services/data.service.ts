import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApplicationItem } from '../interfaces/applicationitem';

@Injectable()
export class DataService {
    constructor(private http: Http) { }

    url: string = 'http://10.86.21.168:1234/emobile';
    getApplicationList(empno: string): Promise<ApplicationItem[]> {
        // 正式环境应该像这样写
        return this.http.get(this.url).toPromise().then((res => {
            return <ApplicationItem[]>res.json().data;
        }));

        // 测试阶段暂时hard code
        // return Promise.resolve(this.items);
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

    // mock data
    // items: ApplicationItem[] = [{
    //     id: 1,
    //     href: '#',
    //     src: '../../assets/icon/book.ico',
    //     name: '图书管理',
    //     group: '工作相关',
    //     show: true
    // }, {
    //     id: 2,
    //     href: '#',
    //     src: '../../assets/icon/todo.ico',
    //     name: '待办事宜',
    //     group: '工作相关',
    //     show: true
    // }, {
    //     id: 3,
    //     href: '#',
    //     src: '../../assets/icon/finish.ico',
    //     name: '已办事宜',
    //     group: '工作相关',
    //     show: true
    // }, {
    //     id: 4,
    //     href: '#',
    //     src: '../../assets/icon/meeting.ico',
    //     name: '会议',
    //     group: '企业应用',
    //     show: true
    // }, {
    //     id: 5,
    //     href: '#',
    //     src: '../../assets/icon/schedule.ico',
    //     name: '日程',
    //     group: '企业应用',
    //     show: true
    // }, {
    //     id: 6,
    //     href: '#',
    //     src: '../../assets/icon/news.ico',
    //     name: '新闻',
    //     group: '企业应用',
    //     show: true
    // }, {
    //     id: 7,
    //     href: '#',
    //     src: '../../assets/icon/document.ico',
    //     name: '文档',
    //     group: '即时沟通',
    //     show: true
    // }, {
    //     id: 8,
    //     href: '#',
    //     src: '../../assets/icon/weibo.ico',
    //     name: '微博',
    //     group: '商务出行',
    //     show: true
    // }, {
    //     id: 9,
    //     href: '#',
    //     src: '../../assets/icon/teamwork.ico',
    //     name: '协作',
    //     group: '商务出行',
    //     show: false
    // }, {
    //     id: 10,
    //     href: '#',
    //     src: '../../assets/icon/location.ico',
    //     name: '移动签到',
    //     group: '即时沟通',
    //     show: false
    // }];






}