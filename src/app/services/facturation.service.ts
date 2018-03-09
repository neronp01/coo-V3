import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Facture } from './facture.model';

export interface Numerotation {
  noFacture ?: number;
  noEmail ?: number;
}


@Injectable()
export class FacturationService {
  private noFactureDoc: AngularFirestoreDocument<Numerotation>;
  constructor( private afs: AngularFirestore) {
   }


  get nofacture (): Observable<Numerotation> | null {
    let newInfo = new Observable<Numerotation>();
    this.noFactureDoc = this.afs.doc<Numerotation>(`informations/numerotation`);
    newInfo = this.noFactureDoc.valueChanges();
    return newInfo;
  }

  updateNoFacture(newNumber: Numerotation) {
    this.noFactureDoc.update(newNumber);
  }

}
