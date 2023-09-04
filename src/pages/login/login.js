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
import { NavController, NavParams, LoadingController, ToastController } from "ionic-angular";
import { Validators, FormBuilder } from "@angular/forms";
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
import { HomePage } from "../../pages/home/home";
var LoginPage = /** @class */ (function () {
    function LoginPage(loadingCtrl, navCtrl, navParams, userData, toastCtrl, webServices, helper, formBuilder) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.toastCtrl = toastCtrl;
        this.webServices = webServices;
        this.helper = helper;
        this.formBuilder = formBuilder;
        this.login = {};
        this.submitted = false;
        this.loginForm = this.formBuilder.group({
            userid: [
                "",
                Validators.compose([Validators.required, Validators.maxLength(30)])
            ],
            pass: ["", Validators.required]
        });
    }
    LoginPage.prototype.onLogin = function (form) {
        var _this = this;
        this.submitted = true;
        // this.createClient();
        console.log('login function');
        if (this.loginForm.valid) {
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader_1.present();
            this.login.userid = this.loginForm.value.userid;
            this.login.pass = this.loginForm.value.pass;
            this.webServices.post(this.login, "LoginService.html").subscribe(function (getData) {
                loader_1.dismiss();
                console.log(getData);
                if (getData.msg == 'success') {
                    _this.userData.login(getData);
                    _this.navCtrl.setRoot(HomePage);
                }
                else {
                    _this.helper.presentToast(getData.msg, "error");
                }
            }, function (err) {
                loader_1.dismiss();
                console.log('inininokokokook');
                console.log(err);
                console.log(err.statusText);
                _this.helper.presentToast(err, "error");
            });
        }
        else {
            if (this.loginForm.controls["userid"].hasError("required")) {
                this.helper.presentToast(" You must include a username.", "error");
            }
            else if (this.loginForm.controls["userid"].hasError("maxlength")) {
                this.helper.presentToast("Your username cannot exceed 30 characters.", "error");
            }
            else if (this.loginForm.controls["pass"].hasError("required")) {
                this.helper.presentToast(" You must include a password.", "error");
            }
        }
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        }),
        __metadata("design:paramtypes", [LoadingController,
            NavController,
            NavParams,
            StorageProvider,
            ToastController,
            WebservicesProvider,
            HelperProvider,
            FormBuilder])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map