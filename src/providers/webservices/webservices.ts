import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, URLSearchParams, Response } from "@angular/http";
import { Events, Alert } from "ionic-angular";
import { StorageProvider } from "../storage/storage";
import { Observable } from "rxjs/Observable";
import { serverDetails } from "../config/config";
import {AlertController} from 'ionic-angular';

import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";


/*
  Generated class for the WebservicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebservicesProvider {

   data: any;
   currentUser: any;
    response :any;
   api = serverDetails.baseUrl;

  constructor(
    public http: Http,
    public user: StorageProvider,
    public events: Events,
    public alertController:AlertController 
  ) {}

  get(url) {
    this.currentUser = this.user.getUserData();

    if (this.currentUser == null) {
      this.currentUser = {};
      this.currentUser.token = "";
    }

    let favoritesURL = this.api + url;
    //console.log('favoritesURL');
    console.log(favoritesURL);
    //console.log(this.currentUser.access_token);

    let headers = new Headers({
      Authorization: "Bearer " + this.currentUser.token,
      "Content-Type": "application/json"
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(favoritesURL, options).map(res => res.json());
  }

   post(data, url) {
    debugger
    console.log(data);
    this.currentUser = this.user.getUserData();
    
    if (this.currentUser == null) {
      this.currentUser = {};
      this.currentUser.token = "";
    }else{

      data.token = this.currentUser.token;
    }

    console.log('data===',data);
    
    let favoritesURL = this.api + url;
    console.log('favoritesURL',favoritesURL);
    // let headers = new Headers({
    //     Authorization: "Bearer " + this.currentUser.token,
    //     "Content-Type": "application/json"
    //   });

  //   let alert = this.alertController.create({
  //     message: data,
  //     buttons: ['OK']
  // });

  // alert.present();
     // let options = new RequestOptions({ headers: headers });
     

    return   this.http.post(favoritesURL, data).map(res =>{
  
     var response = JSON.stringify(res['_body'] )
     // console.log('res', res )
      console.log('resjson', response )
      debugger
     // res.text() = response
     if(res['_body'] && res['_body']!=null && res['_body'].length!=0){
       res['_body'] = res['_body'].replace(/\\/g,'/')
      
     }
    
        return res.json()});

  }


}
