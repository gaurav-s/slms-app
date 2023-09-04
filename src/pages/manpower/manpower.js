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
import { NewcomplaintPage } from '../../pages/newcomplaint/newcomplaint';
import { ManpowerdetailsPage } from '../../pages/manpowerdetails/manpowerdetails';
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the ComplaintmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ManpowerPage = /** @class */ (function () {
    function ManpowerPage(navCtrl, loadingCtrl, navParams, userData, webServices, helper, events) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.events = events;
        this.list = 'currrentlist';
        this.ulb = '';
        this.submitDates = [];
        this.nonSubmitDates = [];
        this.isLoading = false;
    }
    ManpowerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.categoryId = this.navParams.get('categoryid');
        this.categoryName = this.navParams.get('categoryname');
        this.ulbName = this.navParams.get('ulbname');
        this.ulbId = this.navParams.get('ulbid');
        this.list = 'notsubmitted';
        this.getList();
        this.events.subscribe('update-manpower', function (paramsVar) {
            // Do stuff with "paramsVar"
            console.log(paramsVar);
            _this.getList();
            //this.events.unsubscribe('custom-user-events'); // unsubscribe this event
        });
        console.log('ionViewDidLoad ComplaintmenuPage');
    };
    ManpowerPage.prototype.getList = function () {
        var _this = this;
        console.log('getlis==');
        var data = {
            ulbid: String(this.ulbId)
        };
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.webServices.post(data, "getManpowerSubmitDates.html").subscribe(function (getData) {
            loader.dismiss();
            _this.isLoading = true;
            _this.submitDates = [];
            _this.nonSubmitDates = [];
            if (getData.submitNonSubmitDates) {
                if (getData.submitNonSubmitDates[0].submitdates != null) {
                    _this.submitDates = getData.submitNonSubmitDates[0].submitdates;
                }
                if (getData.submitNonSubmitDates[0].nonsubmitdates != null) {
                    _this.nonSubmitDates = getData.submitNonSubmitDates[0].nonsubmitdates;
                }
            }
            console.log(_this.submitDates);
            console.log(_this.nonSubmitDates);
            console.log(getData);
        }, function (err) {
            _this.isLoading = true;
            loader.dismiss();
            _this.helper.presentToast(err, "error");
        });
    };
    ManpowerPage.prototype.openComplaint = function () {
        this.navCtrl.push(OpencomplaintslistPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName });
    };
    ManpowerPage.prototype.openmanpowerdetails = function (data) {
        this.navCtrl.push(ManpowerdetailsPage, { ulbid: this.ulbId, date: data, ulbname: this.ulbName });
    };
    ManpowerPage.prototype.newComplaint = function () {
        console.log('newComplaint===');
        this.navCtrl.push(NewcomplaintPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName, categoryname: this.categoryName });
    };
    ManpowerPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    ManpowerPage = __decorate([
        Component({
            selector: 'page-manpower',
            templateUrl: 'manpower.html',
        }),
        __metadata("design:paramtypes", [NavController,
            LoadingController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider,
            Events])
    ], ManpowerPage);
    return ManpowerPage;
}());
export { ManpowerPage };
//# sourceMappingURL=manpower.js.map