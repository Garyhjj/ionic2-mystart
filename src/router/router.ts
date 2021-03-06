import { NavController, NavParams } from 'ionic-angular';
import { BookLibraryPage } from '../pages/book-library/book-library';
import { WorksPage } from '../pages/work/works/works';
import { MainPage } from '../pages/attendance/main/main';
export class MyRouter {
  constructor() { }

  public go(navCtrl: NavController, navParams: NavParams, id: number): void {
    switch (id) {

      case 1:
        navCtrl.push(BookLibraryPage);
        break;
      case 2:
        navCtrl.push(WorksPage);
        break;
      case 3:
        navCtrl.push(MainPage);
        break;
      default:
        break;
    }

  }

}
