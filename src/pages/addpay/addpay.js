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
var AddpayPage = /** @class */ (function () {
    function AddpayPage(navCtrl, loadingCtrl, navParams, userData, webServices, helper, events) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.events = events;
        this.list = 'currrentlist';
        this.ulb = '';
        this.payment = {};
        var currentDate = new Date();
        var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        var day = ("0" + (currentDate.getDate())).slice(-2);
        var year = currentDate.getFullYear();
        this.maxDate = String(year + '-' + month + '-' + day);
    }
    AddpayPage.prototype.ionViewDidLoad = function () {
        this.ulbName = this.navParams.get('ulbname');
        this.ulbId = this.navParams.get('ulbid');
        this.payment.paymentMasterId = this.navParams.get('paymentMasterId');
        this.payment.invoiceAmount = this.navParams.get('invoiceamount');
        this.payment.pendingAmount = this.navParams.get('pendingamount');
        this.payment.status = 'Unpaid';
        console.log('this.navParams.get', this.payment);
    };
    AddpayPage.prototype.openComplaint = function () {
        this.navCtrl.push(OpencomplaintslistPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName });
    };
    AddpayPage.prototype.openmanpowerdetails = function () {
        this.navCtrl.push(ManpowerdetailsPage);
    };
    AddpayPage.prototype.newComplaint = function () {
        console.log('newComplaint===');
        this.navCtrl.push(NewcomplaintPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName, categoryname: this.categoryName });
    };
    AddpayPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    AddpayPage.prototype.updatePayment = function () {
        var _this = this;
        console.log('this.complaintDate===', this.payment.receivedAmount, this.payment.pendingAmount);
        if (this.payment.receivedAmount == undefined) {
            this.helper.presentToast("You must include received amount.", "error");
        }
        else if (this.payment.receivedDate1 == undefined) {
            this.helper.presentToast("You must include received date.", "error");
        }
        else if (this.payment.receivedAmount > this.payment.pendingAmount) {
            this.helper.presentToast("Payment amount cannot be greater than invoice amount.", "error");
        }
        else {
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader_1.present();
            this.payment.receivedDate = this.payment.receivedDate1.split('-');
            this.payment.receivedDate = this.payment.receivedDate[2] + '-' + this.payment.receivedDate[1] + '-' + this.payment.receivedDate[0];
            this.webServices.post(this.payment, "addReceivedPaymentService.html").subscribe(function (getData) {
                loader_1.dismiss();
                console.log(getData);
                if (getData.result == 'success') {
                    _this.helper.presentToast(getData.msg, "error");
                    _this.navCtrl.pop().then(function () {
                        // Trigger custom event and pass data to be send back
                        console.log('manpower=====');
                        _this.events.publish('update-payment', _this.payment.receivedAmount);
                    });
                }
                else {
                    _this.helper.presentToast(getData.msg, "error");
                }
            }, function (err) {
                loader_1.dismiss();
                console.log('inininokokokook');
                console.log(err);
                // console.log(err.statusText);
                //this.helper.presentToast(err, "error");
            });
        }
    };
    AddpayPage = __decorate([
        Component({
            selector: 'page-addpay',
            templateUrl: 'addpay.html',
        }),
        __metadata("design:paramtypes", [NavController,
            LoadingController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider,
            Events])
    ], AddpayPage);
    return AddpayPage;
}());
export { AddpayPage };
//# sourceMappingURL=addpay.js.map