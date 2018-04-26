import { Component, OnInit } from '@angular/core';
import { OrnitaouaisService, Ornitaouais } from '../ornitaouais.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-ornitho',
  templateUrl: './ornitho.component.html',
  styleUrls: ['./ornitho.component.css']
})
export class OrnithoComponent implements OnInit {
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  snapshot: Observable<any>;
  ornitoTab = [];
  _orni: Ornitaouais[];
  constructor(private orni: OrnitaouaisService, private storage: AngularFireStorage) {
    setTimeout(() => {
      this._orni = orni.orni;
      console.log('inter', this._orni);
    }, 500);
  }

  ngOnInit() {
this.getOrnitoTable();
  }

  getOrnitoTable() {
this.orni.ornitaouais.forEach( x => {
  x.forEach( y => {
    // Get the download URL
    const path = `${y['path']}`;
    const file = this.storage.ref(path);
    console.log('ornito' , this.storage, path);
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
  //  this.task = this.storage.upload(path, file, { customMetadata });
   // this.downloadURL = this.task.downloadURL();
 //   this.ornitoTab.push({downLoad: this.downloadURL, data: y });
  });
});
  }
}
