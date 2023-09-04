var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Events } from "ionic-angular";
import { StorageProvider } from "../storage/storage";
import { serverDetails } from "../config/config";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
/*
  Generated class for the WebservicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var WebservicesProvider = /** @class */ (function () {
    function WebservicesProvider(http, user, events) {
        this.http = http;
        this.user = user;
        this.events = events;
        this.api = serverDetails.baseUrl;
    }
    WebservicesProvider.prototype.get = function (url) {
        this.currentUser = this.user.getUserData();
        if (this.currentUser == null) {
            this.currentUser = {};
            this.currentUser.token = "";
        }
        var favoritesURL = this.api + url;
        //console.log('favoritesURL');
        console.log(favoritesURL);
        //console.log(this.currentUser.access_token);
        var headers = new Headers({
            Authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json"
        });
        var options = new RequestOptions({ headers: headers });
        return this.http.get(favoritesURL, options).map(function (res) { return res.json(); });
    };
    WebservicesProvider.prototype.post = function (data, url) {
        this.currentUser = this.user.getUserData();
        if (this.currentUser == null) {
            this.currentUser = {};
            this.currentUser.token = "";
        }
        else {
            data.token = this.currentUser.token;
        }
        console.log('data1===', data);
        var favoritesURL = this.api + url;
        console.log('favoritesURL', favoritesURL);
        // let headers = new Headers({
        //     Authorization: "Bearer " + this.currentUser.token,
        //     "Content-Type": "application/json"
        //   });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(favoritesURL, data).map(function (res) { return res.json(); });
    };
    WebservicesProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            StorageProvider,
            Events])
    ], WebservicesProvider);
    return WebservicesProvider;
}());
export { WebservicesProvider };
//# sourceMappingURL=webservices.js.map