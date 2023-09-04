import { Component } from '@angular/core';
import {  NavController,
  		  NavParams,
          LoadingController,
          Events,
          AlertController
        } from 'ionic-angular';
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
import { OpencomplaintslistPage } from "../../pages/opencomplaintslist/opencomplaintslist";

@Component({
  selector: 'page-complaintdetails',
  templateUrl: 'complaintdetails.html'
})
export class ComplaintdetailsPage {
  
  complaintmasterid:any;
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
  causeofcomplaint:any;
  vendor:any;
  rectifiedqty:any;
  status:any;
  multipleQty:any=[];
  ulbName:any;
  maxDate:any;
  rectifiedDate:any;
  componentType:any;
  ulbId:any;
  categoryId:any;
  componentList:any;
  componentypemasterid:any;
  oldremarks:any;
  assignedTo:any;

  constructor(	
  	public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public webServices: WebservicesProvider,
    public helper: HelperProvider,
    public events:Events,
     public alertCtrl: AlertController) {

  }

    ionViewDidLoad() {
	    
	    console.log('ionViewDidLoad CategoryPage');

	    let currentDate = new Date();

	    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2)

		// returns the day of the month (from 1 to 31)
		var day = ("0" + (currentDate.getDate())).slice(-2)

		// returns the year (four digits)
		var year = currentDate.getFullYear()

	    
	    this.maxDate = String(year+'-'+month+'-'+day);

	    this.ulbName = this.navParams.get('ulbname');
	    this.complaintmasterid = this.navParams.get('id');

	    this.ulbId = this.navParams.get('ulbid');
	    this.categoryId = this.navParams.get('categoryId');

