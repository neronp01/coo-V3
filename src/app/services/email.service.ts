import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmailService {
email: string;
emailDoc:  AngularFirestoreDocument<any>;
sendEmailDoc:  AngularFirestoreDocument<any>;


  constructor( private dbc: AngularFirestore) {
    this.emailDoc = this.dbc.doc<any>('informations/numerotation');
   }
    setEmail(e: string) {
    this.email = e;
}

get getEmailNumber(): Observable<any> {
  let newInfo = new Observable<any>();
  newInfo = this.emailDoc.valueChanges();
  return newInfo;
}
UpdateEmailNumber(a: number) {
  const noEmail = a;
this.emailDoc.update({noEmail});
}
 setSendEmail(noEmail: number, user: string , email: object) {
   this.sendEmailDoc = this.dbc.doc<any>(`/users/${user}/emails/${noEmail}`);
   this.sendEmailDoc.set(email);
 }
}
