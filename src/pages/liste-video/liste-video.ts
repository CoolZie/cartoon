import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ListeVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-video',
  templateUrl: 'liste-video.html',
})
export class ListeVideoPage {

  page: number = 1;
  videos = [];
  totalpage: number = 1
  loading: boolean = true
  searchvideo=[];
  constructor(private app: App,private userprovider: UserProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

  }

  noconnexion(){
    this.app.getRootNavs()[0].setRoot('NoInternetPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeVideoPage');
    this.allstart()
  }
  allstart(){
    this.userprovider.videos(this.page,localStorage.getItem('lang')).subscribe(data => {
      this.loading = false
      console.log(this.loading)
      this.videos = this.videos.concat(data['videos'])

      this.searchvideo = this.searchvideo.concat(data['videos'])
      this.totalpage = data['total_videos']


      console.dir(data)


    },(error)=>{
      this.noconnexion()
    })
  }
  reseatVideo() {
    this.videos = this.searchvideo
  }

  getVideo(ev:any) {
    this.reseatVideo()
    let serVal =ev.target.value;
    console.log( this.videos)
    if(serVal && serVal.trim() != ''){
      console.log( this.videos)
      this.videos = this.videos.filter((video)=>{
        return ((video.auteur.toLowerCase().indexOf(serVal.toLowerCase()) >-1)  || (video.titre.toLowerCase().indexOf(serVal.toLowerCase()) >-1)|| (video.nom_genre.toLowerCase().indexOf(serVal.toLowerCase()) >-1));
      })
    }
  }

  hideModal(video) {
    this.viewCtrl.dismiss(video);
  }
  doInfinite(infiniteScroll) {

    this.page = this.page + 1
    console.log('Begin async operation');
    if (this.page < this.totalpage) {
      this.userprovider.videos(this.page,localStorage.getItem('lang')).subscribe(data => {
        this.videos = this.videos.concat(data['videos'])
        this.searchvideo = this.videos.concat(data['videos'])

        console.dir(data)
      },error=>{
        this.noconnexion()
      })
    }
    setTimeout(() => {

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  doRefresher(event) {
    setTimeout(() => {
      event.complete();
    }, 1000);
  }
}
