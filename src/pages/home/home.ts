import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, Content, IonicPage, Platform, App, Events, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ModalController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('videoPlayer',{ read: ElementRef }) videoPlayer:ElementRef ;

  @ViewChild(Content) content: Content
  //@ViewChild('description') description: any
  video: any;
  description: string = "Cartoon"
  titre: string = "Bienvenue";
  genre: string = "Cartoon";
  page: number = 1;
  videos = [];
  totalpage: number = 1;
  email: string = "01478930"
  currentVideo: Object;
  vues: any;
  orientation: string = this.screenOrientation.type
  public url: string = "https://elitoon.com/template/assets/videos/toon_2019_03_12_18_08_53.mp4"
  auteur: any;
  date_create: any;
  height: number;
  width: number;
  laoding: boolean = true
  lang: string;
  count: number;
  abonned: boolean;
  loader_current: boolean = false;
  loarder_videos: boolean = false;
  isAbonned: boolean=true;
  isFrench: boolean;
  constructor(public navParams: NavParams,public events: Events, private translate: TranslateService, private app: App, private screenOrientation: ScreenOrientation, public platform: Platform, public modalCtrl: ModalController, public navCtrl: NavController, private userprovider: UserProvider) {
    this.isFrench=localStorage.getItem('lang')=='fr'
    if (!localStorage.getItem('user')) {
      this.navCtrl.setRoot('LoginPage')
    }
    this.allstart()
    this.lang = localStorage.getItem('lang');
  }

  noconnexion() {
    this.app.getRootNavs()[0].setRoot('NoInternetPage');
  }
  paiement() {
    const modal = this.modalCtrl.create('WizardHomePage')
    modal.present()
  }
  ionViewDidEnter() {
   console.log(this.videoPlayer)
  }
  ionViewWillEnter(){
    console.log(this.videoPlayer)
  }
  ionViewDidLoad(){
    console.log(this.videoPlayer)
  }

  currentvideo() {
    let user = JSON.parse(localStorage.getItem("user"))
    this.userprovider.currentVideo(user.msisdn, localStorage.getItem('lang')).subscribe(data => {
      this.currentVideo = data
      this.play(this.currentVideo)
      console.log(this.currentVideo)
    }, error => {
      console.log(error)
      this.noconnexion()
    })
  }
  allstart() {
    this.currentvideo()
    this.userprovider.videos(this.page, localStorage.getItem('lang')).subscribe(data => {
      this.videos = this.videos.concat(data['videos'])
      this.totalpage = data['total_videos']
      this.loarder_videos = true
      console.log(data)
    }, error => {
      console.log(error)
      this.noconnexion()
    })
  }

  play(video) {

    let user = JSON.parse(localStorage.getItem("user"))
    this.titre = video.titre
    this.genre = video.nom_genre
    this.description = video.description
    this.vues = video.vues
    this.auteur = video.auteur
    this.date_create = video.date_create
    this.loader_current = true
    if (document.getElementById("video")) {
      this.scrollTo("video")
    }
      let videord = this.videoPlayer.nativeElement;
      this.userprovider.ifAbonned(JSON.parse(localStorage.getItem('user')).login).subscribe(data => {
        this.isAbonned=(data['code_status'] == 1);
        console.log(this.isAbonned)
        if (this.isAbonned) {
          this.userprovider.updatevues(video.id, user.msisdn).subscribe(() => {
            videord.src = 'https://elitoon.com/template/assets/videos/' + video.lien;
            videord.poster = "https://elitoon.com/template/assets/img/preview/" + video.img_video
          }, error => {
            this.noconnexion()
          })
        }
        else {
          videord.src = 'https://elitoon.com/template/assets/videos/extraits/' + video.lien_extrait;
          videord.poster = "https://elitoon.com/template/assets/img/preview/" + video.img_video
        }
      })
      videord.play();


  }
  scrollTo(elementId: string) {
    let y = document.getElementById(elementId).offsetTop;
    this.content.scrollTo(0, y);
  }
  doInfinite(infiniteScroll) {
    this.page = this.page + 1
    if (this.page < this.totalpage) {
      this.userprovider.videos(this.page, localStorage.getItem('lang')).subscribe(data => {
        this.videos = this.videos.concat(data['videos'])
        console.dir(data)
      }, error => {
        this.noconnexion()
      })
    }

    setTimeout(() => {
      infiniteScroll.complete();
    }, 250);
  }
  logout() {
    localStorage.clear()
    this.navCtrl.setRoot('LoginPage')
  }
  search() {
    const modal = this.modalCtrl.create('ListeVideoPage');
    modal.onDidDismiss(data => {
      if (data) {
        this.play(data)
      }

    })
    modal.present();
  }
  doRefresher(event) {
    setTimeout(() => {
      this.allstart()
      event.complete();
    }, 1000);
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
  pub() {
    const modal = this.modalCtrl.create('PubPage')
    modal.present();
  }

}
