import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { RapportService } from '../rapport.service';

@Component({
  selector: 'app-report-link',
  templateUrl: './report-link.component.html',
  styleUrls: ['./report-link.component.css']
})
export class ReportLinkComponent implements OnInit {
  @Input() report: any;
  profileUrl: Observable<string | null>;
  pathUrl: string;
  downloadUrl: Observable<string|null>;
  task: AngularFireUploadTask;
  constructor(private storage: AngularFireStorage) {
    console.log('rapport__' , this.report);
    // const ref = this.storage.ref(`reports/${this.report.id}.csv`);
    // this.profileUrl = ref.getDownloadURL();
   }

  ngOnInit() {

    // console.log(reportRef);
    // const promise = reportRef.getDownloadURL();
    // const customMetadata = { app: 'My AngularFire-powered PWA!' };
    // this.task = this.storage.upload(path, reportRef, { customMetadata });

   // this.downloadUrl = Observable.fromPromise(promise);
  }
  test() {
  console.log('test' , this.report);
}
}
