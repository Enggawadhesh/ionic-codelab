import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadmorelessPage } from './readmoreless';

@NgModule({
  declarations: [
    ReadmorelessPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadmorelessPage),
  ],
})
export class ReadmorelessPageModule {}
