import { Component, OnInit, HostListener, Input } from '@angular/core';
import { PaymentService } from '../payment.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  @ Input () infoFacture: object;
  handler: any;
  constructor(private paymentSvc: PaymentService, private auth: AuthService) { }
  ngOnInit() {
      this.handler = StripeCheckout.configure({
        key: environment.stripeKey,
        image: 'https://firebasestorage.googleapis.com/v0/b/coov2-5f8f7.appspot.com/o/pique.jpg?alt=media&token=26424b30-3d13-4a5b-aa82-31561099dc9d',
        locale: 'auto',
        token: token => {
         this.paymentSvc.processPayment(token, this.infoFacture['montant']);
        }
    });
  }
  handlePayment() {
    this.handler.open({
      name: 'Le GrandPic',
      excerpt: 'Paiement',
      amount: this.infoFacture['montant']
    });
    this.auth.addUserMembre( this.infoFacture['membre']);
    console.log('type' , this.infoFacture['membre']['typeCotisation'], this.infoFacture);
    if (this.infoFacture['membre']['typeCotisation'] === 'familiale') {
      this.auth.addUserConjouint(this.infoFacture['conjouint']);
    }
  }
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }
}
