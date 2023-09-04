import { Component } from '@angular/core';
import {  NavController,
  		  NavParams,
          LoadingController,
          AlertController 
        } from 'ionic-angular';


import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
import { HomePage } from "../../pages/home/home";
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { ComplaintmenuPage } from '../complaintmenu/complaintmenu';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-newcomplaint',
  templateUrl: 'newcomplaint.html'
})
export class NewcomplaintPage {
  
  serviceList:any;
  ulbId:any;
  categoryId:any;
  wardList:any=[];
  componentList:any;
  complaintList:any;
  compaintmode:any;
  multipleQty:any=[];
  maxDate:any;
  
  ismultiple:boolean=false;
  wardNo:any;
  complaintypeid:any;
  componentypeid:any;
  complaintmodeid:any;
  complaintDate:any;
  location:any;
  poleNo:any;
  remarks:any;
  quantity:any;
  loader:any;
  ulbName:any;
  categoryName:any;
  status:any;
  rectifiedDate:any;
  componentypemasterid:any;

  constructor(
  	public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public webServices: WebservicesProvider,
    public helper: HelperProvider,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private alertCtrl: AlertController) {

  }

    ionViewDidLoad() {
	    
	 	this.ulbId = this.navParams.get('ulbid');
	    this.categoryId = this.navParams.get('categoryid');
	    this.ulbName = this.navParams.get('ulbname');
	    this.categoryName = this.navParams.get('categoryname');
	    this.remarks ='';
	    this.quantity = '1';
		this.status ='Not Rectified'
	     let currentDate = new Date();

	    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2)

		// returns the day of the month (from 1 to 31)
		var day = ("0" + (currentDate.getDate())).slice(-2)

		// returns the year (four digits)
		var year = currentDate.getFullYear()

	   
	    console.log('currentDate',currentDate);
	    this.maxDate = String(year+'-'+month+'-'+day);
	     console.log('currentDate',this.maxDate);
	    //categoryid: this.categoryId, categoryname: data.catehoryname, ulbname: this.ulbName, ulbid: this.ulbId

	   // console.log('this.navParams',this.navParams);
	    for(let i=1;i<=12;i++){

	    	this.multipleQty.push(i);
	    }
	    
