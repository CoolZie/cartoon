import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }
  login(msisdn, code_abonne, player_id) {
    return this.http.post("https://elitoon.com/api/login", { msisdn: msisdn, code_abonne: code_abonne, player_id: player_id })
  }
  videos(page, lang) {
    return this.http.get("https://elitoon.com/api/" + lang + "/videos/list/" + page)
  }
  currentVideo(msisdn, lang) {
    return this.http.get("https://elitoon.com/api/" + lang + "/videos/current/" + msisdn)
  }
  updatevues(id, msisdn) {
    return this.http.post("https://elitoon.com/api/update/vues", { id: id, msisdn: msisdn })
  }
  categorie_paiement() {
    return this.http.post('https://elitoon.com/api/tarif/abonnement',{})
  }
  register(email, code_abonne,lang) {
    return this.http.post("https://elitoon.com/api/inscription", { email: email, code_abonne: code_abonne,lang:lang })
  }

  paiment(login,code_pays,montant, id_utilisateur, code_operateur, msisdn_paiement) {
    return this.http.post("https://elitoon.com/api/paiement/mobile-money", { login:login,code_pays:code_pays,montant: montant, id_utilisateur: id_utilisateur, code_operateur: code_operateur, msisdn_paiement: msisdn_paiement })
  } 
  resetpassword(email,lang) {
    return this.http.post("https://elitoon.com/api/update/code-abonne", { login: email,lang:lang})
  }
  ifAbonned(login){
    return this.http.post("https://elitoon.com/api/abonnement-en-cours", { login: login})
  }

}
