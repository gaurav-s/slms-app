import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,Events, AlertController } from 'ionic-angular';
import { OpencomplaintslistPage } from '../../pages/opencomplaintslist/opencomplaintslist';
import { NewcomplaintPage } from '../../pages/newcomplaint/newcomplaint';
import { CategoryPage } from '../../pages/category/category';
import { ManpowerdetailsPage } from '../../pages/manpowerdetails/manpowerdetails';
import { AddpaymentPage } from '../../pages/addpayment/addpayment';
import { AddfollowPage } from '../../pages/addfollow/addfollow';
import { AddpayPage } from '../../pages/addpay/addpay';

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
  selector: 'page-paymentsdetails',
  templateUrl: 'paymentsdetails.html',
})
export class PaymentsdetailsPage {
  
  list:string='details';
  ulb:string='';
  categoryId:any;
  categoryName:any;
  ulbName:any;
  ulbId:any;
  options:any;
  maxDate:any;
  receivedPayment:any=[];
  followuplist:any=[];

  payment: {
    followupdate?: any;
    invoiceamount?: any;
    invoicedate?: any;
    invoiceno?: any;
    masterid?: any;
    paymentMasterId?:any;
    remarks?: any;
    status?: any;
    totalreceivedamt?: any;
    type?: any;
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
    public events:Events,
    public alertCtrl: AlertController) {

     let currentDate = new Date();

      var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      var day = ("0" + (currentDate.getDate())).slice(-2);
      var year = currentDate.getFullYear();

      this.maxDate = String(year+'-'+month+'-'+day);


  }

  ionViewDidLoad() {

  	this.categoryId = this.navParams.get('categoryid');
  	this.payment = this.navParams.get('payment');
  	this.ulbName = this.navParams.get('ulbname');
    this.ulbId = this.navParams.get('ulbid');
    this.payment.paymentMasterId = this.payment.masterid;
    this.payment.pendingAmount = Number(this.payment.invoiceamount)-Number(this.payment.totalreceivedamt);
    console.log('this.payment==',this.payment);

    this.events.subscribe('update-followup', (paramsVar) => {
           
            // Do stuff with "paramsVar"
            this.list = 'follow';
            this.followList();
          

            //this.events.unsubscribe('update-followup'); // unsubscribe this event
    })

    this.events.subscribe('update-payment', (paramsVar) => {
            // Do stuff with "paramsVar"
          
            console.log('receiveamount==',paramsVar);
            this.payment.totalreceivedamt = Number(this.payment.totalreceivedamt)+Number(paramsVar);
            this.payment.pendingAmount = Number(this.payment.pendingAmount)-Number(paramsVar);
            this.list = 'amount';
           this.receivedPaymentList();
            //this.events.unsubscribe('update-followup'); // unsubscribe this event
    })

  }

  openComplaint(){
  	this.navCtrl.push(OpencomplaintslistPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName});
  }

    openmanpowerdetails(){
    this.navCtrl.push(ManpowerdetailsPage);
  }

    openaddpayment(){
    this.navCtrl.push(AddpaymentPage);
  }

    openaddpay(){

      console.log('addpay');
    this.navCtrl.push(AddpayPage,{pendingamount:this.payment.pendingAmount,invoiceamount:this.payment.invoiceamount,paymentMasterId:this.payment.paymentMasterId,lbid:this.ulbId,ulbname:this.ulbName,categoryname:this.categoryName});
  }
    openaddfollow(){

    this.navCtrl.push(AddfollowPage,{paymentMasterId:this.payment.paymentMasterId,lbid:this.ulbId,ulbname:this.ulbName,categoryname:this.categoryName});
  }

  newComplaint(){
    console.log('newComplaint===');
  	this.navCtrl.push(NewcomplaintPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName,categoryname:this.categoryName});
  }

  goback() {
     
     this.navCtrl.pop();    
  }

  receivedPaymentList(){

     let loader = this.loadingCtrl.create({
            content: "Please wait..."
          });

          loader.present();

          let data ={

            paymentmasterid:this.payment.paymentMasterId
          }

          this.webServices.post(data, "receivedPaymentListService.html").subscribe(
            getData => {
              
              loader.dismiss();    
              console.log(getData);  

                this.receivedPayment = getData.receivedpaymentlist
               //this.helper.presentToast(getData.msg, "error");
               console.log(this.receivedPayment);
            },
            err => {

              loader.dismiss();
              console.log('inininokokokook');
              console.log(err);

              // console.log(err.statusText);
              //this.helper.presentToast(err, "error");
            }
          );

    //receivedPaymentListService.html
  }

  followList(){

          let loader = this.loadingCtrl.create({
            content: "Please wait..."
          });

          loader.present();

          let data ={

            paymentmasterid:this.payment.paymentMasterId
          }

          this.webServices.post(data, "followuplistservice.html").subscribe(
            getData => {
              
              loader.dismiss();    
              console.log(getData);  

                this.followuplist = getData.followuplist
               //this.helper.presentToast(getData.msg, "error");
               console.log(this.followuplist);
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

  updatePayment(){


          //console.log('this.complaintDate===',this.addPayment);
           console.log(this.payment.totalreceivedamt,this.payment.invoiceamount)
           if(Number(this.payment.totalreceivedamt)<Number(this.payment.invoiceamount)&&this.payment.status=='paid'){

               let confirm = this.alertCtrl.create({
                  title: 'Alert?',
                  message: 'Are you sure you want to mark this invoice paid?',
                  buttons: [
                    {
                      text: 'No',
                      handler: () => {
                        console.log('Disagree clicked');
                      }
                    },
                    {
                      text: 'Yes',
                      handler: () => {
                        console.log('Agree clicked');
                        this.payment.status='paid';
                        this.updateInvoice();
                      }
                    }
                  ]
                });
                confirm.present();
              // this.helper.presentToast(getData.msg, "error");
               
           }else{

              this.updateInvoice();
           }

           
  }

  updateInvoice(){

    console.log('inini');
              let loader = this.loadingCtrl.create({
                content: "Please wait..."
              });

            loader.present();

            let data ={
              status:this.payment.status,
              paymentmasterid:this.payment.paymentMasterId
            }

            this.webServices.post(data, "updateInvoiceService.html").subscribe(
              getData => {
                
                loader.dismiss();    
                console.log(getData);  

                if(getData.result=='success'){

                  this.helper.presentToast(getData.msg, "error");
                  this.navCtrl.pop().then(() => {
                  // Trigger custom event and pass data to be send back
                  console.log('manpower=====');
                 // this.events.publish('update-paymentlist', '');
                });
                   
                 // this.list = 'amount';
                 // this.receivedPaymentList();

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
