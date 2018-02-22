import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface EmailId {
  id ?: number;
}


@Injectable()
export class EmailIdService {
  private emailIdDoc: AngularFirestoreDocument<EmailId>;
  constructor( private afs: AngularFirestore) {
   }


  get emailId (): Observable<EmailId> | null {
    let newInfo = new Observable<EmailId>();
    this.emailIdDoc = this.afs.doc<EmailId>(`informations/emailId`);
    newInfo = this.emailIdDoc.valueChanges();
    return newInfo;
  }

  updateEmailId(newNumber: EmailId) {
    this.emailIdDoc.update(newNumber);
  }

}
