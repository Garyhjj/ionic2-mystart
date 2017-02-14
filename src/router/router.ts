import { NavController, NavParams } from 'ionic-angular';
import { BookLibraryPage } from '../pages/book-library/book-library';

export class MyRouter {
    constructor() { }

    public go(navCtrl: NavController, navParams: NavParams, id: number): void {
        switch (id) {

            case 1:
                navCtrl.push(BookLibraryPage);
                break;
            default:
                break;
        }

    }

}
