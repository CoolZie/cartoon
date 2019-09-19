import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeVideoPage } from './liste-video';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListeVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeVideoPage),
    TranslateModule.forChild()
  ],
})
export class ListeVideoPageModule {}
