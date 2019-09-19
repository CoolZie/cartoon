import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WizardHomePage } from './wizard-home';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WizardHomePage,
  ],
  imports: [
    IonicPageModule.forChild(WizardHomePage),
    TranslateModule.forChild(),
  ],
})
export class WizardHomePageModule {}
