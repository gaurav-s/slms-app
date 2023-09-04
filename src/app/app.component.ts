import { Component } from '@angular/core';
import {   Events,
           MenuController,
           Nav,
           Platform,
           LoadingController,
           AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';

import { StorageProvider } from "../providers/storage/storage";
import { HelperProvider } from "../providers/helper/helper";
import { WebservicesProvider } from "../providers/webservices/webservices";
import { HomePage } from "../pages/home/home";
import { NewcomplaintPage } from "../pages/newcomplaint/newcomplaint";
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  currentUser: {
    id?: any;
    username?: any;
    matches_won?: string;
    teams_created?: string;
    user_name?: string;
    picture?: string;
    register_type?: string;
    facebook_id?: string;
    team_name?: string;
    signalId?: string;
  } = {};
  constructor(
    public events: Events,
    public userData: StorageProvider,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public helper: HelperProvider,
    public webServices: WebservicesProvider,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private geolocation: Geolocation
    ) {

      this.platformReady();
    }

    platformReady(){

       this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();

        this.checkToken();

        // this.geolocation.getCurrentPosition().then((resp:any) => {
        //  // resp.coords.latitude
        //  // resp.coords.longitude
        //  console.log(resp.coords);
         
        //  //this.getCityName(resp.coords.latitude,resp.coords.longitude);

        // }).catch((error) => {
          
        //     // this.loader.dismiss();
        //     //alert(error);
        //     console.log('Error getting location', error);
        // });
    });
  }

  checkToken(){

      console.log('check token========================');
      let data={

      }

      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });

      loader.present();

      //console.log('loader present');

      this.userData.getCurrentUser().then(hasLoggedIn => {

                  loader.dismiss();

                  if (hasLoggedIn) {

                      console.log(hasLoggedIn);

                       this.webServices.post(data, "getUserULBService.html").subscribe(
                        getData => {
                          
                          console.log('data===============',getData);          
                          if(getData.msg=='success'){

                              this.currentUser = hasLoggedIn.user;
                              this.rootPage = HomePage;

                          }else{

                              loader.dismiss();
                              this.logOut();
                              
                             // this.helper.presentToast(getData.msg, "error");
                          }
                        },
                        err => {
                          loader.dismiss();
                          this.rootPage = LoginPage;
                          this.helper.presentToast(err, "error");
                        }
                      );

                      

                  } else {

                     // this.enableMenu(false);
                      this.rootPage = LoginPage;
                  }
              });

     

      

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
            this.rootPage = LoginPage;

          },
          err => {

            loader.dismiss();
            //this.helper.presentToast(err, "error");

          });
    

  }

}
