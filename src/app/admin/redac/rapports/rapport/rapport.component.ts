import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {
  test = 'https://firebasestorage.googleapis.com/v0/b/coov3-f509c.appspot.com/o/reports%2Fy5r3OZYee5cLcoJAy0x4.csv?alt=media&token=12a78a58-13be-4480-9d1b-c42c2a4f9c5a';
  $rapport: BehaviorSubject<Array<string>>;
  profileUrl: Observable<string | null>;
  downloadUrl: Observable<string>;
  rapports= [];
  orders: Observable<any>;
  reportsRef: AngularFirestoreCollection<any>;
  reports: Observable<any|null>;
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    const path = 'reports/5Lg9dPTXoStPZQdBNKE6.csv';

     const ref = this.storage.ref('reports/5Lg9dPTXoStPZQdBNKE6.csv');
     this.profileUrl = ref.getDownloadURL();
  //   this.downloadUrl = Observable.fromPromise(this.profileUrl);
     console.log('path', this.profileUrl);
  }
  ngOnInit() {
    this.reportsRef = this.afs.collection('reports');
    this.$rapport = new BehaviorSubject(this.rapports);
    // Map the snapshot to include the document ID
    this.reports = this.reportsRef
      .snapshotChanges().map(arr => {
      return arr.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        const file = { ...data, id };
        const filePath = `reports/${id}.csv`;
        const fileRef = this.storage.ref(filePath);
        this.profileUrl = fileRef.getDownloadURL();
        this.profileUrl.subscribe( x => {
          this.rapports.push(x);
          this.$rapport.next(this.rapports);
          console.log('xxxx' , x);
        });
        //https://firebasestorage.googleapis.com/v0/b/coov3-f509c.appspot.com/o/reports%2Fy5r3OZYee5cLcoJAy0x4.csv?alt=media&token=12a78a58-13be-4480-9d1b-c42c2a4f9c5a
        //https://firebasestorage.googleapis.com/v0/b/coov3-f509c.appspot.com/o/reports%2Fy5r3OZYee5cLcoJAy0x4.csv?alt=media&token=12a78a58-13be-4480-9d1b-c42c2a4f9c5a
        //  const task = this.storage.upload(filePath, file);
     //   const test =  Observable.fromPromise(fileRef.getDownloadURL());
        console.log('down' ,  this.profileUrl);
      //  get notified when the download URL is available
        // snap.snapshotChanges().pipe(
        //     finalize(() => this.downloadUrl = fileRef.getDownloadURL() )
        //  )
        // .subscribe();
        return { ...data, id };
      });
    });
  }
  requestReport() {
    const data = {
      status: 'processing',
      createdAt: new Date()
    };
    this.reportsRef.add(data);
  }
  getUrl(report: any) {

  }
  trackCSV(index, rapport) {


  }
}
