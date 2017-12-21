import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import { CardsPage } from '../cards/cards';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor( public navCtrl: NavController, public loadingCtrl: LoadingController) {
       
  }

  toCardsPage() {
    this.navCtrl.push(CardsPage)
  }
}
