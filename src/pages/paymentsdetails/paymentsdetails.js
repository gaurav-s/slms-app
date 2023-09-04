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
import { NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';
import { OpencomplaintslistPage } from '../../pages/opencomplaintslist/opencomplaintslist';
import { NewcomplaintPage } from '../../pages/newcomplaint/newcomplaint';
import { ManpowerdetailsPage } from '../../pages/manpowerdetails/manpowerdetails';
import { AddpaymentPage } from '../../pages/addpayment/addpayment';
import { AddfollowPage } from '../../pages/addfollow/addfollow';
import { AddpayPage } from '../../pages/addpay/addpay';
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the ComplaintmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PaymentsdetailsPage = /** @class */ (function () {
    function PaymentsdetailsPage(navCtrl, loadingCtrl, navParams, userData, webServices, helper, events, alertCtrl) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.list = 'details';
        this.ulb = '';
        this.receivedPayment = [];
        this.followuplist = [];
        this.payment = {};
        var currentDate = new Date();
        var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        var day = ("0" + (currentDate.getDate())).slice(-2);
        var year = currentDate.getFullYear();
        this.maxDate = String(year + '-' + month + '-' + day);
    }
    PaymentsdetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.categoryId = this.navParams.get('categoryid');
        this.payment = this.navParams.get('payment');
        this.ulbName = this.navParams.get('ulbname');
        this.ulbId = this.navParams.get('ulbid');
        this.payment.paymentMasterId = this.payment.masterid;
        this.payment.pendingAmount = Number(this.payment.invoiceamount) - Number(this.payment.totalreceivedamt);
        console.log('this.payment==', this.payment);
        this.events.subscribe('update-followup', function (paramsVar) {
            // Do stuff with "paramsVar"
            _this.list = 'follow';
            _this.followList();
            //this.events.unsubscribe('update-followup'); // unsubscribe this event
        });
        this.events.subscribe('update-payment', function (paramsVar) {
            // Do stuff with "paramsVar"
            console.log('receiveamount==', paramsVar);
            _this.payment.totalreceivedamt = Number(_this.payment.totalreceivedamt) + Number(paramsVar);
            _this.payment.pendingAmount = Number(_this.payment.pendingAmount) - Number(paramsVar);
            _this.list = 'amount';
            _this.receivedPaymentList();
            //this.events.unsubscribe('update-followup'); // unsubscribe this event
        });
    };
    PaymentsdetailsPage.prototype.openComplaint = function () {
        this.navCtrl.push(OpencomplaintslistPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName });
    };
    PaymentsdetailsPage.prototype.openmanpowerdetails = function () {
        this.navCtrl.push(ManpowerdetailsPage);
    };
    PaymentsdetailsPage.prototype.openaddpayment = function () {
        this.navCtrl.push(AddpaymentPage);
    };
    PaymentsdetailsPage.prototype.openaddpay = function () {
        console.log('addpay');
        this.navCtrl.push(AddpayPage, { pendingamount: this.payment.pendingAmount, invoiceamount: this.payment.invoiceamount, paymentMasterId: this.payment.paymentMasterId, lbid: this.ulbId, ulbname: this.ulbName, categoryname: this.categoryName });
    };
    PaymentsdetailsPage.prototype.openaddfollow = function () {
        this.navCtrl.push(AddfollowPage, { paymentMasterId: this.payment.paymentMasterId, lbid: this.ulbId, ulbname: this.ulbName, categoryname: this.categoryName });
    };
    PaymentsdetailsPage.prototype.newComplaint = function () {
        console.log('newComplaint===');
        this.navCtrl.push(NewcomplaintPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName, categoryname: this.categoryName });
    };
    PaymentsdetailsPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    PaymentsdetailsPage.prototype.receivedPaymentList = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var data = {
            paymentmasterid: this.payment.paymentMasterId
        };
        this.webServices.post(data, "receivedPaymentListService.html").subscribe(function (getData) {
            loader.dismiss();
            console.log(getData);
            _this.receivedPayment = getData.receivedpaymentlist;
            //this.helper.presentToast(getData.msg, "error");
            console.log(_this.receivedPayment);
        }, function (err) {
            loader.dismiss();
            console.log('inininokokokook');
            console.log(err);
            // console.log(err.statusText);
            //this.helper.presentToast(err, "error");
        });
        //receivedPaymentListService.html
    };
    PaymentsdetailsPage.prototype.followList = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var data = {
            paymentmasterid: this.payment.paymentMasterId
        };
        this.webServices.post(data, "followuplistservice.html").subscribe(function (getData) {
            loader.dismiss();
            console.log(getData);
            _this.followuplist = getData.followuplist;
            //this.helper.presentToast(getData.msg, "error");
            console.log(_this.followuplist);
        }, function (err) {
            loader.dismiss();
            console.log('inininokokokook');
            console.log(err);
            // console.log(err.statusText);
            //this.helper.presentToast(err, "error");
        });
    };
    PaymentsdetailsPage.prototype.updatePayment = function () {
        var _this = this;
        //console.log('this.complaintDate===',this.addPayment);
        console.log(this.payment.totalreceivedamt, this.payment.invoiceamount);
        if (Number(this.payment.totalreceivedamt) < Number(this.payment.invoiceamount) && this.payment.status == 'paid') {
            var confirm_1 = this.alertCtrl.create({
                title: 'Alert?',
                message: 'Are you sure you want to mark this invoice paid?',
                buttons: [
                    {
                        text: 'No',
                        handler: function () {
                            console.log('Disagree clicked');
                        }
                    },
                    {
                        text: 'Yes',
                        handler: function () {
                            console.log('Agree clicked');
                            _this.payment.status = 'paid';
                            _this.updateInvoice();
                        }
                    }
                ]
            });
            confirm_1.present();
            // this.helper.presentToast(getData.msg, "error");
        }
        else {
            this.updateInvoice();
        }
    };
    PaymentsdetailsPage.prototype.updateInvoice = function () {
        var _this = this;
        console.log('inini');
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var data = {
            status: this.payment.status,
            paymentmasterid: this.payment.paymentMasterId
        };
        this.webServices.post(data, "updateInvoiceService.html").subscribe(function (getData) {
            loader.dismiss();
            console.log(getData);
            if (getData.result == 'success') {
                _this.helper.presentToast(getData.msg, "error");
                _this.navCtrl.pop().then(function () {
                    // Trigger custom event and pass data to be send back
                    console.log('manpower=====');
                    // this.events.publish('update-paymentlist', '');
                });
                // this.list = 'amount';
                // this.receivedPaymentList();
            }
            else {
                _this.helper.presentToast(getData.msg, "error");
            }
        }, function (err) {
            loader.dismiss();
            console.log('inininokokokook');
            console.log(err);
            // console.log(err.statusText);
            //this.helper.presentToast(err, "error");
        });
    };
    PaymentsdetailsPage = __decorate([
        Component({
            selector: 'page-paymentsdetails',
            templateUrl: 'paymentsdetails.html',
        }),
        __metadata("design:paramtypes", [NavController,
            LoadingController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider,
            Events,
            AlertController])
    ], PaymentsdetailsPage);
    return PaymentsdetailsPage;
}());
export { PaymentsdetailsPage };
//# sourceMappingURL=paymentsdetails.js.map