import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, LoadingController } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-uploadimage',
  templateUrl: 'uploadimage.html',
})
export class UploadimagePage {

	lastImage: any = null;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,

  	public toastCtrl: ToastController,
  	public platform: Platform,
  	public loadingCtrl: LoadingController,

  	private file: File,
  	private filepath: FilePath,
  	private filetransfer: FileTransfer,
  	private camera: Camera

  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadimagePage');
  }

 
	private presentToast(text) {
	  let toast = this.toastCtrl.create({
	    message: text,
	    duration: 3000,
	    position: 'top'
	  });
	  toast.present();
	}

  	// open camera
  	cam() {
		this.takePicture(this.camera.PictureSourceType.CAMERA);
	}

	// open library
	lib() {
		this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
	}

	public takePicture(sourceType) {
	  // Create options for the Camera Dialog
	  var options = {
	    quality: 100,
	    sourceType: sourceType,
	    saveToPhotoAlbum: true,
	    correctOrientation: true
	};
 
	  // Get the data of an image
	  this.camera.getPicture(options).then((imagePath) => {
	  	let loading = this.loadingCtrl.create({
	    	content: 'Loading...'
	  	});
	  	loading.present();
	    // Special handling for Android library
	    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
	      this.filepath.resolveNativePath(imagePath)
	        .then(filepath => {
	          let correctPath = filepath.substr(0, filepath.lastIndexOf('/') + 1);
	          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
	          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	        });
	    } else {
	      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
	      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
	      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	    }
	    loading.dismiss();
	  }, (err) => {
	    this.presentToast('Error while selecting image.');
	  });
	}

	// Create a new name for the image
	private createFileName() {
	  var newFileName =  "uploadimage" + ".jpg";
	  return newFileName;
	}
 
	// Copy the image to a local folder
	private copyFileToLocalDir(namePath, currentName, newFileName) {
	  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
	    this.lastImage = newFileName;
	  }, error => {
	    this.presentToast('Error while storing file.');
	  });
	}
 
	// Always get the accurate path to apps folder
	public pathForImage(img) {
	  if (img === null) {
	    return '';
	  } else {
	    return cordova.file.dataDirectory + img;
	  }
	}

	// Upload image function
	uploadimg() {

		var uploadimageurl; // Upload image url from provider

		// Create loading
		let loading = this.loadingCtrl.create({
	      content: 'Uploading Image...'
	    });
	    loading.present();

		let targetPath = this.pathForImage(this.lastImage);
	  	let filename = this.lastImage;
	  	let options = {
	  		fileKey: "file",
	  		fileName: filename,
	  		chunkedMode: false,
	  		mimeType: "multipart/form-data",
	  		params:  {'fileName': filename}
	  	} ;
		const ftransfer: FileTransferObject = this.filetransfer.create();
		// Use the FileTransfer to upload the image on server
		ftransfer.upload(targetPath, uploadimageurl, options).then(data => {
		  // console.log(data);
		  loading.dismiss()
		  this.presentToast('Image uploaded succesfully.');
		}, err => {
		  loading.dismiss()
		  this.presentToast('Error while uploading image.');
		});

	}



}
