import { Component, OnInit, HostListener, Input} from '@angular/core';
import { PaymentService } from '../payment.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth.service';
import { Membre } from '../../services/membre.model';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { InformationService} from '../../services/information.service';
import { MessagesService } from '../../services/messages.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  @ Input () infoFacture: object;
  @ Input () itemsPaiement: object;
  @ Input () infoPersoFormGroup: FormGroup;
  handler: any;
  membre: Membre;
  fr = moment.locale('fr');
  constructor(private paymentSvc: PaymentService, private router: Router, private auth: AuthService, private inf: InformationService,
  private message: MessagesService) {
    window.scroll(0, 0);
  }
  ngOnInit() {
    const temp = this.infoFacture['membre'];
      this.handler = StripeCheckout.configure({
        key: environment.stripeKey,
        image: 'https://firebasestorage.googleapis.com/v0/b/coov2-5f8f7' +
        '.appspot.com/o/pique.jpg?alt=media&token=26424b30-3d13-4a5b-aa82-31561099dc9d',
        locale: 'auto',
        token: token => {
          token['card']['country'] = 'CA';
          token['card']['currency'] = 'CAD';
         this.paymentSvc.processPayment(token, this.infoFacture['montant'], this.infoFacture['numeroFacture'], this.itemsPaiement);
        }
    });
  }
  handlePayment() {
    this.handler.open({
      name: 'Le GrandPic',
      excerpt: 'Paiement',
      currency: 'cad',
      country: 'ca',
      amount: this.infoFacture['montant']
    });
    this.auth.updateMembre(this.updateMembreWithItem);
    setTimeout(() => {
      const tempInfoFact = this.infoFacture['membre']['infFacturation'];
      tempInfoFact.push(this.addPaiementItem(this.itemsPaiement, this.infoFacture['montant'],
       this.infoFacture['numeroFacture']));
       this.infoFacture['membre']['infFacturation'] = tempInfoFact;
      this.auth._membre( this.infoPersoFormGroup);
      if (this.infoFacture['membre']['typeCotisation'] === 'familiale') {
        this.infoFacture['conjouint']['infFacturation'].pop();
        this.auth.addUserConjouint(this.infoFacture['conjouint']);
      }
    }, 1000);

  }
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }
  addPaiementItem(itemsPaiement: object, amount: number, numberFac: number): object {
    const date = Date.now();
    const typeCotisation =  this.infoPersoFormGroup.get('typeCotisationCtrl').value;
    const prixCotisation = this.inf.getPrixAbonement(typeCotisation);
    const dateFormat = moment(date).format('dddd, Do MMMM YYYY');
    const itemsFacturation = {date: dateFormat, type: itemsPaiement['type'], tabItems: itemsPaiement['tabItems'],
     montant: amount, numberFac: numberFac};
     return itemsFacturation;
   }
   get updateMembreWithItem(): Membre {
    const memb: Membre = this.infoFacture['membre'];
    memb.infFacturation.push(this.addPaiementItem(this.itemsPaiement, this.infoFacture['montant'],
    this.infoFacture['numeroFacture']));
    return memb;
   }
}
