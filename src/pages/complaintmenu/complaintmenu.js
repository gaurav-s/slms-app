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
import { StockPage } from '../../pages/stock/stock';
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the ComplaintmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ComplaintmenuPage = /** @class */ (function () {
    function ComplaintmenuPage(navCtrl, loadingCtrl, navParams, userData, webServices, helper) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.list = 'currrentlist';
        this.ulb = '';
    }
    ComplaintmenuPage.prototype.ionViewDidLoad = function () {
        this.categoryId = this.navParams.get('categoryid');
        this.categoryName = this.navParams.get('categoryname');
        this.ulbName = this.navParams.get('ulbname');
        this.ulbId = this.navParams.get('ulbid');
        this.getRectified();
        console.log('ionViewDidLoad ComplaintmenuPage');
    };
    ComplaintmenuPage.prototype.getRectified = function () {
        var _this = this;
        var data = {};
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.webServices.post(data, "rectifiedandnotrectifiedcountservice.html").subscribe(function (getData) {
            loader.dismiss();
            _this.getComplaintData();
            _this.options = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Total Complaints - Street light'
                },
                subtitle: {
                    text: 'Past 30 days'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Number of complaints'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> <br/>'
                },
                series: [{
                        name: 'Complaints',
                        colorByPoint: true,
                        data: [{
                                name: 'Rectified',
                                y: getData.rectified
                            },
                            {
                                name: 'Not Rectified',
                                y: getData.notrectified
                            }]
                    }]
            };
            console.log(getData);
        }, function (err) {
            loader.dismiss();
            _this.helper.presentToast(err, "error");
        });
    };
    ComplaintmenuPage.prototype.getComplaintData = function () {
        var _this = this;
        var data = {
            'ulbid': String(this.ulbId)
        };
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.webServices.post(data, "getComplaintDateRecordsService.html").subscribe(function (getData) {
            loader.dismiss();
            _this.complaintdatesCount = getData.complaintdatescount[0];
            var allcomplaints = [];
            var rectifiedcomplaints = [];
            for (var data_1 in _this.complaintdatesCount.allcomplaints) {
                var splitdate = _this.complaintdatesCount.allcomplaints[data_1].complaintdate.split('-');
                // console.log('splitdate==',splitdate);
                var complaintarray = [];
                splitdate[1] = splitdate[1] - 1;
                complaintarray[0] = Date.UTC(splitdate[2], splitdate[1], splitdate[0]);
                complaintarray[1] = Number(_this.complaintdatesCount.allcomplaints[data_1].complaintcount);
                allcomplaints.push(complaintarray);
            }
            for (var data_2 in _this.complaintdatesCount.rectifiedcomplaints) {
                var splitdate = _this.complaintdatesCount.rectifiedcomplaints[data_2].complaintdate.split('-');
                var complaintarray = [];
                splitdate[1] = splitdate[1] - 1;
                complaintarray[0] = Date.UTC(splitdate[2], splitdate[1], splitdate[0]);
                complaintarray[1] = Number(_this.complaintdatesCount.rectifiedcomplaints[data_2].complaintcount);
                rectifiedcomplaints.push(complaintarray);
            }
            _this.options1 = {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Complaints'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        month: '%e. %b',
                        year: '%b'
                    },
                    title: {
                        text: 'Date'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Complaints Count'
                    },
                    min: 0
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%e. %b}: {point.y:.2f} '
                },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
                // Define the data points. All series have a dummy year
                // of 1970/71 in order to be compared on the same x axis. Note
                // that in JavaScript, months start at 0 for January, 1 for February etc.
                series: [{
                        name: "All Complaints",
                        data: allcomplaints
                    }, {
                        name: "Rectified Complaints",
                        data: rectifiedcomplaints
                    }]
            };
            console.log(getData);
        }, function (err) {
            loader.dismiss();
            _this.helper.presentToast(err, "error");
        });
    };
    ComplaintmenuPage.prototype.openComplaint = function () {
        this.navCtrl.push(OpencomplaintslistPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName });
    };
    ComplaintmenuPage.prototype.openstock = function () {
        this.navCtrl.push(StockPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName, categoryname: this.categoryName });
    };
    ComplaintmenuPage.prototype.newComplaint = function () {
        this.navCtrl.push(NewcomplaintPage, { ulbid: this.ulbId, categoryid: this.categoryId, ulbname: this.ulbName, categoryname: this.categoryName });
    };
    ComplaintmenuPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    ComplaintmenuPage = __decorate([
        Component({
            selector: 'page-complaintmenu',
            templateUrl: 'complaintmenu.html',
        }),
        __metadata("design:paramtypes", [NavController,
            LoadingController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider])
    ], ComplaintmenuPage);
    return ComplaintmenuPage;
}());
export { ComplaintmenuPage };
//# sourceMappingURL=complaintmenu.js.map