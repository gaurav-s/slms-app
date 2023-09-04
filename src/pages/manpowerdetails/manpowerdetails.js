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
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the ComplaintmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ManpowerdetailsPage = /** @class */ (function () {
    function ManpowerdetailsPage(navCtrl, loadingCtrl, navParams, userData, webServices, helper, events) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.events = events;
        this.list = 'currrentlist';
        this.ulb = '';
        //ulbId":"9","manpowerDate":"16-03-2018","vendorManpowerLED":"1","ulbResourceLED":"11","vendorManpowerCCMS":"2","ulbResourceCCMS":"22"
        this.manPower = {};
        this.manPower.manpowerDate = this.navParams.get('date');
        this.ulbName = this.navParams.get('ulbname');
        this.manPower.ulbId = String(this.navParams.get('ulbid'));
    }
    ManpowerdetailsPage.prototype.ionViewDidLoad = function () {
        // this.getRectified();
        console.log('ionViewDidLoad ComplaintmenuPage', this.date);
    };
    ManpowerdetailsPage.prototype.openComplaint = function () {
        this.navCtrl.push(OpencomplaintslistPage, { ulbid: this.ulbId, ulbname: this.ulbName });
    };
    ManpowerdetailsPage.prototype.newComplaint = function () {
        console.log('newComplaint===');
        this.navCtrl.push(NewcomplaintPage, { ulbid: this.ulbId, ulbname: this.ulbName, categoryname: this.categoryName });
    };
    ManpowerdetailsPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    ManpowerdetailsPage.prototype.createManpower = function () {
        // this.navCtrl.push(ComplaintmenuPage,{categoryid: this.categoryId, categoryname: this.categoryName, ulbname: this.ulbName, ulbid: this.ulbId});
        var _this = this;
        if (this.manPower.vendorManpowerLED == undefined) {
            this.helper.presentToast(" You must include Vendor Manpower LED.", "error");
        }
        else if (this.manPower.vendorManpowerCCMS == undefined) {
            this.helper.presentToast(" You must include Vendor Manpower CCMS.", "error");
        }
        else if (this.manPower.ulbResourceLED == undefined) {
            this.helper.presentToast(" You must include ULB Manpower LED.", "error");
        }
        else if (this.manPower.ulbResourceCCMS == undefined) {
            this.helper.presentToast(" You must include ULB Manpower CCMS", "error");
        }
        else {
            console.log('this.complaintDate===', this.manPower);
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader_1.present();
            console.log(this.manPower);
            this.webServices.post(this.manPower, "saveManpowerService.html").subscribe(function (getData) {
                loader_1.dismiss();
                console.log(getData);
                if (getData.result == 'success') {
                    _this.navCtrl.pop().then(function () {
                        // Trigger custom event and pass data to be send back
                        console.log('manpower=====');
                        _this.events.publish('update-manpower', _this.manPower);
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
    ManpowerdetailsPage = __decorate([
        Component({
            selector: 'page-manpowerdetails',
            templateUrl: 'manpowerdetails.html',
        }),
        __metadata("design:paramtypes", [NavController,
            LoadingController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider,
            Events])
    ], ManpowerdetailsPage);
    return ManpowerdetailsPage;
}());
export { ManpowerdetailsPage };
//# sourceMappingURL=manpowerdetails.js.map