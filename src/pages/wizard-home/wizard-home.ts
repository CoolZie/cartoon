import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Events, IonicPage, ViewController, Platform, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'page-wizard-home',
    templateUrl: 'wizard-home.html',
})
export class WizardHomePage {


    @ViewChild('wizardSlider') slider: Slides;
    step: string;
    width: number;
    height: number;
    paiements: any;
    operateurs: any = [];
    validation = {
        cateogie: '',
        operateur: '',
        tarif: {},
        numero_paiement: '',
        code_pays:''
    }
    id_user: any;
    numero_paiement: boolean=true;
    bool_paiement: boolean=true
    specific_pub: string;
    tarif: any;
    montant: any;
    devise: any;
    periode: any;
    isFrench: boolean;

    constructor(private translate: TranslateService,public alertCtrl: AlertController, public events: Events, private userprovider: UserProvider, public platform: Platform, public navCtrl: NavController, public view: ViewController) {
        this.isFrench=localStorage.getItem('lang')=='fr'
        platform.ready().then(() => {
            this.width = this.platform.width();
            this.height = this.platform.height();
        });
        this.id_user = 123
        this.categoriespaiement()
    }
    categoriespaiement() {
        this.userprovider.categorie_paiement().subscribe(data => {
            console.log(data)
            this.paiements = data
        })
    }
    ionViewDidEnter() { }
    showPrompt(title, message) {
        const prompt = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: this.translate.getDefaultLang()=='fr'?"OK":"Okey",
                    handler: data => {
                        this.fermer()
                    }
                }
            ]
        });
        prompt.present();
    }

    changeSlide(index: number, step): void {
        console.log(step)
        if (index > 0) {
            if (step['ListeOperateurs']) {
                this.operateurs = step['ListeOperateurs']
                console.log(this.operateurs)
            }
            if (step['code_mode_paiement']) {
                this.validation.cateogie = step['code_mode_paiement']
            }
            if (step['code_operateur']) {
                this.validation.operateur = step['code_operateur']
            }
            if (step['code_pays']) {
                this.validation.code_pays = step['code_pays']
            }
            if(step['tarif']){
                this.validation.tarif=step['tarif']
                this.montant=this.validation.tarif['tarif']
                this.devise=this.validation.tarif['devise']
                this.periode=this.validation.tarif['period_jour']
                console.log(this.montant)
            }

            this.slider.slideNext(300);
        } else {
            this.slider.slidePrev(300);
        }
        if(localStorage.getItem('lang')=='fr'){
            if(this.validation.cateogie=='OPMOOV'){
                this.specific_pub="./../../assets/imgs/moov_fr.png"
            }else if(this.validation.cateogie=='OPMTN'){
                this.specific_pub="./../../assets/imgs/mtn_fr.png"
            }else if(this.validation.cateogie=='OPORANGE'){
                this.specific_pub="./../../assets/imgs/orange_fr.png"
            }
        }else{
            if(this.validation.cateogie=='OPMOOV'){
                this.specific_pub="./../../assets/imgs/moov_en.png"
            }else if(this.validation.cateogie=='OPMTN'){
                this.specific_pub="./../../assets/imgs/mtn_en.png"
            }else if(this.validation.cateogie=='OPORANGE'){
                this.specific_pub="./../../assets/imgs/orange_en.png"
            }
        }
        
    }


    slideHasChanged(): void {
        console.log(this.slider.getActiveIndex())
        if ((this.slider.getActiveIndex() == 1) && (!this.validation.cateogie)) {
            this.slider.slidePrev(300);
        }else if((this.slider.getActiveIndex()==2)&&(!this.validation.operateur)){
            this.slider.slidePrev(300);
        }

    }

    show(value: string): boolean {
        let result: boolean = false;
        try {
            if (value == 'prev') {
                result = !this.slider.isBeginning();
            } else if (value == 'next') {
                result = this.slider.getActiveIndex() < (this.slider.length() - 1);
            } else if (value == 'finish') {
                result = this.slider.isEnd();
            }
        } catch (e) { }
        return result;
    }
    fermer() {
        this.view.dismiss()
    }
    paiement() {
        this.bool_paiement=false

        if (this.validation.numero_paiement == null || this.validation.numero_paiement == "" || this.validation.numero_paiement == undefined ) {
            this.numero_paiement = false
            this.bool_paiement=true
        }else{
            this.numero_paiement = true
        }
        if (this.numero_paiement) {
            this.userprovider.paiment(JSON.parse(localStorage.getItem('user')).login,this.validation.code_pays,this.montant, this.id_user, this.validation.operateur,this.validation.numero_paiement)
                .subscribe(data => {
                    console.log(data)
                    this.showPrompt(this.translate.getDefaultLang()=='fr'?'Information':'Information', this.translate.getDefaultLang()=='fr'?'Le processus de paiement a été entammé. Vous devez valider l\'opération depuis votre mobile! Votre abonnement ne sera pris en compte que lorsque l\'opération sera approuvée.':'The payment process has begun. You must validate the operation from your mobile! Your subscription will only be taken into account when the transaction is approved.')
                })
        }

    }
}
