import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  film;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.film = this.navParams.get('movie');
  }

  toHomePage() {
    this.navCtrl.popToRoot();
  }

  toContactForm() {
    window.open("https://docs.google.com/forms/d/1ibU4d43jrp1wbyM6VOD05oV9dL_dKunTJgQ5iMDkDZk/viewform?edit_requested=true", "_blank");
  }

}