	    this.getComplaintsDetails();
	}

	goback() {

       this.navCtrl.pop();
      
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
	          
	      
	          this.componentList  =  getData.componenttype;
	        
	          //this.serviceList = getData.categories;

	          console.log(getData);

	        },
	        err => {

	          loader.dismiss();
	          console.log('err=====',err);
	          this.helper.presentToast(err, "error");

	        });

	}
    
    onChange(status){

    	console.log('status===',status);
    	if(status=='ulb'){


    	}
    }



  	getComplaintsDetails(){

	  	let data={
	  		complaintmasterid:String(this.complaintmasterid)
	  		
	  	}

	  	//console.log(data);
	  	let loader = this.loadingCtrl.create({
	        content: "Please wait..."
	    });

	    loader.present();

	  	this.webServices.post(data, "compalaintdetailservice.html").subscribe(
	        getData  => {
						//alert(JSON.stringify(getData));
						console.log(JSON.stringify( getData));
						debugger
	        loader.dismiss();
	        console.log(getData);

	       
	        this.assignedTo = getData.assignedto;
	        this.wardNo = getData.wardno;
	        this.location = getData.location;
	        this.poleNo = getData.poleno;
	        this.complaintmodeid = getData.complaintmode;
	        this.complaintDate = getData.complaintDate;
	        this.componentType = getData.componenttype;
	        this.causeofcomplaint = getData.causeofcomplaint;
	        this.quantity = getData.quantity;
	        this.vendor = getData.vendor;
	        this.remarks = getData.remarks;
	        this.rectifiedqty = getData.rectifiedqty;
	        this.status = getData.status;

				
	        console.log('this.assignedTo',this.assignedTo);
	        
	        for(let i=1;i<=this.quantity;i++){

	    		this.multipleQty.push(i);
	    	}

	        if(this.remarks=='undefined'){

	        	this.remarks='';
	        }	

	        this.oldremarks = this.remarks;

	        this.getUlbService()
   
	    },
	    err => {
					debugger
				
	        loader.dismiss();
	        console.log(err);
	        this.helper.presentToast(err, "error");
	    });
  	}

  	 checkComplaint(){

    	if(this.status=='ulb'){

    		 	let confirm = this.alertCtrl.create({
			      title: 'Alert?',
			      message: 'Are you sure you want to transfer the complaint to ULB?',
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
			            this.ulbToTransfer();
			          }
			        }
			      ]
			    });
    			confirm.present();

    	}else{
    		
    		this.updateComplaint();
    	}
    }

    ulbToTransfer(){

    			if(this.rectifiedDate==undefined){

		    	 this.helper.presentToast("You must include rectifiedDate.", "error");

			    }else if(this.componentypemasterid==undefined){

			    	 this.helper.presentToast("You must select Complaint Cause.", "error");
			    }else{

			    	let loader = this.loadingCtrl.create({
				        content: "Please wait..."
				    });

				    loader.present();
				    var test;

				    if(this.rectifiedDate){


				    	 test = this.rectifiedDate.split('-');
						test = test[2]+'-'+test[1]+'-'+test[0];
				    }else{

				    	test ='';
				    }
			    	

			    	let data ={
				      	complaintmasterid:String(this.complaintmasterid),
				      	remarks:this.remarks,
				      	rectifieddate:String(test),
				      	componentypemasterid:String(this.componentypemasterid),
				      	rectifiedqty:String(this.rectifiedqty),
				      	transfer:'true',
				      	status:'Not Rectified'
			      	}
							debugger
			      console.log(data);

			      this.webServices.post(data, "transfertoUlbService.html").subscribe(
			        getData => {
			         
			          loader.dismiss();		
			                  
			          if(getData.result=='success'){

			          	
			            this.navCtrl.pop().then(() => {
		                  // Trigger custom event and pass data to be send back
		                  console.log('manpower=====');
		                  this.events.publish('update-complaint', '');
                		});
			            this.helper.presentToast(getData.msg, "success");

			          }else{

			            this.helper.presentToast(getData.msg, "error");
			          }

			          
			         
			          
			        },
			        err => {
			          loader.dismiss();
			          console.log('inininokokokook');
			          console.log(err);
			          console.log(err.statusText);
			          this.helper.presentToast(err, "error");
			        });
			    }

    }

  	updateComplaint(){
  			
  		 

		    if(this.status=='Rectified'||this.oldremarks != this.remarks){

		    	if(this.rectifiedDate==undefined&&(this.status !='Not Rectified')){

		    	 this.helper.presentToast("You must include rectifiedDate.", "error");

			    }else if(this.componentypemasterid==undefined&&(this.status !='Not Rectified')){

			    	 this.helper.presentToast("You must select Complaint Cause.", "error");
			    }else{

			    	let loader = this.loadingCtrl.create({
				        content: "Please wait..."
				    });

				    loader.present();
				    var test;

				    if(this.rectifiedDate){


				    	 test = this.rectifiedDate.split('-');
						test = test[2]+'-'+test[1]+'-'+test[0];
				    }else{

				    	test ='';
				    }
			    	

			    	let data ={
				      	complaintmasterid:String(this.complaintmasterid),
				      	status:this.status,
				      	remarks:this.remarks,
				      	rectifieddate:String(test),
				      	componentypemasterid:String(this.componentypemasterid),
				      	rectifiedqty:String(this.rectifiedqty)
			      	}

			      console.log(data);

			      this.webServices.post(data, "updateComplaintService.html").subscribe(
			        getData => {
			          
			          loader.dismiss();		
			          console.log(getData);          
			          if(getData.msg=='success'){

			          	
			            this.navCtrl.pop().then(() => {
		                  // Trigger custom event and pass data to be send back
		                  console.log('manpower=====');
		                  this.events.publish('update-complaint', '');
                		});
			            this.helper.presentToast(getData.msg, "success");

			          }else{

			            this.helper.presentToast(getData.msg, "error");
			          }

			          
			         
			          
			        },
			        err => {
			          loader.dismiss();
			          console.log('inininokokokook');
			          console.log(err);
			          console.log(err.statusText);
			          this.helper.presentToast(err, "error");
			        });
			    }
		    }
		    

		    

  	}

}
