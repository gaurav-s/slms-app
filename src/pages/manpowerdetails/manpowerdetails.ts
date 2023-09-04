import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,Events } from 'ionic-angular';
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
  selector: 'page-manpowerdetails',
  templateUrl: 'manpowerdetails.html',
})
export class ManpowerdetailsPage {
  
  list:string='currrentlist';
  ulb:string='';
  date:any;
  categoryName:any;
  ulbName:any;
  ulbId:any;
  options:any;

//ulbId":"9","manpowerDate":"16-03-2018","vendorManpowerLED":"1","ulbResourceLED":"11","vendorManpowerCCMS":"2","ulbResourceCCMS":"22"
  manPower: {
    manpowerDate?: any;
    ulbId?: any;
    vendorManpowerLED?: string;
    ulbResourceLED?: string;
    vendorManpowerCCMS?: string;
    ulbResourceCCMS?: string;
  } = {

  };

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public webServices: WebservicesProvider,
    public helper: HelperProvider,
    private events: Events) {

      this.manPower.manpowerDate = this.navParams.get('date');
    this.ulbName = this.navParams.get('ulbname');
    this.manPower.ulbId = String(this.navParams.get('ulbid'));


  }

  ionViewDidLoad() {

  
   // this.getRectified();
    console.log('ionViewDidLoad ComplaintmenuPage',this.date);

  }

 


  openComplaint(){
    
  	this.navCtrl.push(OpencomplaintslistPage,{ulbid:this.ulbId,ulbname:this.ulbName});
  }

  newComplaint(){
console.log('newComplaint===');
  	this.navCtrl.push(NewcomplaintPage,{ulbid:this.ulbId,ulbname:this.ulbName,categoryname:this.categoryName});
  }

  goback() {
     
     this.navCtrl.pop();    
  }

  createManpower(){

    // this.navCtrl.push(ComplaintmenuPage,{categoryid: this.categoryId, categoryname: this.categoryName, ulbname: this.ulbName, ulbid: this.ulbId});

    

    if(this.manPower.vendorManpowerLED==undefined){

       this.helper.presentToast(" You must include Vendor Manpower LED.", "error");

    }else if(this.manPower.vendorManpowerCCMS==undefined){

       this.helper.presentToast(" You must include Vendor Manpower CCMS.", "error");

    }else if(this.manPower.ulbResourceLED==undefined){

       this.helper.presentToast(" You must include ULB Manpower LED.", "error");

    }else if(this.manPower.ulbResourceCCMS==undefined){

       this.helper.presentToast(" You must include ULB Manpower CCMS", "error");

    }else{

       console.log('this.complaintDate===',this.manPower);

      
       let loader = this.loadingCtrl.create({
            content: "Please wait..."
          });

          loader.present();
          



          console.log(this.manPower);

          this.webServices.post(this.manPower, "saveManpowerService.html").subscribe(
            getData => {
              
              loader.dismiss();    
              console.log(getData);          
              if(getData.result=='success'){

                this.navCtrl.pop().then(() => {
                  // Trigger custom event and pass data to be send back
                  console.log('manpower=====');
                  this.events.publish('update-manpower', this.manPower);
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
