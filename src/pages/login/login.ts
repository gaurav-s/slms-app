import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { HelperProvider } from "../../providers/helper/helper";
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { StorageProvider } from '../../providers/storage/storage';
import { HomePage } from "../../pages/home/home";
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  login: {
    userid?: string;
    pass?: string;
  } = {};

  submitted = false;
  loader: any;
  loginForm: FormGroup;

  constructor( public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: StorageProvider,
    public toastCtrl: ToastController,
    public webServices: WebservicesProvider,
    public helper: HelperProvider,
    public formBuilder: FormBuilder,
    private appVersion: AppVersion) {

      this.loginForm = this.formBuilder.group({
      userid: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(30)])
      ],
      pass: ["", Validators.required]
    });

  }

  onLogin(form: NgForm) {
    this.submitted = true;

    // this.createClient();
   // debugger
    console.log('login function');

    if (this.loginForm.valid) {
     

      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });

      loader.present();

      this.login.userid = this.loginForm.value.userid.trim();
      this.login.pass = this.loginForm.value.pass;
      debugger
    //  this.appVersion.getVersionNumber;
     // console.log(this.appVersion.getVersionNumber);

      this.webServices.post(this.login, "LoginService.html").subscribe(
        
        getData => {
        debugger
          loader.dismiss();
          console.log(getData);
          
          if(getData.msg=='success'){
            //  debugger
               this.userData.login(getData);
                this.navCtrl.setRoot(HomePage);

          }else{
                debugger
              this.helper.presentToast(getData.msg, "error");
          }
         
          
        },
        err => {
          debugger
          loader.dismiss();
          console.log('inininokokokook');
          console.log(err);
          console.log(err.statusText);
          this.helper.presentToast(err, "error");
        }
      );
    }else{
        if (this.loginForm.controls["userid"].hasError("required")) {

        this.helper.presentToast(" You must include a username.", "error");

      } else if (this.loginForm.controls["userid"].hasError("maxlength")) {

        this.helper.presentToast(
          "Your username cannot exceed 30 characters.",
          "error"
        );

      }  else if (this.loginForm.controls["pass"].hasError("required")) {

        this.helper.presentToast(" You must include a password.", "error");

      }
    }
  }


}
