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
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
import { StockdetailsPage } from '../../pages/stockdetails/stockdetails';
var StocklistPage = /** @class */ (function () {
    function StocklistPage(loadingCtrl, navCtrl, navParams, userData, webServices, helper) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.spareList = [];
    }
    StocklistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CategoryPage');
        this.ulbId = this.navParams.get('ulbid');
        this.ulbName = this.navParams.get('ulbname');
        this.categoryId = this.navParams.get('categoryid');
        this.categoryName = this.navParams.get('categoryname');
        this.subcategoryid = this.navParams.get('subcategoryid');
        console.log(this.ulbName, this.categoryId);
        this.getULB();
    };
    StocklistPage.prototype.getULB = function () {
        var _this = this;
        var data = {
            categoryid: String(this.categoryId),
            subcategoryid: String(this.subcategoryid)
        };
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.webServices.post(data, "sparelistService.html").subscribe(function (getData) {
            loader.dismiss();
            _this.spareList = getData.sparelist;
            console.log(_this.spareList);
        }, function (err) {
            loader.dismiss();
            _this.helper.presentToast(err, "error");
        });
    };
    StocklistPage.prototype.openstockdetails = function (data) {
        this.navCtrl.push(StockdetailsPage, { ulbid: this.ulbId, sparemasterid: data.spareMasterId, subcategoryid: this.subcategoryid, categoryid: this.categoryId, ulbname: this.ulbName });
    };
    StocklistPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    StocklistPage = __decorate([
        Component({
            selector: 'page-stocklist',
            templateUrl: 'stocklist.html',
        }),
        __metadata("design:paramtypes", [LoadingController,
            NavController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider])
    ], StocklistPage);
    return StocklistPage;
}());
export { StocklistPage };
//# sourceMappingURL=stocklist.js.map