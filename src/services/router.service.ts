import { Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { BookLibraryPage } from '../pages/book-library/book-library';

@Injectable()
export class RouterService {

    constructor() { }

    go(navCtrl: NavController, navParams: NavParams, id: number): void {
        switch (id) {
            case 1:
                navCtrl.push(BookLibraryPage);
                break;
            default:
                break;

            // case 1:
            //     navCtrl.push(MoreApplicationPage);
            //     break;
            // case 2:
            //     navCtrl.push(MoreApplicationPage);
            //     break;
            // case 3:
            //     navCtrl.push(MoreApplicationPage);
            //     break;
            // case 4:
            //     navCtrl.push(MoreApplicationPage);
            //     break;
            // case 5:
            //     navCtrl.push(MoreApplicationPage);
            //     break;
            // case 6:
            //     navCtrl.push(MoreApplicationPage);
            //     break;
            // case 7:
            //     navCtrl.push(MoreApplicationPage);
            //     break;
            // case 8:
            //     navCtrl.push(MoreApplicationPage);
            //     break;
            // case 9:
            //     navCtrl.push(MoreApplicationPage);
            //     break;
            // case 10:
            //     navCtrl.push(MoreApplicationPage);
            //     break;
            // default:
            //     break;
        }

    }
}