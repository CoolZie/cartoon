import { Component } from '@angular/core';
import { NavController, IonicPage, ActionSheetController, AlertController, App, ModalController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../../providers/user/user';
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  user: any;
  numero: any;
  datefin: any;
  status: boolean;

  constructor(private userprovider: UserProvider,public modal: ModalController, private app: App, private translate: TranslateService, public alertCtrl: AlertController, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing, private iab: InAppBrowser) {
    console.log(JSON.parse(localStorage.getItem('user')))
    this.user = JSON.parse(localStorage.getItem('user'))
    this.numero = this.user.msisdn;
    this.datefin = JSON.parse(localStorage.getItem('user')).date_fin
    this.userprovider.ifAbonned(JSON.parse(localStorage.getItem('user')).login).subscribe(data => {
      console.log(data)
      this.status=data['code_status']==1
    })
  }
  langue() {
    const actionSheet = this.actionSheetCtrl.create({
      title: this.translate.getDefaultLang() == 'fr' ? 'Changer de langue' : 'Change language',
      buttons: [
        {
          text: this.translate.getDefaultLang() == 'fr' ? 'Français' : 'French',
          handler: () => {
            localStorage.setItem('lang', 'fr')
            this.translate.use('fr')
            window.location.reload()
          }
        }, {
          text: this.translate.getDefaultLang() == 'fr' ? 'Anglais' : 'English',
          handler: () => {
            localStorage.setItem('lang', 'en')
            this.translate.use('en')
            window.location.reload()
          }
        }, {
          text: this.translate.getDefaultLang() == 'fr' ? 'Annuler' : 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  sharing() {

    this.socialSharing.share(this.translate.getDefaultLang() == 'fr' ? 'Régarder les cartoons Elitoon sur www.elitoon.com,télécharge l\'application https://cutt.ly/RoD1HG ':'Watch the Elitoon cartoons on www.elitoon.com , download app on https://cutt.ly/RoD1HG',"").then(() => { }).catch(() => { });
  }
  page() {
    const browser = this.iab.create('https://www.facebook.com/Elitoon-1959835284072349/');
    browser.show()
  }
  apropos() {
    const browser = this.iab.create('https://elitoon.com/' + localStorage.getItem('lang') + '/apropos');
    browser.show()
  }
  logout() {

    const prompt = this.alertCtrl.create({
      title: this.translate.getDefaultLang() == 'fr' ? 'Déconnexion' : "logOut",
      message: this.translate.getDefaultLang() == 'fr' ? "Voulez vous vraiment vous déconnecter ?" : "Do you really want to disconnect ?",

      buttons: [
        {
          text: this.translate.getDefaultLang() == 'fr' ? 'NON' : "NO",
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.getDefaultLang() == 'fr' ? 'OUI' : 'YES',
          handler: data => {
            localStorage.removeItem('user')
            localStorage.removeItem('nbreOpen')
            localStorage.removeItem('abonne')
            this.app.getRootNavs()[0].setRoot('LoginPage');
          }
        }
      ],
      cssClass: 'alertDanger'
    });
    prompt.present();

  }
  updateNum() {
    const prompt = this.alertCtrl.create({
      title: this.translate.getDefaultLang() == 'fr' ? 'Numero' : "Number",
      message: this.translate.getDefaultLang() == 'fr' ? "Changer de numero" : "Change your number",
      inputs: [
        {
          name: this.translate.getDefaultLang() == 'fr' ? 'Votre Numero' : 'Your Number',
          placeholder: this.translate.getDefaultLang() == 'fr' ? 'Votre numero' : 'Your Number',
          value: '+' + this.numero
        },
      ],
      buttons: [
        {
          text: this.translate.getDefaultLang() == 'fr' ? 'Annuler' : "Cancel",
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.getDefaultLang() == 'fr' ? 'Changer' : "Change",
          handler: (data) => {
            alert("worked")
          }
        }
      ],
      cssClass: 'alertDanger'
    });
    prompt.present();
  }

  paiement() {
    const modal = this.modal.create('WizardHomePage')
    modal.present();
  }
  condition() {
    const browser = this.iab.create('https://elitoon.com/' + localStorage.getItem('lang') + '/condition-utilisation');
    browser.show()
  }


}
