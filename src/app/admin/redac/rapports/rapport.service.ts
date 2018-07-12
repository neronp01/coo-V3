import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RapportService {
  orders: Observable<any>;
  reportsRef: AngularFirestoreCollection<any>;
  reports: Observable<any>;
  constructor(private afs: AngularFirestore) {
    this.orders = this.afs.collection('reports').valueChanges();
    this.reportsRef = this.afs.collection('reports');

    this.reports = this.reportsRef
      .snapshotChanges().map(arr => {
      return arr.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        console.log('rapports' , id, data);
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
}
