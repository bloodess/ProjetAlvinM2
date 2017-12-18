import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import { ContactPage } from '../contact/contact';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  filmMostKnow;
  filmMostUnknow;
  contactPage:any = ContactPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    console.log(this.navParams.get('movieToSee'));
  }

  ionViewDidLoad() {
    this.filmMostKnow = {};
    this.filmMostUnknow = {};
    this.getMovies();
  }

  getMovies() {
    //TODO add class data
    this.restProvider.getMovies(this.navParams.get('movieToSee')).then((data: any) => {
      this.filmMostKnow = data[0];
      this.filmMostUnknow = data[1];
      console.log(data);
    });
  }

  toContactPage(m) {
    
    this.navCtrl.push(ContactPage, {
      movie: m
    });
  }

}
