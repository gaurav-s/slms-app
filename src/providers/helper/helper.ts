import { Injectable } from "@angular/core";
import { Events, ToastController, ActionSheetController } from "ionic-angular";
import { StorageProvider } from "../storage/storage";
import { Network } from "@ionic-native/network";

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {
  data: any;
  previousStatus:string='online';

  constructor(  
  	public events: Events,
    public toastCtrl: ToastController,
    public userData: StorageProvider,
    public actionSheetCtrl: ActionSheetController,
    public network: Network) {
    this.checkDisconnect();
  }

  checkDisconnect() {

    

    this.network.onDisconnect().subscribe(() => {
      // console.log('network was disconnected :-(');
      if(this.previousStatus=='online'){

           let toast = this.toastCtrl.create({
            message: "Cannot reach Network",
            duration: 3000,
            position: "bottom",
            cssClass: 'error'
          });

          toast.present();
      }

      this.previousStatus = 'offline';
     

    });

    this.network.onConnect().subscribe(() => {
            this.previousStatus ='online';
            console.log('connect network==============================');

        });

  }

    getError(data) {
    let error_msg = "";
    for (var key in data) {
      error_msg = error_msg + data[key];
    }
    return error_msg;
  }

  presentToast(msg, classname) {
   // debugger
    if (typeof msg == "string") {
      this.showMsg(msg, classname);
    } else {
      console.log(msg);
      console.log("msg-----" + msg.status);

      if (msg.status == 0) {
        // this.showMsg(msg,classname);
        // let connectSubscription = this.network.onConnect().subscribe((Network) => {
        //   setTimeout(() => {
        //     console.log('Network.type'+Network.type);
        //     if (Network.type === 'none') {
        //       msg = 'Network was disconnected :-(';
        //     }else{
        //       msg = 'server is down plz try again later';
        //     }
        //     this.showMsg(msg,classname);
        //   }, 3000);
        // });
        // stop connect watch
        //connectSubscription.unsubscribe();
      } else if (msg.status == 401) {
        msg = "Unauthorized user.Please login again";
        this.userData.logout();
        this.showMsg(msg, classname);
      } else if (msg.status == 400) {
        msg = "Unauthorized user.Please login again";
        this.userData.logout();
        this.showMsg(msg, classname);
      } else if (msg.status == 500) {
        msg = "server error";
        this.showMsg(msg, classname);
      } else {
        msg = msg.status;
        this.showMsg(msg, classname);
      }
    }
  }

  showMsg(msg, classname) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "top",
      cssClass: classname
    });

    toast.present();
  }


}
