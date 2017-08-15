import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { DataProvider} from '../data/data';

/*
  Generated class for the LogProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LogProvider {


	logSubject: any = new Subject(); 

  constructor(public http: Http, public DBdata: DataProvider, public zone: NgZone) {


  	this.DBdata.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
           if(change.doc.type === 'report'){
                this.emitLogs();
          }
        });



    console.log('Hello LogProvider Provider');
  }




emitLogs(): void {

  this.zone.run(() => {

          

this.DBdata.db.createIndex({
  index: {fields: ['type']}
})

 this.DBdata.db.find({
  selector: {
    type: 'report'
    
  }
}).then((data) => {



     let Reports = data.docs.map(row => {
                  return row;
                          });


     console.log(Reports);

           this.logSubject.next(Reports);

                  });   // << Promise End 


          
        }); // << Zone End
 




}


}
