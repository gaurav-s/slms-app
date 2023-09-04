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
import { ComplaintmenuPage } from '../../pages/complaintmenu/complaintmenu';
import { ManpowerPage } from '../../pages/manpower/manpower';
import { PaymentsPage } from '../../pages/payments/payments';
import { MyreportsPage } from '../../pages/myreports/myreports';
/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CategoryPage = /** @class */ (function () {
    function CategoryPage(loadingCtrl, navCtrl, navParams, userData, webServices, helper) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.isLoading = false;
    }
    CategoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CategoryPage');
        this.ulbName = this.navParams.get('name');
        this.id = this.navParams.get('id');
        console.log(this.ulbName, this.id);
        this.getULB();
    };
    CategoryPage.prototype.getULB = function () {
        var _this = this;
        var data = {};
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.isLoading = false;
        this.webServices.post(data, "ulbCategoryService.html").subscribe(function (getData) {
            _this.isLoading = true;
            loader.dismiss();
            _this.categoryList = getData.categories;
        }, function (err) {
            _this.isLoading = true;
            loader.dismiss();
            _this.helper.presentToast(err, "error");
        });
    };
    CategoryPage.prototype.selectCategory = function (data) {
        console.log(data);
        this.navCtrl.push(ComplaintmenuPage, { categoryid: data.id, categoryname: data.catehoryname, ulbname: this.ulbName, ulbid: this.id });
    };
    CategoryPage.prototype.selectManpower = function () {
        this.navCtrl.push(ManpowerPage, { categoryname: 'Manpower', ulbname: this.ulbName, ulbid: this.id });
    };
    CategoryPage.prototype.selectpayment = function () {
        this.navCtrl.push(PaymentsPage, { categoryname: 'My Reports', ulbname: this.ulbName, ulbid: this.id });
    };
    CategoryPage.prototype.selectmyreports = function () {
        this.navCtrl.push(MyreportsPage, { categoryname: 'Invoice', ulbname: this.ulbName, ulbid: this.id });
    };
    CategoryPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    CategoryPage = __decorate([
        Component({
            selector: 'page-category',
            templateUrl: 'category.html',
        }),
        __metadata("design:paramtypes", [LoadingController,
            NavController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider])
    ], CategoryPage);
    return CategoryPage;
}());
export { CategoryPage };
//# sourceMappingURL=category.js.map