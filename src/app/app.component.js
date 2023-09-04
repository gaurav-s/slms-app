var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Events, MenuController, Platform, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { StorageProvider } from "../providers/storage/storage";
import { HelperProvider } from "../providers/helper/helper";
import { WebservicesProvider } from "../providers/webservices/webservices";
import { HomePage } from "../pages/home/home";
import { Geolocation } from '@ionic-native/geolocation';
var MyApp = /** @class */ (function () {
    function MyApp(events, userData, menu, alertCtrl, loadingCtrl, platform, helper, webServices, statusBar, splashScreen, geolocation) {
        this.events = events;
        this.userData = userData;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.helper = helper;
        this.webServices = webServices;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.geolocation = geolocation;
        this.currentUser = {};
        this.platformReady();
    }
    MyApp.prototype.platformReady = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.checkToken();
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
    };
    MyApp.prototype.checkToken = function () {
        var _this = this;
        console.log('check token========================');
        var data = {};
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        //console.log('loader present');
        this.userData.getCurrentUser().then(function (hasLoggedIn) {
            loader.dismiss();
            if (hasLoggedIn) {
                console.log(hasLoggedIn);
                _this.webServices.post(data, "getUserULBService.html").subscribe(function (getData) {
                    console.log('data===============', getData);
                    if (getData.msg == 'success') {
                        _this.currentUser = hasLoggedIn.user;
                        _this.rootPage = HomePage;
                    }
                    else {
                        loader.dismiss();
                        _this.logOut();
                        // this.helper.presentToast(getData.msg, "error");
                    }
                }, function (err) {
                    loader.dismiss();
                    _this.rootPage = LoginPage;
                    _this.helper.presentToast(err, "error");
                });
            }
            else {
                // this.enableMenu(false);
                _this.rootPage = LoginPage;
            }
        });
    };
    MyApp.prototype.logOut = function () {
        var _this = this;
        var data = {};
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.webServices.post(data, "logout.php").subscribe(function (getData) {
            loader.dismiss();
            console.log(getData);
            _this.userData.logout();
            _this.rootPage = LoginPage;
        }, function (err) {
            loader.dismiss();
            //this.helper.presentToast(err, "error");
        });
    };
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Events,
            StorageProvider,
            MenuController,
            AlertController,
            LoadingController,
            Platform,
            HelperProvider,
            WebservicesProvider,
            StatusBar,
            SplashScreen,
            Geolocation])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map