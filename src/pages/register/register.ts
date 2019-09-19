import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { CountryProvider } from '../../providers/country/country';
import { Country } from '../../interfaces/country';
import { UserProvider } from '../../providers/user/user';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loading: boolean = false
  countries: any;
  countrysearch: any;
  current: any;
  codePays: Country;
  login: string;
  numero: number;
  password: string;
  cpassword: string;
  lang: string;
  type_password=true
  string_password: string="password";
  constructor(public alertCtrl: AlertController, private translate: TranslateService, private localNotifications: LocalNotifications, private userprovider: UserProvider, public paysService: CountryProvider, private app: App, public navCtrl: NavController, public navParams: NavParams) {
    console.log(localStorage.getItem('lang'))
    this.lang = localStorage.getItem('lang')
  }

  // ionViewDidLoad() {
  //   this.paysService.country().subscribe(data=>{
  //     this.countries=data
  //     this.countrysearch=this.countries
  //      console.log(data)
  //    })
  //    this.paysService.current().subscribe((data:Country)=>{
  //     console.log(data)
  //     this.codePays=data
  //     this.getcountry(this.codePays.countryCode)
  //   })
  // }

  notifications(message) {
    this.localNotifications.schedule({
      id: 1,
      text: message,
    });
  }
  isEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      return false
    } else {
      return true
    }
  }

  voir(){
    this.type_password = !this.type_password
    if(this.type_password){
      this.string_password="password"
    }else{
      this.string_password="text"
    }
  }

  register() {
    if (this.password != this.cpassword) {
      this.showPrompt(this.translate.getDefaultLang() == 'fr' ? 'Erreur !' : 'Error !', this.translate.getDefaultLang() == 'fr' ? 'Entrez un code identique' : 'Enter an identical code')
    } else if (!this.password || !this.cpassword || !this.login) {
      this.showPrompt(this.translate.getDefaultLang() == 'fr' ? 'Erreur !' : 'Error !', this.translate.getDefaultLang() == 'fr' ? 'Veuillez renseignez les champs' : 'Please fill in the fields')
    }
    else {
      if (this.isEmail(this.login)) {
        this.loading = true
        this.userprovider.register(this.login, this.password,this.lang)
          .subscribe((data) => {
            console.log(data)
            if (data['status']=='success') {
              console.log(data)
              localStorage.setItem('user', JSON.stringify(data['data']))
              this.loading = false
              this.app.getRootNavs()[0].setRoot('TabsPage');
            } else {
              this.loading = false
              this.showPrompt(this.translate.getDefaultLang() == 'fr' ? 'Erreur !' : 'Error !', this.translate.getDefaultLang() == 'fr' ? 'Une erreur s\'est produite ' : 'Error , try again')
            }
          }, error => {
            this.loading = false
            this.showPrompt(this.translate.getDefaultLang() == 'fr' ? 'Erreur !' : 'Error !', this.translate.getDefaultLang() == 'fr' ? 'Une erreur s\'est produite ' : 'Error , try again')
          })
      } else {
        this.loading = false
        this.showPrompt(this.translate.getDefaultLang() == 'fr' ? 'Erreur !' : 'Error !', this.translate.getDefaultLang() == 'fr' ? 'Entrez une adresse email valide' : 'Enter a valid email address')
      }

    }

  }

  showPrompt(title, message) {
    const prompt = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [this.translate.getDefaultLang() == 'fr' ? "OK" : "Okey"],
      cssClass: 'alertDanger'
    });
    prompt.present();
  }

  connecter() {
    this.navCtrl.setRoot('LoginPage')
  }
  reseatcountry() {
    this.countries = this.countrysearch
  }

  getcountry(ev: any) {
    console.log(ev);
    this.reseatcountry()
    let serVal = ev
    if (serVal && serVal.trim() != '') {
      this.countries = this.countries.filter((countrie) => {
        return (countrie.alpha3Code.toLowerCase().indexOf(serVal.toLowerCase()) > -1) || (countrie.alpha2Code.toLowerCase().indexOf(serVal.toLowerCase()) > -1)
      })
      this.current = this.countries[0]
      this.reseatcountry()
    }
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
