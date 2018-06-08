import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TruncateModule } from '@yellowspot/ng-truncate';

import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ReadmorelessPage } from '../pages/readmoreless/readmoreless';
import { UploadimagePage } from '../pages/uploadimage/uploadimage';
import { UploadvideoPage } from '../pages/uploadvideo/uploadvideo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReadmorelessPage,
    UploadimagePage,
    UploadvideoPage
  ],
  imports: [
    BrowserModule,
    TruncateModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReadmorelessPage,
    UploadimagePage,
    UploadvideoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileTransfer,
    FilePath,
    Camera,
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
