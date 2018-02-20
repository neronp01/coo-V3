import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Facture } from './facture.model';

export interface NoFacture {
  numero ?: number;
}


@Injectable()
export class FacturationService {
  private noFactureDoc: AngularFirestoreDocument<NoFacture>;
  constructor( private afs: AngularFirestore) {
   }


  get nofacture (): Observable<NoFacture> | null {
    let newInfo = new Observable<NoFacture>();
    this.noFactureDoc = this.afs.doc<NoFacture>(`informations/factures`);
    newInfo = this.noFactureDoc.valueChanges();
    return newInfo;
  }

  updateNoFacture(newNumber: NoFacture) {
    this.noFactureDoc.update(newNumber);
  }

}
