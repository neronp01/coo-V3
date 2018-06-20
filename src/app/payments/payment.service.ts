import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService, User } from '../auth.service';
import { InformationService } from '../services/information.service';
import { MessagesService } from '../services/messages.service';

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
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private authS: AuthService, private afs: AngularFirestore,
     private message: MessagesService) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.userId = auth.uid;
        this.userEmail = auth.email;

      }
    });
  }
  processPayment(token: any, _amount: number, numberFac: number, itemsPaiement: object) {
    const temp = _amount / 1.029;
    const amount =  Math.round(_amount / 1.029 - 30);
    const payment = { token, amount};
    const paiement  = this.afs.doc(`users/${ this.userEmail}/numerosFac/${numberFac}`);
    this.remerciement();
    return paiement.set(payment);
  }

  remerciement() {
    setTimeout(() => {
      this.message.message.next('remerciement');
    }, 1000);
  }
}
