import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { RestProvider } from '../providers/rest/rest';

import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';
import { ResultPage } from '../pages/result/result';
import { ContactPage } from '../pages/contact/contact';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    SwingModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultPage,
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
