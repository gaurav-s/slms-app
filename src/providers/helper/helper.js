var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Events, ToastController, ActionSheetController } from "ionic-angular";
import { StorageProvider } from "../storage/storage";
import { Network } from "@ionic-native/network";
/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HelperProvider = /** @class */ (function () {
    function HelperProvider(events, toastCtrl, userData, actionSheetCtrl, network) {
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.userData = userData;
        this.actionSheetCtrl = actionSheetCtrl;
        this.network = network;
        this.previousStatus = 'online';
        this.checkDisconnect();
    }
    HelperProvider.prototype.checkDisconnect = function () {
        var _this = this;
        this.network.onDisconnect().subscribe(function () {
            // console.log('network was disconnected :-(');
            if (_this.previousStatus == 'online') {
                var toast = _this.toastCtrl.create({
                    message: "Cannot reach Network",
                    duration: 3000,
                    position: "bottom",
                    cssClass: 'error'
                });
                toast.present();
            }
            _this.previousStatus = 'offline';
        });
        this.network.onConnect().subscribe(function () {
            _this.previousStatus = 'online';
            console.log('connect network==============================');
        });
    };
    HelperProvider.prototype.getError = function (data) {
        var error_msg = "";
        for (var key in data) {
            error_msg = error_msg + data[key];
        }
        return error_msg;
    };
    HelperProvider.prototype.presentToast = function (msg, classname) {
        if (typeof msg == "string") {
            this.showMsg(msg, classname);
        }
        else {
            console.log(msg);
            console.log("msg-----" + msg.status);
            if (msg.status == 0) {
                // this.showMsg(msg,classname);
                // let connectSubscription = this.network.onConnect().subscribe((Network) => {
                //   setTimeout(() => {
                //     console.log('Network.type'+Network.type);
                //     if (Network.type === 'none') {
                //       msg = 'Network was disconnected :-(';
                //     }else{
                //       msg = 'server is down plz try again later';
                //     }
                //     this.showMsg(msg,classname);
                //   }, 3000);
                // });
                // stop connect watch
                //connectSubscription.unsubscribe();
            }
            else if (msg.status == 401) {
                msg = "Unauthorized user.Please login again";
                this.userData.logout();
                this.showMsg(msg, classname);
            }
            else if (msg.status == 400) {
                msg = "Unauthorized user.Please login again";
                this.userData.logout();
                this.showMsg(msg, classname);
            }
            else if (msg.status == 500) {
                msg = "server error";
                this.showMsg(msg, classname);
            }
            else {
                msg = msg.status;
                this.showMsg(msg, classname);
            }
        }
    };
    HelperProvider.prototype.showMsg = function (msg, classname) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: "top",
            cssClass: classname
        });
        toast.present();
    };
    HelperProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Events,
            ToastController,
            StorageProvider,
            ActionSheetController,
            Network])
    ], HelperProvider);
    return HelperProvider;
}());
export { HelperProvider };
//# sourceMappingURL=helper.js.map