import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoInternetPage } from './no-internet';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NoInternetPage,
  ],
  imports: [
    IonicPageModule.forChild(NoInternetPage),
    TranslateModule.forChild()
  ],
})
export class NoInternetPageModule {}
