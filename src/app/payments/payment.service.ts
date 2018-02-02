import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';

@Injectable()
export class PaymentService {
  userId: string;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private authS: AuthService) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.userId = auth.uid;
      }
    });
  }
  processPayment(token: any, amount: number) {
    console.log('ici-------------', token, amount);
    const payment = { token, amount };
    return this.db.list(`/payments/${this.userId}`).push(payment);
  }
}
