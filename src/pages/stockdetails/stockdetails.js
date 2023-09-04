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
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { OpencomplaintslistPage } from '../../pages/opencomplaintslist/opencomplaintslist';
import { NewcomplaintPage } from '../../pages/newcomplaint/newcomplaint';
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the ComplaintmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StockdetailsPage = /** @class */ (function () {
    function StockdetailsPage(navCtrl, loadingCtrl, navParams, userData, webServices, helper) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.list = 'currrentlist';
        this.ulb = '';
        this.addStock = {};
        this.Isupdatestock = false;
        this.stockList = {};
    }
    StockdetailsPage.prototype.ionViewDidLoad = function () {
        this.ulbName = this.navParams.get('ulbname');
        this.addStock.categoryId = String(this.navParams.get('categoryid'));
        this.addStock.subcategoryId = String(this.navParams.get('subcategoryid'));
        this.addStock.spareMasterId = String(this.navParams.get('sparemasterid'));
        this.addStock.ulbId = String(this.navParams.get('ulbid'));
        this.getStock();
        console.log('ionViewDidLoad ComplaintmenuPage');
    };
    StockdetailsPage.prototype.getStock = function () {
        var _this = this;
        var data = {
            categoryid: String(this.addStock.categoryId),
            subcategoryid: String(this.addStock.subcategoryId),
            spareid: String(this.addStock.spareMasterId),
            ulbid: String(this.addStock.ulbId),
        };
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.webServices.post(data, "getMaxStockdateRecordService.html").subscribe(function (getData) {
            loader.dismiss();
            var currentDate1;
            var currentDate2;
            if (getData.maxstockdate) {
                currentDate1 = new Date();
                var month = ("0" + (currentDate1.getMonth() + 1)).slice(-2);
                var day = ("0" + (currentDate1.getDate())).slice(-2);
                var year = currentDate1.getFullYear();
                _this.maxstockdate = getData.maxstockdate;
                var date1 = String(year + '-' + month + '-' + day);
                var date2 = String(_this.maxstockdate.split('-')[2] + '-' + _this.maxstockdate.split('-')[1] + '-' + _this.maxstockdate.split('-')[0]);
                console.log('date1==', date1, 'date2===', date2);
                if (date1 != date2) {
                    _this.currentDate = String(year + '-' + month + '-' + day);
                    console.log(_this.maxstockdate.split('-'));
                    currentDate1 = new Date(_this.maxstockdate.split('-')[2], _this.maxstockdate.split('-')[1], _this.maxstockdate.split('-')[0]);
                    currentDate1.setDate(currentDate1.getDate() + 1);
                    var month = ("0" + (currentDate1.getMonth())).slice(-2);
                    var day = ("0" + (currentDate1.getDate())).slice(-2);
                    var year = currentDate1.getFullYear();
                    _this.maxDate = String(year + '-' + month + '-' + day);
                }
                else {
                    _this.maxDate = String(year + '-' + month + '-' + day);
                    console.log(_this.maxstockdate.split('-'));
                    currentDate1 = new Date(_this.maxstockdate.split('-')[2], _this.maxstockdate.split('-')[1], _this.maxstockdate.split('-')[0]);
                    currentDate1.setDate(currentDate1.getDate());
                    var month = ("0" + (currentDate1.getMonth())).slice(-2);
                    var day = ("0" + (currentDate1.getDate())).slice(-2);
                    var year = currentDate1.getFullYear();
                    _this.currentDate = String(year + '-' + month + '-' + day);
                }
            }
            else {
                currentDate2 = new Date();
                var month = ("0" + (currentDate2.getMonth() + 1)).slice(-2);
                var day = ("0" + (currentDate2.getDate())).slice(-2);
                var year = currentDate2.getFullYear();
                _this.currentDate = String(year + '-' + month + '-' + day);
                console.log('this.maxDate==', _this.currentDate);
                currentDate2 = new Date();
                currentDate2.setMonth(currentDate2.getMonth() + 1);
                // let currentDate = new Date(this.maxstockdate.split('-')[2],this.maxstockdate.split('-')[1],this.maxstockdate.split('-')[0]);
                currentDate2.setDate(currentDate2.getDate() - 15);
                var month = ("0" + (currentDate2.getMonth())).slice(-2);
                var day = ("0" + (currentDate2.getDate())).slice(-2);
                var year = currentDate2.getFullYear();
                _this.maxDate = String(year + '-' + month + '-' + day);
                console.log('this.currentDate==', _this.maxDate);
            }
            _this.stockList = getData.stocklist;
            console.log(getData);
            console.log(_this.stockList);
        }, function (err) {
            loader.dismiss();
            _this.helper.presentToast(err, "error");
        });
    };
    StockdetailsPage.prototype.dateChange = function (date) {
        var selectdate = date.split('-');
        selectdate = selectdate[2] + '-' + selectdate[1] + '-' + selectdate[0];
        this.Isupdatestock = false;
        if (selectdate == this.maxstockdate) {
            if (this.stockList) {
                this.addStock.stockIn = String(this.stockList.stockIn);
                this.addStock.stock = String(this.stockList.stock);
                this.addStock.stockmasterid = String(this.stockList.stockMasterId);
                this.Isupdatestock = true;
            }
            else {
                this.addStock.stockIn = String(0);
                this.addStock.stock = String(0);
            }
        }
        else {
        }
    };
    StockdetailsPage.prototype.createStock = function () {
        if (this.addStock.stockDate1 == undefined) {
            this.helper.presentToast("You must include stockDate.", "error");
        }
        else if (this.addStock.stockIn == undefined) {
            this.helper.presentToast("You must include stockIn.", "error");
        }
        else if (this.addStock.stock == undefined) {
            this.helper.presentToast("You must include stock.", "error");
        }
        else {
            console.log('this.complaintDate===', this.addStock);
            if (this.Isupdatestock && (this.addStock.stockIn != this.stockList.stockIn || this.addStock.stock != this.stockList.stock)) {
                this.addStock.stockin = this.addStock.stockIn;
                this.stockUpdate();
            }
            else {
                this.stockInsert();
            }
        }
    };
    StockdetailsPage.prototype.stockInsert = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.addStock.stockDate = this.addStock.stockDate1.split('-');
        this.addStock.stockDate = this.addStock.stockDate[2] + '-' + this.addStock.stockDate[1] + '-' + this.addStock.stockDate[0];
        console.log('stockinsert==', this.addStock);
        this.webServices.post(this.addStock, "addStockService.html").subscribe(function (getData) {
            loader.dismiss();
            console.log(getData);
            if (getData.result == 'success') {
                _this.helper.presentToast(getData.msg, "error");
                _this.navCtrl.pop().then(function () {
                    // Trigger custom event and pass data to be send back
                    console.log('manpower=====');
                    //this.events.publish('update-payment', this.addPayment);
                });
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
    StockdetailsPage.prototype.stockUpdate = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.addStock.stockDate = this.addStock.stockDate1.split('-');
        this.addStock.stockDate = this.addStock.stockDate[2] + '-' + this.addStock.stockDate[1] + '-' + this.addStock.stockDate[0];
        console.log('stockupdate==', this.addStock);
        this.webServices.post(this.addStock, "updateStockService.html").subscribe(function (getData) {
            loader.dismiss();
            console.log(getData);
            if (getData.result == 'success') {
                _this.helper.presentToast(getData.msg, "error");
                _this.navCtrl.pop().then(function () {
                    // Trigger custom event and pass data to be send back
                    console.log('manpower=====');
                    //this.events.publish('update-payment', this.addPayment);
                });
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
    StockdetailsPage.prototype.openComplaint = function () {
        this.navCtrl.push(OpencomplaintslistPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName });
    };
    StockdetailsPage.prototype.newComplaint = function () {
        console.log('newComplaint===');
        this.navCtrl.push(NewcomplaintPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName, categoryname: this.categoryName });
    };
    StockdetailsPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    StockdetailsPage = __decorate([
        Component({
            selector: 'page-stockdetails',
            templateUrl: 'stockdetails.html',
        }),
        __metadata("design:paramtypes", [NavController,
            LoadingController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider])
    ], StockdetailsPage);
    return StockdetailsPage;
}());
export { StockdetailsPage };
//# sourceMappingURL=stockdetails.js.map