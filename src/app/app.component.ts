import { Component, ViewChild } from '@angular/core';
import { Platform, App, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
// import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Globalization } from '@ionic-native/globalization';
import {timer} from 'rxjs/observable/timer'



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  lang: string = "fr";
  @ViewChild(Nav) nav: Nav
  showSplash=true
  constructor(private globalization: Globalization, private app: App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private translate: TranslateService, private network: Network) {

    platform.ready().then(() => {
      // if (platform.is('cordova') ) {
      //   this.oneSignal.startInit('f71a4f39-0863-405c-9e39-f97ea7d5c823', '197968046837');

      //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      //   this.oneSignal.handleNotificationReceived().subscribe(() => {});

      //   this.oneSignal.handleNotificationOpened().subscribe((data) => {

      //     let reponse=data.notification.payload.additionalData

      //     if(reponse.params=="paiement"){
      //       this.nav.setRoot('StatusPage',{data:reponse.data})
      //     }else if(reponse.params=="new_video"){
      //       if (localStorage.getItem('user')) {
      //         this.nav.setRoot('TabsPage',{data:reponse.data})
      //       } else {
      //         this.nav.setRoot('LoginPage',{data:reponse.data})
      //       }
      //     }


      //   });

      //   this.oneSignal.endInit();
      // }
      splashScreen.hide();
      timer(400).subscribe(()=>{
        this.showSplash=false
      })
      this.translate.addLangs(["fr", "en"]);

      this.lang = localStorage.getItem('lang');

      if (this.lang != null) {
        this.translate.setDefaultLang(this.lang);
      } else {
        this.globalization.getPreferredLanguage()
        .then(data => {
          localStorage.setItem("lang", data['value'].split("-", 1)[0]);
          this.translate.setDefaultLang(data['value'].split("-", 1)[0]);
        })
        .catch(e=>{
          localStorage.setItem("lang", 'fr');
          this.translate.setDefaultLang('fr');
        })
      }
      if (localStorage.getItem('user')) {
        this.rootPage = 'TabsPage'
      } else {
        this.rootPage = 'LoginPage'
      }

      this.listenConnection();
      statusBar.styleDefault();



    });
  }

  listenConnection() {
    this.network.onDisconnect()
      .subscribe(() => {
        this.app.getRootNavs()[0].setRoot('NoInternetPage');
      });
    this.network.onConnect()
      .subscribe(() => {
        if (localStorage.getItem('user')) {
          this.app.getRootNavs()[0].setRoot('TabsPage');
        } else {
          this.app.getRootNavs()[0].setRoot('LoginPage');
        }

      });
  }

}
