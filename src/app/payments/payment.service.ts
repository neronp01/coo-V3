import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import { InformationService } from '../services/information.service';
export interface Paiement {
  id: number;
  accept?: boolean;
  montant?: number;
  type?: string;
  item?: Array<object>;
}
@Injectable()
export class PaymentService {
  userId: string;
  userEmail: string;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private authS: AuthService, private afs: AngularFirestore) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.userId = auth.uid;
        this.userEmail = auth.email;

      }
    });
  }
  processPayment(token: any, amount: number, numberFac: number, itemsPaiement: object) {

    const montant = amount['montant'];
    const factInfo = {id: 1, montant: 34, type: 'insc' , item: [{isnc: 'blablabla'}]};
    const payment = { token, amount};
    console.log('noFac', numberFac);
    const paiement  = this.afs.doc(`users/${ this.userEmail}/numerosFac/${numberFac}`);
    return paiement.set(payment);
  }
}
