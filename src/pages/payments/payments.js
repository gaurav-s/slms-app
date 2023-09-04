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
import { PaymentsdetailsPage } from '../../pages/paymentsdetails/paymentsdetails';
import { AddpaymentPage } from '../../pages/addpayment/addpayment';
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the ComplaintmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PaymentsPage = /** @class */ (function () {
    function PaymentsPage(navCtrl, loadingCtrl, navParams, userData, webServices, helper, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.events = events;
        this.list = 'currrentlist';
        this.ulb = '';
        this.invoiceList = [];
        this.isLoading = false;
        this.invoiceList = [];
        this.events.subscribe('update-paymentlist', function (paramsVar) {
            // Do stuff with "paramsVar"
            console.log(paramsVar);
            _this.getPayment();
            //this.events.unsubscribe('custom-user-events'); // unsubscribe this event
        });
    }
    PaymentsPage.prototype.ionViewWillEnter = function () {
        this.categoryId = this.navParams.get('categoryid');
        this.categoryName = this.navParams.get('categoryname');
        console.log('categoryName====', this.categoryName);
        this.ulbName = this.navParams.get('ulbname');
        this.ulbId = this.navParams.get('ulbid');
        this.getPayment();
    };
    PaymentsPage.prototype.getPayment = function () {
        var _this = this;
        var data = {
            ulbid: String(this.ulbId)
        };
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.isLoading = false;
        console.log(data);
        this.webServices.post(data, "invoicelistservice.html").subscribe(function (getData) {
            loader.dismiss();
            _this.isLoading = true;
            _this.invoiceList = getData.invoicelist;
            console.log(_this.invoiceList);
        }, function (err) {
            _this.isLoading = true;
            loader.dismiss();
            _this.helper.presentToast(err, "error");
        });
    };
    PaymentsPage.prototype.openComplaint = function () {
        this.navCtrl.push(OpencomplaintslistPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName });
    };
    PaymentsPage.prototype.openmanpowerdetails = function () {
        this.navCtrl.push(ManpowerdetailsPage);
    };
    PaymentsPage.prototype.openpaymentdetails = function (data) {
        this.navCtrl.push(PaymentsdetailsPage, { ulbid: this.ulbId, payment: data, ulbname: this.ulbName });
    };
    PaymentsPage.prototype.openaddpayment = function () {
        this.navCtrl.push(AddpaymentPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName });
    };
    PaymentsPage.prototype.newComplaint = function () {
        console.log('newComplaint===');
        this.navCtrl.push(NewcomplaintPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName, categoryname: this.categoryName });
    };
    PaymentsPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    PaymentsPage = __decorate([
        Component({
            selector: 'page-payments',
            templateUrl: 'payments.html',
        }),
        __metadata("design:paramtypes", [NavController,
            LoadingController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider,
            Events])
    ], PaymentsPage);
    return PaymentsPage;
}());
export { PaymentsPage };
//# sourceMappingURL=payments.js.map