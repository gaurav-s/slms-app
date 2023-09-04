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
var AddpaymentPage = /** @class */ (function () {
    function AddpaymentPage(navCtrl, loadingCtrl, navParams, userData, webServices, helper, events) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.events = events;
        this.list = 'currrentlist';
        this.ulb = '';
        this.addPayment = {};
        var currentDate = new Date();
        var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        var day = ("0" + (currentDate.getDate())).slice(-2);
        var year = currentDate.getFullYear();
        this.maxDate = String(year + '-' + month + '-' + day);
    }
    AddpaymentPage.prototype.ionViewDidLoad = function () {
        this.categoryId = this.navParams.get('categoryid');
        this.categoryName = this.navParams.get('categoryname');
        this.ulbName = this.navParams.get('ulbname');
        this.ulbId = this.navParams.get('ulbid');
        this.addPayment.ulbId = String(this.navParams.get('ulbid'));
        console.log('this.navParams.get', this.navParams.get('ulbid'));
    };
    AddpaymentPage.prototype.openComplaint = function () {
        this.navCtrl.push(OpencomplaintslistPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName });
    };
    AddpaymentPage.prototype.openmanpowerdetails = function () {
        this.navCtrl.push(ManpowerdetailsPage);
    };
    AddpaymentPage.prototype.newComplaint = function () {
        console.log('newComplaint===');
        this.navCtrl.push(NewcomplaintPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName, categoryname: this.categoryName });
    };
    AddpaymentPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    AddpaymentPage.prototype.createInvoice = function () {
        var _this = this;
        if (this.addPayment.invoiceDate1 == undefined) {
            this.helper.presentToast("You must include invoiceDate.", "error");
        }
        else if (this.addPayment.invoiceNo == undefined) {
            this.helper.presentToast("You must include invoiceNo.", "error");
        }
        else if (/[^a-zA-Z0-9]/.test(this.addPayment.invoiceNo)) {
            this.helper.presentToast("Invoice number is not alphanumeric.", "error");
        }
        else if (this.addPayment.invoiceAmount == undefined) {
            this.helper.presentToast("You must include invoice amount.", "error");
        }
        else {
            console.log('this.complaintDate===', this.addPayment);
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader_1.present();
            this.addPayment.invoiceDate = this.addPayment.invoiceDate1.split('-');
            this.addPayment.invoiceDate = this.addPayment.invoiceDate[2] + '-' + this.addPayment.invoiceDate[1] + '-' + this.addPayment.invoiceDate[0];
            console.log(this.addPayment);
            this.webServices.post(this.addPayment, "addInvoiceService.html").subscribe(function (getData) {
                loader_1.dismiss();
                console.log(getData);
                if (getData.result == 'success') {
                    _this.navCtrl.pop().then(function () {
                        // Trigger custom event and pass data to be send back
                        console.log('manpower=====');
                        _this.events.publish('update-paymentlist', _this.addPayment);
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
    AddpaymentPage = __decorate([
        Component({
            selector: 'page-addpayment',
            templateUrl: 'addpayment.html',
        }),
        __metadata("design:paramtypes", [NavController,
            LoadingController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider,
            Events])
    ], AddpaymentPage);
    return AddpaymentPage;
}());
export { AddpaymentPage };
//# sourceMappingURL=addpayment.js.map