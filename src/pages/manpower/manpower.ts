import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,Events  } from 'ionic-angular';
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
  selector: 'page-manpower',
  templateUrl: 'manpower.html',
})
export class ManpowerPage {
  
  list:string='currrentlist';
  ulb:string='';
  categoryId:any;
  categoryName:any;
  ulbName:any;
  ulbId:any;
  options:any;
  manPowerList:any;
  submitDates:any=[];
  nonSubmitDates:any=[];
  isLoading:boolean=false;

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public webServices: WebservicesProvider,
    public helper: HelperProvider,
    private events: Events) {


    

  }

  ionViewDidLoad() {

  	this.categoryId = this.navParams.get('categoryid');
  	this.categoryName = this.navParams.get('categoryname');
  	this.ulbName = this.navParams.get('ulbname');
    this.ulbId = this.navParams.get('ulbid');
    this.list = 'notsubmitted';
    this.getList();

    this.events.subscribe('update-manpower', (paramsVar) => {
            // Do stuff with "paramsVar"
            console.log(paramsVar);
            this.getList();
            //this.events.unsubscribe('custom-user-events'); // unsubscribe this event
    })

    console.log('ionViewDidLoad ComplaintmenuPage');

  }

  getList(){

      console.log('getlis==');
      let data={
         ulbid:String(this.ulbId)
      }

      let loader = this.loadingCtrl.create({
          content: "Please wait..."
      });

      loader.present();

      this.webServices.post(data, "getManpowerSubmitDates.html").subscribe(
          getData => {
            
            loader.dismiss();
            this.isLoading=true;
            this.submitDates =[];
            this.nonSubmitDates =[];

           if(getData.submitNonSubmitDates){

             if(getData.submitNonSubmitDates[0].submitdates!=null){

                 this.submitDates = getData.submitNonSubmitDates[0].submitdates;

             }
             if(getData.submitNonSubmitDates[0].nonsubmitdates!=null){

                 this.nonSubmitDates = getData.submitNonSubmitDates[0].nonsubmitdates;
             }  
           } 
           
           console.log(this.submitDates);
           console.log(this.nonSubmitDates);
           console.log(getData);

      },err => {

         this.isLoading=true;
         loader.dismiss();
         this.helper.presentToast(err, "error");
         
       });

  }


  openComplaint(){
    
  	this.navCtrl.push(OpencomplaintslistPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName});
  }

    openmanpowerdetails(data){
    this.navCtrl.push(ManpowerdetailsPage,{ulbid:this.ulbId,date:data,ulbname:this.ulbName});
  }

  newComplaint(){
    console.log('newComplaint===');
  	this.navCtrl.push(NewcomplaintPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName,categoryname:this.categoryName});
  }

  goback() {
     
     this.navCtrl.pop();    
  }

}
