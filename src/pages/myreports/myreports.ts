import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController } from 'ionic-angular';
import { OpencomplaintslistPage } from '../../pages/opencomplaintslist/opencomplaintslist';
import { NewcomplaintPage } from '../../pages/newcomplaint/newcomplaint';
import { CategoryPage } from '../../pages/category/category';
import { StockPage } from '../../pages/stock/stock';

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
  selector: 'page-myreports',
  templateUrl: 'myreports.html',
})
export class MyreportsPage {
  
  list:string='currrentlist';
  ulb:string='';
  categoryId:any;
  categoryName:any;
  ulbName:any;
  ulbId:any;
  options:any;
  complaintdatesCount:any;
  options1:any;

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public webServices: WebservicesProvider,
    public helper: HelperProvider) {

    

  }

  ionViewDidLoad() {

  	this.categoryId = this.navParams.get('categoryid');
  	this.categoryName = this.navParams.get('categoryname');
  	this.ulbName = this.navParams.get('ulbname');
    this.ulbId = this.navParams.get('ulbid');

    this.getRectified();
    console.log('ionViewDidLoad MyreportsPage');

  }

  getRectified(){

      let data={
     
      }

      

      let loader = this.loadingCtrl.create({
          content: "Please wait..."
      });

      loader.present();

      this.webServices.post(data, "rectifiedandnotrectifiedcountservice.html").subscribe(
          getData => {
            
            loader.dismiss();
            this.getComplaintData();
             
            this.options = {
           chart: {
        type: 'column'
    },
    title: {
        text: 'Total Complaints - Street light'
    },
    subtitle: {
        text: 'Past 30 days'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Number of complaints'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> <br/>'
    },
    series: [{
          name: 'Complaints',
          colorByPoint: true,
          data: [{
              name: 'Rectified',
              y: getData.rectified
          }, 
          {
              name: 'Not Rectified',
              y: getData.notrectified
              
          }]
        }]
      };

      console.log(getData);

      },err => {

         loader.dismiss();
         this.helper.presentToast(err, "error");
         
       });

  }


  getComplaintData(){

      let data={
         'ulbid':String(this.ulbId)
      }

      

      let loader = this.loadingCtrl.create({
          content: "Please wait..."
      });

      loader.present();

      this.webServices.post(data, "getComplaintDateRecordsService.html").subscribe(
          getData => {
            
            loader.dismiss();
            this.complaintdatesCount = getData.complaintdatescount[0];
            var allcomplaints =[];
            var rectifiedcomplaints =[];

            for(let data in this.complaintdatesCount.allcomplaints){

              var splitdate = this.complaintdatesCount.allcomplaints[data].complaintdate.split('-');
             // console.log('splitdate==',splitdate);
              var complaintarray =[];
              splitdate[1] = splitdate[1]-1;
              complaintarray[0] = Date.UTC(splitdate[2], splitdate[1], splitdate[0]);
              complaintarray[1] = Number(this.complaintdatesCount.allcomplaints[data].complaintcount);

              allcomplaints.push(complaintarray);
            }

            for(let data in this.complaintdatesCount.rectifiedcomplaints){

              var splitdate = this.complaintdatesCount.rectifiedcomplaints[data].complaintdate.split('-');

              var complaintarray =[];
              splitdate[1] = splitdate[1]-1;
              complaintarray[0] =Date.UTC(splitdate[2], splitdate[1], splitdate[0]);
              complaintarray[1] = Number(this.complaintdatesCount.rectifiedcomplaints[data].complaintcount);

              rectifiedcomplaints.push(complaintarray);
            }

             
             this.options1 = {

                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Complaints'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: { // don't display the dummy year
                            month: '%e. %b',
                            year: '%b'
                        },
                        title: {
                            text: 'Date'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Complaints Count'
                        },
                        min: 0
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x:%e. %b}: {point.y:.2f} '
                    },

                    plotOptions: {
                        spline: {
                            marker: {
                                enabled: true
                            }
                        }
                    },

                  colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

                  // Define the data points. All series have a dummy year
                  // of 1970/71 in order to be compared on the same x axis. Note
                  // that in JavaScript, months start at 0 for January, 1 for February etc.
                  series: [{
                      name: "All Complaints",
                      data: allcomplaints
                  }, {
                      name: "Rectified Complaints",
                      data: rectifiedcomplaints
                  }]
           };

          console.log(getData);

      },err => {

         loader.dismiss();
         this.helper.presentToast(err, "error");
         
       });

  }


  openComplaint(){
    
  	this.navCtrl.push(OpencomplaintslistPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName});
  }

  openstock(){
    
    this.navCtrl.push(StockPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName,categoryname:this.categoryName});
  }

  newComplaint(){
    
  	this.navCtrl.push(NewcomplaintPage,{ulbid:this.ulbId,categoryid:this.categoryId,ulbname:this.ulbName,categoryname:this.categoryName});
  }

  goback() {
     
     this.navCtrl.pop();    
  }

}
