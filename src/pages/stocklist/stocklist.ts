import { Component } from '@angular/core';
import {  NavController,
  		  NavParams,
          LoadingController
        } from 'ionic-angular';


import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
import { ComplaintmenuPage } from '../../pages/complaintmenu/complaintmenu';
import { HomePage } from '../../pages/home/home';
import { ManpowerPage } from '../../pages/manpower/manpower';
import { StockdetailsPage } from '../../pages/stockdetails/stockdetails';




@Component({
  selector: 'page-stocklist',
  templateUrl: 'stocklist.html',
})
export class StocklistPage {
  
  categoryList:any;
  ulbName:any;
  categoryId:any;
  subcategoryid:any;
  ulbId:any;
  spareList:any=[];
	categoryName:any;
	subcategoryName:any;

  constructor(
  	public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public webServices: WebservicesProvider,
    public helper: HelperProvider
    ) {

 	}

	ionViewDidLoad() {
	    
	    console.log('ionViewDidLoad CategoryPage');
	    
	    this.ulbId = this.navParams.get('ulbid');
	    this.ulbName = this.navParams.get('ulbname');
	    this.categoryId = this.navParams.get('categoryid');
	    this.categoryName = this.navParams.get('categoryname');
			this.subcategoryid = this.navParams.get('subcategoryid');
			this.subcategoryName = this.navParams.get('subcategoryname')
			debugger
	    console.log(this.ulbName,this.categoryId,this.categoryName);
	    
	    this.getULB();
	}

  	getULB(){

	  	let data={
	  		categoryid:String(this.categoryId),
	  		subcategoryid:String(this.subcategoryid)
	  	}

	  	let loader = this.loadingCtrl.create({
	        content: "Please wait..."
	    });

	    loader.present();
debugger
	  	this.webServices.post(data, "sparelistService.html").subscribe(
	        getData => {
	          
						loader.dismiss();
						debugger
	          this.spareList = getData.sparelist;
	          console.log(this.spareList);
	        },
	        err => {

	          loader.dismiss();
	          this.helper.presentToast(err, "error");

	        });
  	}

  	openstockdetails(data){
			debugger
  		this.navCtrl.push(StockdetailsPage,{ulbid:this.ulbId,sparemasterid:data.spareMasterId,subcategoryid:this.subcategoryid,categoryid:this.categoryId,ulbname:this.ulbName,sparename:data.spareName,subcategoryName:this.subcategoryName});
  	}

  	goback() {
       this.navCtrl.pop();
      
    }


}
