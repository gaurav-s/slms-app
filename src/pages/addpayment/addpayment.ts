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
  selector: 'page-addpayment',
  templateUrl: 'addpayment.html',
})
export class AddpaymentPage {
  
  list:string='currrentlist';
  ulb:string='';
  categoryId:any;
  categoryName:any;
  ulbName:any;
  ulbId:any;
  options:any;
  maxDate:any;

  addPayment: {
    invoiceDate?: any;
    invoiceDate1?: any;
    ulbId?: any;
    invoiceNo?: any;
    invoiceAmount?: any;
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

  	this.categoryId = this.navParams.get('categoryid');
  	this.categoryName = this.navParams.get('categoryname');
  	this.ulbName = this.navParams.get('ulbname');
    this.ulbId = this.navParams.get('ulbid');
    this.addPayment.ulbId = String(this.navParams.get('ulbid'));

     console.log('this.navParams.get',this.navParams.get('ulbid'));

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

  createInvoice(){

      if(this.addPayment.invoiceDate1==undefined){

       this.helper.presentToast("You must include invoiceDate.", "error");

    }else if(this.addPayment.invoiceNo==undefined){

       this.helper.presentToast("You must include invoiceNo.", "error");

    }
    else if(  /[^a-zA-Z0-9]/.test( this.addPayment.invoiceNo ) ){

      this.helper.presentToast("Invoice number is not alphanumeric.", "error");

    }else if(this.addPayment.invoiceAmount==undefined){

       this.helper.presentToast("You must include invoice amount.", "error");

    }else{

          console.log('this.complaintDate===',this.addPayment);

          let loader = this.loadingCtrl.create({
            content: "Please wait..."
          });

          loader.present();

          this.addPayment.invoiceDate = this.addPayment.invoiceDate1.split('-');
          this.addPayment.invoiceDate = this.addPayment.invoiceDate[2]+'-'+this.addPayment.invoiceDate[1]+'-'+this.addPayment.invoiceDate[0];

          console.log(this.addPayment);

          this.webServices.post(this.addPayment, "addInvoiceService.html").subscribe(
            getData => {
              
              loader.dismiss();    
              console.log(getData);  

              if(getData.result=='success'){

                this.navCtrl.pop().then(() => {
                  // Trigger custom event and pass data to be send back
                  console.log('manpower=====');
                  this.events.publish('update-paymentlist', this.addPayment);
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
