import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ToastController } from 'ionic-angular';
import { CountryProvider } from '../../providers/country/country';
import { Country } from '../../interfaces/country';
import { TranslateService } from '@ngx-translate/core';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: boolean = false
  gender: boolean
  _playerId: string
  countries: any;
  countrysearch: any;
  current: any;
  codePays: Country;
  langues: { name: string; flag: string; code: string; }[];
  lang: string;
  type_password=true
  string_password: string="password";
  constructor(private app: App,public alertCtrl: AlertController, private translate: TranslateService, public paysService: CountryProvider, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private userprovider: UserProvider) {

    console.log(localStorage.getItem('lang'))
    this.lang = localStorage.getItem('lang')

  }
  lostPassword() {
    this.navCtrl.push('ResetPasswordPage')
  }
  ionViewDidLoad() {
    // this.oneSignal.getIds().then((id) => {
    //   this._playerId = id.userId
    // })
  }
  register() {
    this.navCtrl.push('RegisterPage')
  }
  voir(){
    this.type_password = !this.type_password
    if(this.type_password){
      this.string_password="password"
    }else{
      this.string_password="text"
    }
  }
  Connect(msisdn, code_abonne) {
    console.log(msisdn)
    if (msisdn && code_abonne) {
      this.loading = true
      this.userprovider.login(msisdn, code_abonne, this._playerId).subscribe(data => {
        console.log(data)
        if (data['status'] == 'error') {
          this.showPrompt(this.translate.getDefaultLang()=='fr'?'Erreur !':'Error !', data['message'])
          this.loading = false
        } else {
          this.app.getRootNavs()[0].setRoot('TabsPage');
          this.loading = false
          localStorage.setItem('user', JSON.stringify(data['data']))

        }
      },error=>{
        console.log(error)
        this.showPrompt(this.translate.getDefaultLang()=='fr'?'Erreur !':'Error !', this.translate.getDefaultLang()=='fr'?'Veuillez réessayer la connexion':'Please try again')
        this.loading = false
      })
    } else {
      this.loading = false
      this.showPrompt(this.translate.getDefaultLang()=='fr'?'Erreur !':'Error !', this.translate.getDefaultLang()=='fr'?'Veuillez renseignez les champs':'Please fill in the fields')
    }
    setTimeout(function(){
      this.loading = false
      this.showPrompt(this.translate.getDefaultLang()=='fr'?'Erreur !':'Error !', this.translate.getDefaultLang()=='fr'?'Veuillez réessayer !':'Try Again Please !')

    },10000)
  }
  showPrompt(title, message) {
    const prompt = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [this.translate.getDefaultLang()=='fr'?'OK !':'Okey !'],
      cssClass: 'alertDanger'
    });
    prompt.present();
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
