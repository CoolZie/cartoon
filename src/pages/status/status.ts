import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  succes:boolean;
  datefin: string;
  msisdn: string;
  paiement: any;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.paiement=this.navParams.get('data')
    this.succes=this.paiement['status']=="1"
    this.datefin=this.paiement['date_fin']
    this.msisdn=this.paiement['msisdn']
    console.log('ionViewDidLoad StatusPage');
  }
  goHome(){
    if (localStorage.getItem('user')) {
      this.navCtrl.setRoot('TabsPage')
    } else {
      this.navCtrl.setRoot('LoginPage')
    }
  }
  _paiement() {
    const modal = this.modalCtrl.create('WizardHomePage')
    modal.present()
  }
}
