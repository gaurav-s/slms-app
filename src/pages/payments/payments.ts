import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,Events } from 'ionic-angular';
import { OpencomplaintslistPage } from '../../pages/opencomplaintslist/opencomplaintslist';
import { NewcomplaintPage } from '../../pages/newcomplaint/newcomplaint';
import { CategoryPage } from '../../pages/category/category';
import { ManpowerdetailsPage } from '../../pages/manpowerdetails/manpowerdetails';
import { PaymentsdetailsPage } from '../../pages/paymentsdetails/paymentsdetails';
import { AddpaymentPage } from '../../pages/addpayment/addpayment';

import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the ComplaintmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {
  
  list:string='currrentlist';
  ulb:string='';
  categoryId:any;
  categoryName:any;
  ulbName:any;
  ulbId:any;
  options:any;
  invoiceList:any=[];
  isLoading:boolean=false;

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public webServices: WebservicesProvider,
    public helper: HelperProvider,
    public events: Events) {

    this.invoiceList=[];

     this.events.subscribe('update-paymentlist', (paramsVar) => {
            // Do stuff with "paramsVar"
            console.log(paramsVar);
            this.getPayment();
            //this.events.unsubscribe('custom-user-events'); // unsubscribe this event
    })
     
  }

  ionViewWillEnter() {

  	this.categoryId = this.navParams.get('categoryid');
  	this.categoryName = this.navParams.get('categoryname');
    console.log('categoryName====',this.categoryName);
  	this.ulbName = this.navParams.get('ulbname');
    this.ulbId = this.navParams.get('ulbid');

   
    this.getPayment();

  }


  getPayment(){

      let data={
        ulbid:String(this.ulbId),
        page:String(0),
        count:String(10),
      }

      let loader = this.loadingCtrl.create({
          content: "Please wait..."
      });

      loader.present();
      this.isLoading = false;
      console.log(data);
      this.webServices.post(data, "invoicelistservice.html").subscribe(
          getData => {
            debugger
            loader.dismiss();
            console.log(getData);
           this.isLoading = true;
            this.invoiceList = getData.invoicelist;

            
          },
          err => {

            this.isLoading = true;
            loader.dismiss();
            this.helper.presentToast(err, "error");

          });
    }

    logOut(){

    
      let data={
        
      }

      let loader = this.loadingCtrl.create({
          content: "Please wait..."
      });

      loader.present();

      this.webServices.post(data, "logout.php").subscribe(
          getData => {
            
            loader.dismiss();
            console.log(getData);
            this.userData.logout();
            this.navCtrl.setRoot(LoginPage);

          },
          err => {

            loader.dismiss();
            //this.helper.presentToast(err, "error");

          });
    

  }


  openComplaint(){
    
  	this.navCtrl.push(OpencomplaintslistPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName});
  }

  openmanpowerdetails(){
    this.navCtrl.push(ManpowerdetailsPage);
  }

  openpaymentdetails(data){
    this.navCtrl.push(PaymentsdetailsPage,{ulbid:this.ulbId,payment:data,ulbname:this.ulbName});
  }

  openaddpayment(){
    this.navCtrl.push(AddpaymentPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName});
  }

  newComplaint(){
    console.log('newComplaint===');
  	this.navCtrl.push(NewcomplaintPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName,categoryname:this.categoryName});
  }

  goback() {
     
     this.navCtrl.pop();    
  }

}
