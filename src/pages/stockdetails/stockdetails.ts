import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController } from 'ionic-angular';
import { OpencomplaintslistPage } from '../../pages/opencomplaintslist/opencomplaintslist';
import { NewcomplaintPage } from '../../pages/newcomplaint/newcomplaint';
import { CategoryPage } from '../../pages/category/category';

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
  selector: 'page-stockdetails',
  templateUrl: 'stockdetails.html',
})
export class StockdetailsPage {
  
  list:string='currrentlist';
  ulb:string='';
  categoryId:any;
  categoryName:any;
  ulbName:any;
  ulbId:any;
  options:any;
  subcategoryid:any;
  maxDate:any;
  maxstockdate:any;
  spareName:any;
  subcategoryName: any;
  addStock: {
    ulbId?:any;
    stockDate?: any;
    stockDate1?: any;
    categoryId?: any;
    subcategoryId?: any;
    spareMasterId?: any;
    stock?: any;
    stockIn?: any;
    stockin?:any;
    stockmasterid?:any;
    
  } = {};

  Isupdatestock:boolean=false;
  currentDate:any;

  stockList: {
   
    stock?: any;
    stockIn?: any;
    stockMasterId?:any;
  } = {};

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public webServices: WebservicesProvider,
    public helper: HelperProvider) {

    

  }

  ionViewDidLoad() {

    this.ulbName = this.navParams.get('ulbname');
    this.subcategoryName = this.navParams.get('subcategoryName');
    this.spareName = this.navParams.get('sparename');
   
    this.addStock.categoryId = String(this.navParams.get('categoryid'));
    this.addStock.subcategoryId = String(this.navParams.get('subcategoryid'));
    this.addStock.spareMasterId = String(this.navParams.get('sparemasterid'));
    this.addStock.ulbId=  String(this.navParams.get('ulbid'));
    

    debugger

      this.getStock();
    console.log('ionViewDidLoad ComplaintmenuPage');

  }

  getStock(){

      let data={
        categoryid:String(this.addStock.categoryId),
        subcategoryid:String(this.addStock.subcategoryId),
        spareid:String(this.addStock.spareMasterId),
        ulbid:String( this.addStock.ulbId),
       
      }

      let loader = this.loadingCtrl.create({
          content: "Please wait..."
      });

      loader.present();

      this.webServices.post(data, "getMaxStockdateRecordService.html").subscribe(
          getData => {
            
            loader.dismiss();
              let currentDate1:any;
               let currentDate2:any;

            if(getData.maxstockdate){

                currentDate1 = new Date();

                var month = ("0" + (currentDate1.getMonth() + 1)).slice(-2);
                var day = ("0" + (currentDate1.getDate())).slice(-2);
                var year = currentDate1.getFullYear();

                this.maxstockdate = getData.maxstockdate;

                var date1 = String(year+'-'+month+'-'+day);
                var date2 = String(this.maxstockdate.split('-')[2]+'-'+this.maxstockdate.split('-')[1]+'-'+this.maxstockdate.split('-')[0]);
                
                console.log('date1==',date1,'date2===',date2);
                if(date1!=date2){

                  this.currentDate = String(year+'-'+month+'-'+day);

                  console.log(this.maxstockdate.split('-'));

                  currentDate1 = new Date(this.maxstockdate.split('-')[2],this.maxstockdate.split('-')[1],this.maxstockdate.split('-')[0]);
                  currentDate1.setDate(currentDate1.getDate()+1);

                  var month = ("0" + (currentDate1.getMonth())).slice(-2);
                  var day = ("0" + (currentDate1.getDate())).slice(-2);
                  var year = currentDate1.getFullYear();

                  this.maxDate = String(year+'-'+month+'-'+day); 
                }else{

                  
                  this.maxDate = String(year+'-'+month+'-'+day);

                  console.log(this.maxstockdate.split('-'));

                  currentDate1 = new Date(this.maxstockdate.split('-')[2],this.maxstockdate.split('-')[1],this.maxstockdate.split('-')[0]);
                  currentDate1.setDate(currentDate1.getDate());

                  var month = ("0" + (currentDate1.getMonth())).slice(-2);
                  var day = ("0" + (currentDate1.getDate())).slice(-2);
                  var year = currentDate1.getFullYear();

                  this.currentDate = String(year+'-'+month+'-'+day); 
              
                }
              
            }else{

            
                currentDate2 = new Date();

                var month = ("0" + (currentDate2.getMonth() + 1)).slice(-2);
                var day = ("0" + (currentDate2.getDate())).slice(-2);
                var year = currentDate2.getFullYear();

                this.currentDate = String(year+'-'+month+'-'+day);
                console.log('this.maxDate==',this.currentDate);

                currentDate2 = new Date();
                currentDate2.setMonth(currentDate2.getMonth()+1);
             // let currentDate = new Date(this.maxstockdate.split('-')[2],this.maxstockdate.split('-')[1],this.maxstockdate.split('-')[0]);
               currentDate2.setDate(currentDate2.getDate()-15);

                var month = ("0" + (currentDate2.getMonth())).slice(-2);
                var day = ("0" + (currentDate2.getDate())).slice(-2);
                var year = currentDate2.getFullYear();

                this.maxDate = String(year+'-'+month+'-'+day);  
                console.log('this.currentDate==',this.maxDate); 
            }

            this.stockList = getData.stocklist;
            
            console.log(getData);
            console.log(this.stockList);

          },
          err => {

            loader.dismiss();
            this.helper.presentToast(err, "error");

          });
    }

    dateChange(date){

      var selectdate = date.split('-');
      selectdate = selectdate[2]+'-'+selectdate[1]+'-'+selectdate[0];
      this.Isupdatestock = false;

      if(selectdate==this.maxstockdate){

          if(this.stockList){

            this.addStock.stockIn =String(this.stockList.stockIn);
            this.addStock.stock =String(this.stockList.stock);
            this.addStock.stockmasterid =String(this.stockList.stockMasterId);
            this.Isupdatestock = true;

          }else{

            this.addStock.stockIn =String(0);
            this.addStock.stock =String(0);
          }
          
      }else{

      }

    }
  
  createStock(){

      if(this.addStock.stockDate1==undefined){

       this.helper.presentToast("You must include stockDate.", "error");

    }else if(this.addStock.stockIn==undefined){

       this.helper.presentToast("You must include stockIn.", "error");

    }else if(this.addStock.stock==undefined){

       this.helper.presentToast("You must include stock.", "error");

    }else{

          console.log('this.complaintDate===',this.addStock);

          if(this.Isupdatestock&&(this.addStock.stockIn!=this.stockList.stockIn||this.addStock.stock!=this.stockList.stock)){

              this.addStock.stockin = this.addStock.stockIn;
              this.stockUpdate();
          }else{

              this.stockInsert();
          }
          
    }

  }

  stockInsert(){

    let loader = this.loadingCtrl.create({
            content: "Please wait..."
          });

          loader.present();

          this.addStock.stockDate = this.addStock.stockDate1.split('-');
          this.addStock.stockDate = this.addStock.stockDate[2]+'-'+this.addStock.stockDate[1]+'-'+this.addStock.stockDate[0];

          console.log('stockinsert==',this.addStock);

          this.webServices.post(this.addStock, "addStockService.html").subscribe(
            getData => {
              
              loader.dismiss();    
              console.log(getData);  

              if(getData.result=='success'){
                this.helper.presentToast(getData.msg, "error");
                this.navCtrl.pop().then(() => {
                  // Trigger custom event and pass data to be send back
                  console.log('manpower=====');
                  //this.events.publish('update-payment', this.addPayment);
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

  stockUpdate(){

          let loader = this.loadingCtrl.create({
            content: "Please wait..."
          });

          loader.present();

          this.addStock.stockDate = this.addStock.stockDate1.split('-');
          this.addStock.stockDate = this.addStock.stockDate[2]+'-'+this.addStock.stockDate[1]+'-'+this.addStock.stockDate[0];

          console.log('stockupdate==',this.addStock);
          this.webServices.post(this.addStock, "updateStockService.html").subscribe(
            getData => {
              
              loader.dismiss();    
              console.log(getData);  

              if(getData.result=='success'){
                this.helper.presentToast(getData.msg, "error");
                this.navCtrl.pop().then(() => {
                  // Trigger custom event and pass data to be send back
                  console.log('manpower=====');
                  //this.events.publish('update-payment', this.addPayment);
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

  openComplaint(){
    
  	this.navCtrl.push(OpencomplaintslistPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName});
  }

  newComplaint(){
console.log('newComplaint===');
  	this.navCtrl.push(NewcomplaintPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName,categoryname:this.categoryName});
  }

  goback() {
     
     this.navCtrl.pop();    
  }

}
