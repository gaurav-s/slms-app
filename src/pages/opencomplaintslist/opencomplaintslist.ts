import { Component } from '@angular/core';
import {  NavController,
  		  NavParams,
          LoadingController,
          Events
        } from 'ionic-angular';


import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
import { ComplaintdetailsPage } from '../../pages/complaintdetails/complaintdetails';

@Component({
  selector: 'page-opencomplaintslist',
  templateUrl: 'opencomplaintslist.html'
})
export class OpencomplaintslistPage {
  
  compalaintList:any=[];
  ulbId:any;
  categoryId:any;
  ulbName:any;
  currentpage:number=0;
  infiniteScroll: any;
  hasMoreData: boolean = true;
  Isloading:boolean = true;

  constructor(
  	public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public webServices: WebservicesProvider,
    public helper: HelperProvider,
    public events:Events) {

  }

  	ionViewDidLoad() {
	    
	    console.log('ionViewDidLoad CategoryPage');
	    this.ulbId = this.navParams.get('ulbid');
	    this.categoryId = this.navParams.get('categoryid');
        this.ulbName = this.navParams.get('ulbname');
	    console.log('this.categoryId===',this.navParams);
	    

	    this.events.subscribe('update-complaint', (paramsVar) => {
            // Do stuff with "paramsVar"
            console.log(paramsVar);
            this.compalaintList =[];
            this.currentpage =0;
            this.getComplaints();
            //this.events.unsubscribe('custom-user-events'); // unsubscribe this event
    })

	    this.getComplaints();
	}

	goback() {
       this.navCtrl.pop();
      
    }

    doInfinite(infiniteScroll) {
	    this.infiniteScroll = infiniteScroll;
	    this.currentpage = this.currentpage + 1;

	    this.getComplaints();
  	}


  	getComplaints(){

	  	let data={
	  		page:String(this.currentpage),
	  		count:String(100),
	  		search:'',
	  		ulbid:String(this.ulbId),
	  		category:String(this.categoryId)
	  	}

	  	let loader = this.loadingCtrl.create({
		        content: "Please wait..."
		    });

	  	if(this.compalaintList.length==0){

	  		

		    loader.present();
	  	}
	  	
	  	this.Isloading = false;
	  	
	    console.log(data);
	  	this.webServices.post(data, "compalaintlistservice.html").subscribe(
	        getData => {
	         

	         loader.dismiss(); 
	         this.Isloading = true;

	        console.log(getData);

	        if(getData.complaintlist.length>0){

	        	this.compalaintList = this.compalaintList.concat(getData.complaintlist);

	        }else{

	        	this.hasMoreData = false;
	        }
	        

	        if (this.infiniteScroll) {

      			this.infiniteScroll.complete();
    		}

	    },
	    err => {

	        if(loader){

	         	loader.dismiss();
	        }

	        this.helper.presentToast(err, "error");

	        if (this.infiniteScroll) {
	  		
	      		this.infiniteScroll.complete();
	    	}

	    });
  	}

  	openViewComplaint(data){
		
  		console.log('data===',data);
  		this.navCtrl.push(ComplaintdetailsPage,{ulbid:this.ulbId,categoryId:this.categoryId,id:data.id,ulbname:this.ulbName});
  	}


}
