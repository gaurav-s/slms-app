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
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { OpencomplaintslistPage } from '../../pages/opencomplaintslist/opencomplaintslist';
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the ComplaintmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddfollowPage = /** @class */ (function () {
    function AddfollowPage(navCtrl, loadingCtrl, navParams, userData, webServices, helper, events) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.events = events;
        this.list = 'currrentlist';
        this.ulb = '';
        this.followup = {};
        console.log('linketofollow=====');
        console.log('followup====', this.followup);
    }
    AddfollowPage.prototype.ionViewDidLoad = function () {
        this.ulbName = this.navParams.get('ulbname');
        this.ulbId = this.navParams.get('ulbid');
        this.paymentMasterId = this.navParams.get('paymentMasterId');
        var currentDate = new Date();
        var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        var day = ("0" + (currentDate.getDate())).slice(-2);
        var year = currentDate.getFullYear();
        this.maxDate = String(year + '-' + month + '-' + day);
    };
    AddfollowPage.prototype.openComplaint = function () {
        this.navCtrl.push(OpencomplaintslistPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName });
    };
    AddfollowPage.prototype.addFollow = function () {
        var _this = this;
        if (this.followup.date1 == undefined) {
            this.helper.presentToast("You must include date.", "error");
        }
        else if (this.followup.remarks == undefined) {
            this.helper.presentToast("You must include remarks.", "error");
        }
        else {
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader_1.present();
            console.log(this.followup);
            this.followup.date = this.followup.date1.split('-');
            this.followup.date = this.followup.date[2] + '-' + this.followup.date[1] + '-' + this.followup.date[0];
            var data = {
                paymentMasterId: this.paymentMasterId,
                followupDate: this.followup.date,
                remarks: this.followup.remarks
            };
            this.webServices.post(data, "addFollowupService.html").subscribe(function (getData) {
                loader_1.dismiss();
                console.log(getData);
                _this.navCtrl.pop().then(function () {
                    // Trigger custom event and pass data to be send back
                    console.log('manpower=====');
                    _this.events.publish('update-followup', "");
                });
                _this.helper.presentToast(getData.msg, "error");
            }, function (err) {
                loader_1.dismiss();
                console.log('inininokokokook');
                console.log(err);
                // console.log(err.statusText);
                //this.helper.presentToast(err, "error");
            });
        }
    };
    AddfollowPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    AddfollowPage = __decorate([
        Component({
            selector: 'page-addfollow',
            templateUrl: 'addfollow.html',
        }),
        __metadata("design:paramtypes", [NavController,
            LoadingController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider,
            Events])
    ], AddfollowPage);
    return AddfollowPage;
}());
export { AddfollowPage };
//# sourceMappingURL=addfollow.js.map