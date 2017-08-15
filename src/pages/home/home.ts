import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogProvider} from '../../providers/log/log';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


	logContent:any;
	logDetail:any;

  constructor(public navCtrl: NavController, public log:LogProvider) {

  	

  	this.log.logSubject.subscribe((logContent) => {

this.logContent = logContent;

console.log("LOG");
console.log(this.logContent[0].name);

});

  }



logDetails(logInfo) {

this.logDetail = logInfo.text;

console.log(this.logDetail.text);

}


ionViewDidLoad() {

this.log.emitLogs();




}


}
