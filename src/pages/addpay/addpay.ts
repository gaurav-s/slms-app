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
  selector: 'page-addpay',
  templateUrl: 'addpay.html',
})
export class AddpayPage {
  
  list:string='currrentlist';
  ulb:string='';
  categoryId:any;
  categoryName:any;
  ulbName:any;
  ulbId:any;
  options:any;
  maxDate:any;

  payment: {
   
    invoiceAmount?: any;
    paymentMasterId?:any;
    status?: any;
    receivedDate1?:any;
    receivedDate?:any;
    receivedAmount?:any;
    pendingAmount?:any;
  } = {

  };

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public webServices: WebservicesProvider,
    public helper: HelperProvider,
    public events:Events) {

      let currentDate = new Date();

      var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      var day = ("0" + (currentDate.getDate())).slice(-2);
      var year = currentDate.getFullYear();

      this.maxDate = String(year+'-'+month+'-'+day);

  }

  ionViewDidLoad() {

      this.ulbName = this.navParams.get('ulbname');
      this.ulbId = this.navParams.get('ulbid');
      this.payment.paymentMasterId = this.navParams.get('paymentMasterId');
      this.payment.invoiceAmount  = this.navParams.get('invoiceamount');
      this.payment.pendingAmount  = this.navParams.get('pendingamount');
      
      this.payment.status  = 'Unpaid';
      
     console.log('this.navParams.get',this.payment);

  }


  openComplaint(){
    
  	this.navCtrl.push(OpencomplaintslistPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName});
  }

  openmanpowerdetails(){
    this.navCtrl.push(ManpowerdetailsPage);
  }

  newComplaint(){
    console.log('newComplaint===');
  	this.navCtrl.push(NewcomplaintPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName,categoryname:this.categoryName});
  }

  goback() {
     
     this.navCtrl.pop();    
  }

  updatePayment(){


          console.log('this.complaintDate===',this.payment.receivedAmount,this.payment.pendingAmount);
           if(this.payment.receivedAmount==undefined){

             this.helper.presentToast("You must include received amount.", "error");

          }else if(this.payment.receivedDate1==undefined){

             this.helper.presentToast("You must include received date.", "error");

          }else if(this.payment.receivedAmount>this.payment.pendingAmount){

               this.helper.presentToast("Payment amount cannot be greater than invoice amount.", "error");

          }else{

            let loader = this.loadingCtrl.create({
              content: "Please wait..."
            });

            loader.present();

            this.payment.receivedDate = this.payment.receivedDate1.split('-');
            this.payment.receivedDate = this.payment.receivedDate[2]+'-'+this.payment.receivedDate[1]+'-'+this.payment.receivedDate[0];

            this.webServices.post(this.payment, "addReceivedPaymentService.html").subscribe(
            getData => {
              
              loader.dismiss();    
              console.log(getData);  

              if(getData.result=='success'){

                this.helper.presentToast(getData.msg, "error");
               

                 this.navCtrl.pop().then(() => {
                  // Trigger custom event and pass data to be send back
                  console.log('manpower=====');
                  
                  this.events.publish('update-payment', this.payment.receivedAmount);
                });

              }else{

                this.helper.presentToast(getData.msg, "error");
              }
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

}
