import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TruncateModule } from '@yellowspot/ng-truncate';

/**
 * Generated class for the ReadmorelessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-readmoreless',
  templateUrl: 'readmoreless.html',
})
export class ReadmorelessPage {

	@Input() text: string;
	@Input() limit: number = 25;
	truncating = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadmorelessPage');
  }

}
