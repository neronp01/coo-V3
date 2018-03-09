import { Component, OnInit, HostListener, Input } from '@angular/core';
import { PaymentService } from '../payment.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth.service';
import { Membre } from '../../services/membre.model';


@Component({
  selector: 'make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  @ Input () infoFacture: object;
  @ Input () itemsPaiement: object;
  handler: any;
  constructor(private paymentSvc: PaymentService, private auth: AuthService) { }
  ngOnInit() {
    const temp = this.infoFacture['membre'];
      this.handler = StripeCheckout.configure({
        key: environment.stripeKey,
        image: 'https://firebasestorage.googleapis.com/v0/b/coov2-5f8f7.appspot.com/o/pique.jpg?alt=media&token=26424b30-3d13-4a5b-aa82-31561099dc9d',
        locale: 'auto',
        token: token => {
         this.paymentSvc.processPayment(token, this.infoFacture['montant'], this.infoFacture['numeroFacture'], this.itemsPaiement);
        }
    });
  }
  handlePayment() {
    this.handler.open({
      name: 'Le GrandPic',
      excerpt: 'Paiement',
      amount: this.infoFacture['montant']
    });
    const tempInfoFact = this.infoFacture['membre']['infFacturation'];
    tempInfoFact.push(this.addPaiementItem(this.itemsPaiement, this.infoFacture['montant'],
     this.infoFacture['numeroFacture']));
     this.infoFacture['membre']['infFacturation'] = tempInfoFact;
    this.auth.addUserMembre( this.infoFacture['membre']);
    if (this.infoFacture['membre']['typeCotisation'] === 'familiale') {
      this.auth.addUserConjouint(this.infoFacture['conjouint']);
    }
    console.log('pushh',  this.infoFacture['membre']['infFacturation'], this.infoFacture['membre']);
  }
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }
  addPaiementItem(itemsPaiement: object, amount: number, numberFac: number): object {
    console.log('addItem' , itemsPaiement, amount, numberFac);
    const itemsFacturation = {type: itemsPaiement['type'], tabItems: itemsPaiement['tabItems'],
     montant: amount, numberFac: numberFac};
     return itemsFacturation;
   }
}
