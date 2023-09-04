import { Injectable } from "@angular/core";

import { Events } from "ionic-angular";
import { Storage } from "@ionic/storage";

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
  
  getData: any;
  HAS_LOGGED_IN = "hasLoggedIn";

  constructor(
    public events: Events,
    public storage: Storage
  ) {
    this.getCurrentUser();
  }

  setUserData(value) {
    if (value) {
      if (value.token) {
        this.getData = value;
        this.storage.set("userData", value);
      } else {
        // value.token = this.getUserData().token;
        this.getData = value;
        this.storage.set("userData", value);
      }
    }
  }

  getUserData() {
    return this.getData;
  }

  getCurrentUser() {
    return this.storage.get("userData").then(value => {
      this.setUserData(value);
      console.log(value);
      return value;
    });
  }

  login(userData) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set("userData", userData);
    this.setUserData(userData);
    //this.events.publish("user:login", userData);
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove("userData");
    this.getData = null;

  }

  setCurrentUser(userData) {
    this.storage.set("userData", userData);
  }

}
