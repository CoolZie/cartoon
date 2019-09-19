import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  email: string;
  loading:boolean=false
  lang: string;

  constructor(private translate: TranslateService,public navCtrl: NavController, public navParams: NavParams,private userprovider:UserProvider,public alertCtrl: AlertController) {
    console.log(localStorage.getItem('lang'))
    this.lang=localStorage.getItem('lang')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
  connect(){  
    this.navCtrl.push('LoginPage')
  }
  isEmail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
     return false
    }else{
      return true
    }
  }
  reset(){
    if(this.isEmail(this.email)){
      this.loading = true
      this.userprovider.resetpassword(this.email, this.lang)
      .subscribe(data=>{
        this.loading = false
        this.message(this.translate.getDefaultLang()=='fr'?"Félicitaions !":"Congratulations !",data['message'])
        console.log(data)
      })
    }else{
      this.message(this.translate.getDefaultLang()=='fr'?'Erreur !':'Error !', this.translate.getDefaultLang()=='fr'?'Entrez une adresse email valide':'Enter a valid email address')
    }
    
   
    console.log(this.email)
  }
  message(title,message){
    const alert = this.alertCtrl.create({
      title:  title,
      subTitle: message,
      buttons: [this.translate.getDefaultLang()=='fr'?"OK":"Okey"],
      cssClass: 'alertDanger'
    });
    alert.present();

    
  }
  toEnglish() {
    localStorage.setItem('lang', 'en')
    this.translate.use('en')
    window.location.reload()
  }
  toFrench() {
    localStorage.setItem('lang', 'fr')
    this.translate.use('fr')
    window.location.reload()
  }

}