	    console.log(this.multipleQty);
	    this.getUlbService();
	}


	presentConfirm() {
		
		let alert = this.alertCtrl.create({
		    title: '',
		    message: 'Are you sure if the faults are on single pole?',
		    buttons: [
			    {
			        text: 'No',
			        role: 'cancel',
			        handler: () => {
			        	this.ismultiple = false;
			          	console.log('NO clicked');
			        }
			    },
			    {
		        text: 'Yes',
		        handler: () => {
		           this.ismultiple = true;
		           console.log('Yes clicked');
		        }
		      }
		    ]
		});

		alert.present();
	}

	updateItem(item){

		if(item){

			this.presentConfirm();
		}		
	}

	getUlbService(){

		let data={
			'ulbid':String(this.ulbId),
			'category':String(this.categoryId)
	  	}

	  	console.log(data);

	  	let loader = this.loadingCtrl.create({
	        content: "Please wait..."
	    });

	    loader.present();

	  	this.webServices.post(data, "ulbService.html").subscribe(
	        getData => {
	          
	          loader.dismiss();
	          
	          this.wardList       =  getData.wards;
	          this.componentList  =  getData.componenttype;
	          this.complaintList  =  getData.complainttype;
	          this.compaintmode   =  getData.compaintmode;

	          //this.serviceList = getData.categories;

	         // console.log(getData);

	        },
	        err => {

	          loader.dismiss();
	          console.log('err=====',err);
	           this.userData.logout();
           		 this.navCtrl.setRoot(LoginPage);
	          this.helper.presentToast(err, "error");

	        });

	}

	goback() {
       this.navCtrl.pop();
      
    }

	getLocation(){

		console.log('getlocation===123==sss=');
		this.loader = this.loadingCtrl.create({
		        content: "Please wait..."
		      });

		this.loader.present();

		console.log('this.geolocation===',this.geolocation);
		this.geolocation.getCurrentPosition().then((resp:any) => {
		 // resp.coords.latitude
		 // resp.coords.longitude
		 console.log(resp.coords);
		 this.getCityName(resp.coords.latitude,resp.coords.longitude);

		}).catch((error) => {
			
			this.loader.dismiss();
			alert(error);
		    console.log('Error getting location', error);
		});

	}

	getCityName(latitude,longitude){

		console.log(latitude, longitude);
		this.nativeGeocoder.reverseGeocode(latitude, longitude)
		  .then((result: NativeGeocoderReverseResult) => {
		  	console.log(result);
		  	this.location = result.subLocality+" "+result.locality+" "+result.subAdministrativeArea;
		  	//alert(JSON.stringify(result));
		  	this.loader.dismiss();
		  })
		  .catch((error: any) => {
		  	
		  		this.loader.dismiss();
		  		console.log('errorr',error);
		  });

	}

	createComplaint(){

		// this.navCtrl.push(ComplaintmenuPage,{categoryid: this.categoryId, categoryname: this.categoryName, ulbname: this.ulbName, ulbid: this.ulbId});

		console.log('wardNo',this.wardNo);
		console.log('complaintypeid',this.complaintypeid);
		console.log('componentypeid',this.componentypeid);
		console.log('complaintmodeid',this.complaintmodeid);
		console.log('complaintDate',this.complaintDate);
		console.log('location',this.location);
		console.log('poleNo',this.poleNo);
		console.log('remarks',this.remarks);
		console.log('quantity',this.quantity);

		this.componentypeid ='';

		if(this.wardNo==undefined){

			 this.helper.presentToast(" You must select ward.", "error");

		}else if(this.location==undefined){

			 this.helper.presentToast(" You must include location.", "error");

		}else if(this.poleNo==undefined){

			 this.helper.presentToast(" You must include poleNo.", "error");

		}else if(this.complaintypeid==undefined){

			 this.helper.presentToast(" You must select complaintype", "error");

		}else if(this.complaintmodeid==undefined){

			 this.helper.presentToast(" You must select complaintmode.", "error");

		}else if(this.complaintDate==undefined){

			 this.helper.presentToast("You must select complaintDate.", "error");
		}else if(this.rectifiedDate==undefined&& (this.status !='Not Rectified' )){
				console.log(this.status)
			 this.helper.presentToast("You must include rectifiedDate.", "error");
		}
		else if(this.componentypemasterid==undefined&& (this.status !='Not Rectified')){

			this.helper.presentToast("You must select Complaint Cause.", "error");
	   }
		else{

			 console.log('this.complaintDate===',this.complaintDate);

			 var test = this.complaintDate.split('-');
			  test = test[2]+'-'+test[1]+'-'+test[0];

				if(this.status=='Rectified'|| this.status=='ulb'){
			  		var test1 = this.rectifiedDate.split('-');
			  		test1 = test1[2]+'-'+test1[1]+'-'+test1[0];
				}
			 console.log('test===',test);

			 let loader = this.loadingCtrl.create({
		        content: "Please wait..."
			  });
			  

			  loader.present();
			 
		      let data ={
		      	ulbMasterid:String(this.ulbId),
		      	categoryid:String(this.categoryId),
		      	ismultiple:(this.ismultiple),
		      	wardNo:String(this.wardNo),
		      	complaintypeid:String(this.complaintypeid),
		      	//componentypeid:String(this.componentypeid),
		      	complaintmodeid:String(this.complaintmodeid),
		      	complaintDate:String(test),
		      	location:String(this.location),
		      	poleNo:String(this.poleNo),
		      	remarks:String(this.remarks),
		      	quantity:String(this.quantity),
				status:String(this.status),
				rectifieddate: String(test1),
				componentypeid:String(this.componentypemasterid),
			}



		      console.log('Compailndata',data);

		      this.webServices.post(data, "saveComplaintService.html").subscribe(
		        getData => {
		          
		          loader.dismiss();		
		          console.log(getData);          
		          if(getData.result=='success'){

		          	this.navCtrl.pop();
		           // this.navCtrl.push(ComplaintmenuPage,{categoryid: this.categoryId, categoryname: this.categoryName, ulbname: this.ulbName, ulbid: this.ulbId});

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

	onChange(status){

    	console.log('status===',status);
    	if(status=='ulb'){


    	}
    }

}
