import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

<<<<<<< HEAD
	// apiUrl = 'http://127.0.0.1:3000';
	apiUrl = 'https://swipew.herokuapp.com';
=======
  apiUrl = 'https://swipew.herokuapp.com';
>>>>>>> 765d898ca0ab9c6e186d71634d17922644726d41

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

	getPeoples() {
	  return new Promise(resolve => {
	    this.http.get(this.apiUrl+'/peoples').subscribe(data => {
	      resolve(data);
	    }, err => {
	      console.log(err);
	    });
	  });
	}

	getMovies(idFilms) {
		let arg = { "filmTop" : idFilms[0], "filmBot" : idFilms[1]};
		let url = this.apiUrl+'/films/';

	  return new Promise(resolve => {
	    this.http.post(url,arg).subscribe(data => {
				// console.log(data);
	      resolve(data);
	    }, err => {
	      console.log(err);
	    });
	  });
	}

}
