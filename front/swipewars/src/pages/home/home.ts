import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { RestProvider } from '../../providers/rest/rest';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {

      this.getPeoples();
  }

  getPeoples() {
    this.restProvider.getPeoples().then(data => {
      console.log(data);
    });
  }
}
