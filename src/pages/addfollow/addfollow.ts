import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,Events } from 'ionic-angular';
import { OpencomplaintslistPage } from '../../pages/opencomplaintslist/opencomplaintslist';
import { NewcomplaintPage } from '../../pages/newcomplaint/newcomplaint';
import { CategoryPage } from '../../pages/category/category';
import { ManpowerdetailsPage } from '../../pages/manpowerdetails/manpowerdetails';


import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the ComplaintmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-addfollow',
  templateUrl: 'addfollow.html',
})
export class AddfollowPage {
  
  list:string='currrentlist';
  ulb:string='';
  categoryId:any;
  categoryName:any;
  ulbName:any;
  ulbId:any;
  options:any;
  maxDate:any;
  paymentMasterId:any;
  receivedPayment:any;

  followup: {
    date1?:any;
    date?: any;
    remarks?: any;
  }= {

  };

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public webServices: WebservicesProvider,
    public helper: HelperProvider,
    public events: Events) {

      console.log('linketofollow=====');
      console.log('followup====',this.followup);
    }

    ionViewDidLoad() {


    	this.ulbName = this.navParams.get('ulbname');
      this.ulbId = this.navParams.get('ulbid');
      this.paymentMasterId = this.navParams.get('paymentMasterId');

       let currentDate = new Date();

        var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        var day = ("0" + (currentDate.getDate())).slice(-2);
        var year = currentDate.getFullYear();

        this.maxDate = String(year+'-'+month+'-'+day);

    }


  openComplaint(){
    
  	this.navCtrl.push(OpencomplaintslistPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName});
  }

  addFollow(){

           if(this.followup.date1==undefined){

             this.helper.presentToast("You must include date.", "error");

          }else if(this.followup.remarks==undefined){

             this.helper.presentToast("You must include remarks.", "error");

          }else{

                let loader = this.loadingCtrl.create({
                  content: "Please wait..."
                });

                loader.present();
                console.log(this.followup);

                this.followup.date = this.followup.date1.split('-');
                this.followup.date = this.followup.date[2]+'-'+this.followup.date[1]+'-'+this.followup.date[0];


                let data ={
                  paymentMasterId:this.paymentMasterId,
                  followupDate:this.followup.date,
                  remarks:this.followup.remarks
                }

                this.webServices.post(data, "addFollowupService.html").subscribe(
                  getData => {
                    
                      loader.dismiss();    
                      console.log(getData);  
                      this.navCtrl.pop().then(() => {
                  // Trigger custom event and pass data to be send back
                  console.log('manpower=====');
                  this.events.publish('update-followup', "");
                });

                     this.helper.presentToast(getData.msg, "error");
                  },
                  err => {

                    loader.dismiss();
                    console.log('inininokokokook');
                    console.log(err);

                    // console.log(err.statusText);
                    //this.helper.presentToast(err, "error");
                  }
                );
          }

         
  }

  goback() {
     
     this.navCtrl.pop();    
  }

}
