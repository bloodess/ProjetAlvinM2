import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController, Slides, LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import {
  StackConfig,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';

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
