import { Component } from '@angular/core';
import {  NavController,
  		  NavParams,
          LoadingController,
          AlertController 
        } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { LoginPage } from '../login/login';

import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  currentUser:any;
  ulbList:any;

  constructor(
  	public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public webServices: WebservicesProvider,
    public helper: HelperProvider,
    public alertCtrl: AlertController
  ){

  }

  ionViewDidLoad() {

    this.currentUser = this.userData.getUserData();
    this.ulbList = this.currentUser.ulblist;
    console.log('this.currentUser==',this.ulbList);

  }

  selectULB(name,id){
  	console.log('name',name,id);
  	this.navCtrl.push(CategoryPage,{name:name,id:id});
  }

  logOut(){

    
      let data={
        
      }

      let loader = this.loadingCtrl.create({
          content: "Please wait..."
      });

      loader.present();

      this.webServices.post(data, "logout.php").subscribe(
          getData => {
            
            loader.dismiss();
            console.log(getData);
            this.userData.logout();
            this.navCtrl.setRoot(LoginPage);

          },
          err => {

            loader.dismiss();
            this.helper.presentToast(err, "error");

          });
    

  }


    showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'LogOut?',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.logOut();
          }
        }
      ]
    });
    confirm.present();
  }


  
}
