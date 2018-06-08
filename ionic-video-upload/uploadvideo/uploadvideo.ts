import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

@IonicPage()
@Component({
  selector: 'page-uploadvideo',
  templateUrl: 'uploadvideo.html',
})
export class UploadvideoPage {

	currentName: any = null;
	correctPath: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private filechooser: FileChooser, private filetransfer: FileTransfer, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadvideoPage');
  }

  	private presentToast(text) {
	  let toast = this.toastCtrl.create({
	    message: text,
	    duration: 3000,
	    position: 'top'
	  });
	  toast.present();
	}

  	lib() {
     this.filechooser.open()
	  .then(uri => {
	      this.currentName = uri.substr(uri.lastIndexOf('/') + 1);
	      this.correctPath = uri;
        },
	  ).catch(e => 
	    this.presentToast('Error while selecting video.')
	  );
	}

	uploadVideo() {

		var uploadimageurl; // Upload video url from provider

		let loading = this.loadingCtrl.create({
	      content: 'Uploading Video...'
	    });
	    loading.present();	
		//Uploading Video
		let targetPath = this.correctPath;
	  	let filename = "uploadvideo" + ".mp4";
	  	let options = {
	  		fileKey: "file",
	  		fileName: filename,
	  		chunkedMode: false,
	  		mimeType: "multipart/form-data",
	  		params:  {'fileName': filename}
	  	};
	  	const ftransfer: FileTransferObject = this.filetransfer.create();
		// Use the FileTransfer to upload the Video on server
		ftransfer.upload(targetPath, uploadimageurl, options).then(data => {
		  loading.dismiss()
		  this.presentToast('Video uploaded succesfully.');
		}, err => {
		  loading.dismiss()
		  this.presentToast('Error while uploading file.');
		});
	}

}
