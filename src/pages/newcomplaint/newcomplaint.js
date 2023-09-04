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
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LoginPage } from '../login/login';
var NewcomplaintPage = /** @class */ (function () {
    function NewcomplaintPage(loadingCtrl, navCtrl, navParams, userData, webServices, helper, geolocation, nativeGeocoder, alertCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.alertCtrl = alertCtrl;
        this.wardList = [];
        this.multipleQty = [];
        this.ismultiple = false;
    }
    NewcomplaintPage.prototype.ionViewDidLoad = function () {
        this.ulbId = this.navParams.get('ulbid');
        this.categoryId = this.navParams.get('categoryid');
        this.ulbName = this.navParams.get('ulbname');
        this.categoryName = this.navParams.get('categoryname');
        this.remarks = '';
        this.quantity = '1';
        var currentDate = new Date();
        var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        // returns the day of the month (from 1 to 31)
        var day = ("0" + (currentDate.getDate())).slice(-2);
        // returns the year (four digits)
        var year = currentDate.getFullYear();
        console.log('currentDate', currentDate);
        this.maxDate = String(year + '-' + month + '-' + day);
        console.log('currentDate', this.maxDate);
        //categoryid: this.categoryId, categoryname: data.catehoryname, ulbname: this.ulbName, ulbid: this.ulbId
        // console.log('this.navParams',this.navParams);
        for (var i = 1; i <= 12; i++) {
            this.multipleQty.push(i);
        }
        console.log(this.multipleQty);
        this.getUlbService();
    };
    NewcomplaintPage.prototype.presentConfirm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '',
            message: 'Are you sure if the faults are on single pole?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        _this.ismultiple = false;
                        console.log('NO clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.ismultiple = true;
                        console.log('Yes clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    NewcomplaintPage.prototype.updateItem = function (item) {
        if (item) {
            this.presentConfirm();
        }
    };
    NewcomplaintPage.prototype.getUlbService = function () {
        var _this = this;
        var data = {
            'ulbid': String(this.ulbId),
            'category': String(this.categoryId)
        };
        console.log(data);
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.webServices.post(data, "ulbService.html").subscribe(function (getData) {
            loader.dismiss();
            _this.wardList = getData.wards;
            _this.componentList = getData.componenttype;
            _this.complaintList = getData.complainttype;
            _this.compaintmode = getData.compaintmode;
            //this.serviceList = getData.categories;
            console.log(getData);
        }, function (err) {
            loader.dismiss();
            console.log('err=====', err);
            _this.userData.logout();
            _this.navCtrl.setRoot(LoginPage);
            _this.helper.presentToast(err, "error");
        });
    };
    NewcomplaintPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    NewcomplaintPage.prototype.getLocation = function () {
        var _this = this;
        console.log('getlocation===123==sss=');
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loader.present();
        console.log('this.geolocation===', this.geolocation);
        this.geolocation.getCurrentPosition().then(function (resp) {
            // resp.coords.latitude
            // resp.coords.longitude
            console.log(resp.coords);
            _this.getCityName(resp.coords.latitude, resp.coords.longitude);
        }).catch(function (error) {
            _this.loader.dismiss();
            alert(error);
            console.log('Error getting location', error);
        });
    };
    NewcomplaintPage.prototype.getCityName = function (latitude, longitude) {
        var _this = this;
        console.log(latitude, longitude);
        this.nativeGeocoder.reverseGeocode(latitude, longitude)
            .then(function (result) {
            console.log(result);
            _this.location = result.subLocality + " " + result.locality + " " + result.subAdministrativeArea;
            //alert(JSON.stringify(result));
            _this.loader.dismiss();
        })
            .catch(function (error) {
            _this.loader.dismiss();
            console.log('errorr', error);
        });
    };
    NewcomplaintPage.prototype.createComplaint = function () {
        // this.navCtrl.push(ComplaintmenuPage,{categoryid: this.categoryId, categoryname: this.categoryName, ulbname: this.ulbName, ulbid: this.ulbId});
        var _this = this;
        console.log('wardNo', this.wardNo);
        console.log('complaintypeid', this.complaintypeid);
        console.log('componentypeid', this.componentypeid);
        console.log('complaintmodeid', this.complaintmodeid);
        console.log('complaintDate', this.complaintDate);
        console.log('location', this.location);
        console.log('poleNo', this.poleNo);
        console.log('remarks', this.remarks);
        console.log('quantity', this.quantity);
        this.componentypeid = '';
        if (this.wardNo == undefined) {
            this.helper.presentToast(" You must select ward.", "error");
        }
        else if (this.location == undefined) {
            this.helper.presentToast(" You must include location.", "error");
        }
        else if (this.poleNo == undefined) {
            this.helper.presentToast(" You must include poleNo.", "error");
        }
        else if (this.complaintypeid == undefined) {
            this.helper.presentToast(" You must select complaintype", "error");
        }
        else if (this.complaintmodeid == undefined) {
            this.helper.presentToast(" You must select complaintmode.", "error");
        }
        else if (this.complaintDate == undefined) {
            this.helper.presentToast("You must select complaintDate.", "error");
        }
        else {
            console.log('this.complaintDate===', this.complaintDate);
            var test = this.complaintDate.split('-');
            test = test[2] + '-' + test[1] + '-' + test[0];
            console.log('test===', test);
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader_1.present();
            var data = {
                ulbMasterid: String(this.ulbId),
                categoryid: String(this.categoryId),
                ismultiple: (this.ismultiple),
                wardNo: String(this.wardNo),
                complaintypeid: String(this.complaintypeid),
                componentypeid: String(this.componentypeid),
                complaintmodeid: String(this.complaintmodeid),
                complaintDate: String(test),
                location: String(this.location),
                poleNo: String(this.poleNo),
                remarks: String(this.remarks),
                quantity: String(this.quantity)
            };
            console.log(data);
            this.webServices.post(data, "saveComplaintService.html").subscribe(function (getData) {
                loader_1.dismiss();
                console.log(getData);
                if (getData.result == 'success') {
                    _this.navCtrl.pop();
                    // this.navCtrl.push(ComplaintmenuPage,{categoryid: this.categoryId, categoryname: this.categoryName, ulbname: this.ulbName, ulbid: this.ulbId});
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
    NewcomplaintPage = __decorate([
        Component({
            selector: 'page-newcomplaint',
            templateUrl: 'newcomplaint.html'
        }),
        __metadata("design:paramtypes", [LoadingController,
            NavController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider,
            Geolocation,
            NativeGeocoder,
            AlertController])
    ], NewcomplaintPage);
    return NewcomplaintPage;
}());
export { NewcomplaintPage };
//# sourceMappingURL=newcomplaint.js.map