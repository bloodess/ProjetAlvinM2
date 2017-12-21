import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController, Slides, LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import {
  StackConfig,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';


import { RestProvider } from '../../providers/rest/rest';
import { ResultPage } from '../result/result';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {

  cards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';
  knowCards: Array<any>;
  unknowCards : Array<any>;
  resultPage:any = ResultPage;
  loader;

  constructor( public restProvider: RestProvider, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create({
      content: 'Wait ...',
    });
       
    this.loader.present();
    
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  getPeoples() {
    //TODO add class data
    this.restProvider.getPeoples().then((data: any) => {
      var stringData = JSON.stringify(data);
      var parsedData = JSON.parse(stringData);
      this.cards = parsedData;
    });
  }

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  @ViewChild(Slides) slides: Slides;

  ngAfterViewInit() {

    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    this.getPeoples();
    this.cards = [{name: ''}];
    this.knowCards = [];
    this.unknowCards = [];
  }

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    var color = '';
    
    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  // Connected through HTML
  voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    if (like) {
      this.knowCards.push(removedCard);
      this.recentCard = 'You know: ' + removedCard.name;
    } else {
      this.unknowCards.push(removedCard);
      this.recentCard = 'You do not know : ' + removedCard.name;
    }

    if(this.cards.length == 0) {

      let mTS = this.findMovieToSee(this.knowCards,this.unknowCards);

      this.navCtrl.push(ResultPage, {
        movieToSee: mTS
      });
    }
  }

  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }

  findMovieToSee(peoplesK, peoplesU) {
    let ret: number[];
    let max = 0;
    let min = 100;
    let idMax = 0;
    let idMin = 0;

    let incFilm = [
      {id: 1, count:0},
      {id: 2, count:0},
      {id: 3, count:0},
      {id: 4, count:0},
      {id: 5, count:0},
      {id: 6, count:0},
      {id: 7, count:0}
    ]
    peoplesK.forEach(people => {
      people.films.forEach(idFilm => {
        incFilm[idFilm-1].count ++;
      });
    });

    peoplesU.forEach(people => {
      people.films.forEach(idFilm => {
        incFilm[idFilm-1].count --;
      });
    });

    ret = incFilm.reduce(function(prev, curr) {
      if(max < curr.count) {
        max = curr.count;
        idMax = curr.id;
      }
      if(min > curr.count) {
        min = curr.count;
        idMin = curr.id;
      }
      return [idMax,idMin];
    }, [0,0]);

    return ret;
  }

  ionViewWillEnter() {

    this.ngAfterViewInit();
    this.recentCard = '';

    this.loader.dismiss();
  }

  public nextSlide(index : number) {
    this.slides.slideNext();
  }

  prevSlide() {
    this.slides.slideTo(0, 500);
  }

}
