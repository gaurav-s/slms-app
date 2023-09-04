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
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
import { ComplaintdetailsPage } from '../../pages/complaintdetails/complaintdetails';
var OpencomplaintslistPage = /** @class */ (function () {
    function OpencomplaintslistPage(loadingCtrl, navCtrl, navParams, userData, webServices, helper, events) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.webServices = webServices;
        this.helper = helper;
        this.events = events;
        this.compalaintList = [];
        this.currentpage = 0;
        this.hasMoreData = true;
        this.Isloading = true;
    }
    OpencomplaintslistPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad CategoryPage');
        this.ulbId = this.navParams.get('ulbid');
        this.categoryId = this.navParams.get('categoryid');
        this.ulbName = this.navParams.get('ulbname');
        console.log('this.categoryId===', this.navParams);
        this.events.subscribe('update-complaint', function (paramsVar) {
            // Do stuff with "paramsVar"
            console.log(paramsVar);
            _this.compalaintList = [];
            _this.currentpage = 0;
            _this.getComplaints();
            //this.events.unsubscribe('custom-user-events'); // unsubscribe this event
        });
        this.getComplaints();
    };
    OpencomplaintslistPage.prototype.goback = function () {
        this.navCtrl.pop();
    };
    OpencomplaintslistPage.prototype.doInfinite = function (infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        this.currentpage = this.currentpage + 1;
        this.getComplaints();
    };
    OpencomplaintslistPage.prototype.getComplaints = function () {
        var _this = this;
        var data = {
            page: String(this.currentpage),
            count: String(100),
            search: '',
            ulbid: String(this.ulbId),
            category: String(this.categoryId)
        };
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        if (this.compalaintList.length == 0) {
            loader.present();
        }
        this.Isloading = false;
        console.log(data);
        this.webServices.post(data, "compalaintlistservice.html").subscribe(function (getData) {
            loader.dismiss();
            _this.Isloading = true;
            console.log(getData);
            if (getData.complaintlist.length > 0) {
                _this.compalaintList = _this.compalaintList.concat(getData.complaintlist);
            }
            else {
                _this.hasMoreData = false;
            }
            if (_this.infiniteScroll) {
                _this.infiniteScroll.complete();
            }
        }, function (err) {
            if (loader) {
                loader.dismiss();
            }
            _this.helper.presentToast(err, "error");
            if (_this.infiniteScroll) {
                _this.infiniteScroll.complete();
            }
        });
    };
    OpencomplaintslistPage.prototype.openViewComplaint = function (data) {
        console.log('data===', data);
        this.navCtrl.push(ComplaintdetailsPage, { ulbid: this.ulbId, categoryId: this.categoryId, id: data.id, ulbname: this.ulbName });
    };
    OpencomplaintslistPage = __decorate([
        Component({
            selector: 'page-opencomplaintslist',
            templateUrl: 'opencomplaintslist.html'
        }),
        __metadata("design:paramtypes", [LoadingController,
            NavController,
            NavParams,
            StorageProvider,
            WebservicesProvider,
            HelperProvider,
            Events])
    ], OpencomplaintslistPage);
    return OpencomplaintslistPage;
}());
export { OpencomplaintslistPage };
//# sourceMappingURL=opencomplaintslist.js.map