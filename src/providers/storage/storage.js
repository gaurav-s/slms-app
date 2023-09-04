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
import { Events } from "ionic-angular";
import { Storage } from "@ionic/storage";
/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var StorageProvider = /** @class */ (function () {
    function StorageProvider(events, storage) {
        this.events = events;
        this.storage = storage;
        this.HAS_LOGGED_IN = "hasLoggedIn";
        this.getCurrentUser();
    }
    StorageProvider.prototype.setUserData = function (value) {
        if (value) {
            if (value.token) {
                this.getData = value;
                this.storage.set("userData", value);
            }
            else {
                // value.token = this.getUserData().token;
                this.getData = value;
                this.storage.set("userData", value);
            }
        }
    };
    StorageProvider.prototype.getUserData = function () {
        return this.getData;
    };
    StorageProvider.prototype.getCurrentUser = function () {
        var _this = this;
        return this.storage.get("userData").then(function (value) {
            _this.setUserData(value);
            console.log(value);
            return value;
        });
    };
    StorageProvider.prototype.login = function (userData) {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.storage.set("userData", userData);
        this.setUserData(userData);
        //this.events.publish("user:login", userData);
    };
    StorageProvider.prototype.logout = function () {
        this.storage.remove(this.HAS_LOGGED_IN);
        this.storage.remove("userData");
        this.getData = null;
    };
    StorageProvider.prototype.setCurrentUser = function (userData) {
        this.storage.set("userData", userData);
    };
    StorageProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Events,
            Storage])
    ], StorageProvider);
    return StorageProvider;
}());
export { StorageProvider };
//# sourceMappingURL=storage.js.map