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
import { StocklistPage } from '../../pages/stocklist/stocklist';



@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html',
})
export class StockPage {
  
  categoryList:any;
  ulbName:any;
  id:any;
  categoryId:any;
  subcategoriesList:any;
  ulbId:any;
  categoryName:any;

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
	    
	    console.log('ionViewDidLoad stock');
	    this.ulbName = this.navParams.get('ulbname');
	    this.categoryId = this.navParams.get('categoryid');
	    this.ulbId = this.navParams.get('ulbid');
			this.categoryName = this.navParams.get('categoryname');
		//	debugger
	    console.log(this.ulbName);
	    this.getULB();
	}

  	getULB(){

	  	let data={

	  		categoryid:String(this.categoryId)
	  	}

	  	let loader = this.loadingCtrl.create({
	        content: "Please wait..."
	    });

	    loader.present();

	  	this.webServices.post(data, "subcategoryService.html").subscribe(
	        getData => {
	          
	          loader.dismiss();
	          console.log(getData);
	          this.subcategoriesList = getData.subcategories;
	          var sortArray =[];

	          for(let data in this.subcategoriesList){

	          		if(this.subcategoriesList[data].subcategoryname!='noSubcategory'){

	          			//console.log(this.subcategoriesList[data].subcategoryname.split('W'));
	          			sortArray.push(this.subcategoriesList[data].subcategoryname.split('W')[0]);

	          		}
	          		
	          }

	        	sortArray = sortArray.sort(function(a, b){return a-b});
	          // console.log(sortArray);
	           var tempList=[];
	           tempList.push(this.subcategoriesList[0]);

	           for(let data in sortArray){

	           			for(let data1 in this.subcategoriesList){

	           				if(this.subcategoriesList[data1].subcategoryname.split('W')[0]==sortArray[data]){

	           					tempList.push(this.subcategoriesList[data1]);
	           				}
	           			}
	           		
	           		//console.log(sortArray[data]);
	           }

	           this.subcategoriesList = tempList;
	           console.log(tempList);

	        },
	        err => {

	          loader.dismiss();
	          this.helper.presentToast(err, "error");

	        });
  	}
    
    openstocklist(data){
			debugger
      this.navCtrl.push(StocklistPage,{categoryname:this.categoryName,subcategoryid:data.id,ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName,subcategoryname:data.subcategoryname});
    }

  	goback() {
       this.navCtrl.pop();
      
    }


}
