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
import { PaymentsPage } from '../../pages/payments/payments';
import { MyreportsPage } from '../../pages/myreports/myreports';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  
  categoryList:any;
  ulbName:any;
  id:any;
  isLoading:boolean=false;

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
	    this.ulbName = this.navParams.get('name');
	    this.id = this.navParams.get('id');

	    console.log(this.ulbName,this.id);
	    this.getULB();
	}

  	getULB(){

	  	let data={
	  	}

	  	let loader = this.loadingCtrl.create({
	        content: "Please wait..."
	    });

	    loader.present();
      this.isLoading = false;

	  	this.webServices.post(data, "ulbCategoryService.html").subscribe(
	        getData => {
	          
            this.isLoading = true;
	          loader.dismiss();
	          this.categoryList = getData.categories;

	        },
	        err => {

            this.isLoading = true;
	          loader.dismiss();
	          this.helper.presentToast(err, "error");

	        });
  	}

  	selectCategory(data){

  		console.log(data);
  		this.navCtrl.push(ComplaintmenuPage,{categoryid:data.id,categoryname:data.catehoryname,ulbname:this.ulbName,ulbid:this.id});
  	
    }

    selectManpower(){

      this.navCtrl.push(ManpowerPage,{categoryname:'Manpower',ulbname:this.ulbName,ulbid:this.id});
    
    }

    selectpayment(){

      this.navCtrl.push(PaymentsPage,{categoryname:'My Reports',ulbname:this.ulbName,ulbid:this.id});
    }


     selectmyreports(){

      this.navCtrl.push(MyreportsPage,{categoryname:'Invoice',ulbname:this.ulbName,ulbid:this.id});
    }

  	goback() {
       
      this.navCtrl.pop();
      
    }


}
