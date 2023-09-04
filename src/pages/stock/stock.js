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
import { StocklistPage } from '../../pages/stocklist/stocklist';
var StockPage = /** @class */ (function () {
    function StockPage(loadingCtrl, navCtrl, navParams, userData, webServices, helper) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
    }
    StockPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad stock');
        this.ulbName = this.navParams.get('ulbname');
        this.categoryId = this.navParams.get('categoryid');
        this.ulbId = this.navParams.get('ulbid');
        this.categoryName = this.navParams.get('categoryname');
        console.log(this.ulbName);
        this.getULB();
    };
    StockPage.prototype.getULB = function () {
        var _this = this;
        var data = {
            categoryid: String(this.categoryId)
        };
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.webServices.post(data, "subcategoryService.html").subscribe(function (getData) {
            loader.dismiss();
            console.log(getData);
            _this.subcategoriesList = getData.subcategories;
            var sortArray = [];
            for (var data_1 in _this.subcategoriesList) {
                if (_this.subcategoriesList[data_1].subcategoryname != 'noSubcategory') {
                    //console.log(this.subcategoriesList[data].subcategoryname.split('W'));
                    sortArray.push(_this.subcategoriesList[data_1].subcategoryname.split('W')[0]);
                }
            }
            sortArray = sortArray.sort(function (a, b) { return a - b; });
            // console.log(sortArray);
            var tempList = [];
            tempList.push(_this.subcategoriesList[0]);
            for (var data_2 in sortArray) {
                for (var data1 in _this.subcategoriesList) {
                    if (_this.subcategoriesList[data1].subcategoryname.split('W')[0] == sortArray[data_2]) {
                        tempList.push(_this.subcategoriesList[data1]);
                    }
                }
                //console.log(sortArray[data]);
            }
            _this.subcategoriesList = tempList;
            console.log(tempList);
        }, function (err) {
            loader.dismiss();
            _this.helper.presentToast(err, "error");
        });
    };
    StockPage.prototype.openstocklist = function (data) {
        this.navCtrl.push(StocklistPage, { categoryname: this.categoryName, subcategoryid: data.id, ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName });
    };
    StockPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    StockPage = __decorate([
        Component({
            selector: 'page-stock',
            templateUrl: 'stock.html',
        }),
        __metadata("design:paramtypes", [LoadingController,
            NavController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider])
    ], StockPage);
    return StockPage;
}());
export { StockPage };
//# sourceMappingURL=stock.js.map