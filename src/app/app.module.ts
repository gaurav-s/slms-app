import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HttpModule, Http } from '@angular/http';


import { OpencomplaintslistPage } from '../pages/opencomplaintslist/opencomplaintslist';
import { NewcomplaintPage } from '../pages/newcomplaint/newcomplaint';
import { ComplaintdetailsPage } from '../pages/complaintdetails/complaintdetails';
import { LoginPage } from '../pages/login/login';
import { ManpowerPage } from '../pages/manpower/manpower';
import { ManpowerdetailsPage } from '../pages/manpowerdetails/manpowerdetails';
import { StockPage } from '../pages/stock/stock';
import { StocklistPage } from '../pages/stocklist/stocklist';
import { StockdetailsPage } from '../pages/stockdetails/stockdetails';
import { PaymentsPage } from '../pages/payments/payments';
import { PaymentsdetailsPage } from '../pages/paymentsdetails/paymentsdetails';
import { AddpaymentPage } from '../pages/addpayment/addpayment';
import { AddfollowPage } from '../pages/addfollow/addfollow';
import { AddpayPage } from '../pages/addpay/addpay';
import { MyreportsPage } from '../pages/myreports/myreports';


import { HomePage } from '../pages/home/home';

import { CategoryPage } from '../pages/category/category';
import { ComplaintmenuPage } from '../pages/complaintmenu/complaintmenu';

import { StatusBar } from '@ionic-native/status-bar';
import { Network } from "@ionic-native/network";
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';

import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

import { WebservicesProvider } from '../providers/webservices/webservices';
import { HelperProvider } from '../providers/helper/helper';
import { StorageProvider } from '../providers/storage/storage';
import { DatePickerModule } from 'ionic2-date-picker';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { AppVersion } from '@ionic-native/app-version';

declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  declarations: [
    MyApp,
    ComplaintmenuPage,
    OpencomplaintslistPage,
    HomePage,
    CategoryPage,
    NewcomplaintPage,
    ComplaintdetailsPage,
    LoginPage,
    ManpowerPage,
    ManpowerdetailsPage,
    StockPage,
    StocklistPage,
    StockdetailsPage,
    PaymentsPage,
    PaymentsdetailsPage,
    AddpaymentPage,
    AddfollowPage,
    AddpayPage,
    MyreportsPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    DatePickerModule,
    ChartModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ComplaintmenuPage,
    OpencomplaintslistPage,
    HomePage,
    CategoryPage,
    NewcomplaintPage,
    ComplaintdetailsPage,
    LoginPage,
    ManpowerPage,
    ManpowerdetailsPage,
    StockPage,
    StocklistPage,
    StockdetailsPage,
    PaymentsPage,
    PaymentsdetailsPage,
    AddpaymentPage,
    AddfollowPage,
    AddpayPage,
    MyreportsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HighchartsStatic,useFactory: highchartsFactory},
    WebservicesProvider,
    HelperProvider,
    Network,
    Geolocation,
    NativeGeocoder,
    StorageProvider,
    AppVersion
    
  ]
})
export class AppModule {}
