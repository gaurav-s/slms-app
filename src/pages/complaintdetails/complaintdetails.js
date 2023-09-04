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
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
var ComplaintdetailsPage = /** @class */ (function () {
    function ComplaintdetailsPage(loadingCtrl, navCtrl, navParams, userData, webServices, helper, events, alertCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.ismultiple = false;
        this.multipleQty = [];
    }
    ComplaintdetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CategoryPage');
        var currentDate = new Date();
        var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        // returns the day of the month (from 1 to 31)
        var day = ("0" + (currentDate.getDate())).slice(-2);
        // returns the year (four digits)
        var year = currentDate.getFullYear();
        this.maxDate = String(year + '-' + month + '-' + day);
        this.ulbName = this.navParams.get('ulbname');
        this.complaintmasterid = this.navParams.get('id');
        this.ulbId = this.navParams.get('ulbid');
        this.categoryId = this.navParams.get('categoryId');
        this.getComplaintsDetails();
    };
    ComplaintdetailsPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    ComplaintdetailsPage.prototype.getUlbService = function () {
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
            _this.componentList = getData.componenttype;
            //this.serviceList = getData.categories;
            console.log(getData);
        }, function (err) {
            loader.dismiss();
            console.log('err=====', err);
            _this.helper.presentToast(err, "error");
        });
    };
    ComplaintdetailsPage.prototype.onChange = function (status) {
        console.log('status===', status);
        if (status == 'ulb') {
        }
    };
    ComplaintdetailsPage.prototype.getComplaintsDetails = function () {
        var _this = this;
        var data = {
            complaintmasterid: String(this.complaintmasterid)
        };
        //console.log(data);
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.webServices.post(data, "compalaintdetailservice.html").subscribe(function (getData) {
            loader.dismiss();
            console.log(getData);
            _this.assignedTo = getData.assignedto;
            _this.wardNo = getData.wardno;
            _this.location = getData.location;
            _this.poleNo = getData.poleno;
            _this.complaintmodeid = getData.complaintmode;
            _this.complaintDate = getData.complaintDate;
            _this.componentType = getData.componenttype;
            _this.causeofcomplaint = getData.causeofcomplaint;
            _this.quantity = getData.quantity;
            _this.vendor = getData.vendor;
            _this.remarks = getData.remarks;
            _this.rectifiedqty = getData.rectifiedqty;
            _this.status = getData.status;
            console.log('this.assignedTo', _this.assignedTo);
            for (var i = 1; i <= _this.quantity; i++) {
                _this.multipleQty.push(i);
            }
            if (_this.remarks == 'undefined') {
                _this.remarks = '';
            }
            _this.oldremarks = _this.remarks;
            _this.getUlbService();
        }, function (err) {
            loader.dismiss();
            console.log(err);
            _this.helper.presentToast(err, "error");
        });
    };
    ComplaintdetailsPage.prototype.checkComplaint = function () {
        var _this = this;
        if (this.status == 'ulb') {
            var confirm_1 = this.alertCtrl.create({
                title: 'Alert?',
                message: 'Are you sure you want to transfer the complaint to ULB?',
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
                            _this.ulbToTransfer();
                        }
                    }
                ]
            });
            confirm_1.present();
        }
        else {
            this.updateComplaint();
        }
    };
    ComplaintdetailsPage.prototype.ulbToTransfer = function () {
        var _this = this;
        if (this.rectifiedDate == undefined) {
            this.helper.presentToast("You must include rectifiedDate.", "error");
        }
        else if (this.componentypemasterid == undefined) {
            this.helper.presentToast("You must select Complaint Cause.", "error");
        }
        else {
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader_1.present();
            var test;
            if (this.rectifiedDate) {
                test = this.rectifiedDate.split('-');
                test = test[2] + '-' + test[1] + '-' + test[0];
            }
            else {
                test = '';
            }
            var data = {
                complaintmasterid: String(this.complaintmasterid),
                remarks: this.remarks,
                rectifieddate: String(test),
                componentypemasterid: String(this.componentypemasterid),
                rectifiedqty: String(this.rectifiedqty),
                transfer: 'true',
                status: 'Not Rectified'
            };
            console.log(data);
            this.webServices.post(data, "transfertoUlbService.html").subscribe(function (getData) {
                loader_1.dismiss();
                console.log(getData);
                if (getData.result == 'success') {
                    _this.navCtrl.pop().then(function () {
                        // Trigger custom event and pass data to be send back
                        console.log('manpower=====');
                        _this.events.publish('update-complaint', '');
                    });
                    _this.helper.presentToast(getData.msg, "success");
                }
                else {
                    _this.helper.presentToast(getData.msg, "error");
                }
            }, function (err) {
                loader_1.dismiss();
                console.log('inininokokokook');
                console.log(err);
                console.log(err.statusText);
                _this.helper.presentToast(err, "error");
            });
        }
    };
    ComplaintdetailsPage.prototype.updateComplaint = function () {
        var _this = this;
        if (this.status == 'Rectified' || this.oldremarks != this.remarks) {
            if (this.rectifiedDate == undefined && this.status == 'Rectified') {
                this.helper.presentToast("You must include rectifiedDate.", "error");
            }
            else if (this.componentypemasterid == undefined && this.status == 'Rectified') {
                this.helper.presentToast("You must select Complaint Cause.", "error");
            }
            else {
                var loader_2 = this.loadingCtrl.create({
                    content: "Please wait..."
                });
                loader_2.present();
                var test;
                if (this.rectifiedDate) {
                    test = this.rectifiedDate.split('-');
                    test = test[2] + '-' + test[1] + '-' + test[0];
                }
                else {
                    test = '';
                }
                var data = {
                    complaintmasterid: String(this.complaintmasterid),
                    status: this.status,
                    remarks: this.remarks,
                    rectifieddate: String(test),
                    componentypemasterid: String(this.componentypemasterid),
                    rectifiedqty: String(this.rectifiedqty)
                };
                console.log(data);
                this.webServices.post(data, "updateComplaintService.html").subscribe(function (getData) {
                    loader_2.dismiss();
                    console.log(getData);
                    if (getData.msg == 'success') {
                        _this.navCtrl.pop().then(function () {
                            // Trigger custom event and pass data to be send back
                            console.log('manpower=====');
                            _this.events.publish('update-complaint', '');
                        });
                        _this.helper.presentToast(getData.msg, "success");
                    }
                    else {
                        _this.helper.presentToast(getData.msg, "error");
                    }
                }, function (err) {
                    loader_2.dismiss();
                    console.log('inininokokokook');
                    console.log(err);
                    console.log(err.statusText);
                    _this.helper.presentToast(err, "error");
                });
            }
        }
    };
    ComplaintdetailsPage = __decorate([
        Component({
            selector: 'page-complaintdetails',
            templateUrl: 'complaintdetails.html'
        }),
        __metadata("design:paramtypes", [LoadingController,
            NavController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider,
            Events,
            AlertController])
    ], ComplaintdetailsPage);
    return ComplaintdetailsPage;
}());
export { ComplaintdetailsPage };
//# sourceMappingURL=complaintdetails.js.map