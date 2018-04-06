import { Component, OnInit, Input} from '@angular/core';
import { InformationService, Information} from '../../services/information.service';
import { Membre} from '../../services/membre.model';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import { AuthService} from '../../auth.service';
import { FacturationService , Numerotation } from '../../services/facturation.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { EmailIdService } from '../../services/email-id.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';




@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
  providers: [ InformationService, ConfigService ]
})
export class FactureComponent implements OnInit {
  @ Input() infMembre: Membre;
  @ Input() infConjouint: Membre;
  @ Input () itemsFacturation: object;
  @ Input () infoPersoFormGroup: FormGroup;
  itemsPaiement= {type: 'adhesion', tabItems: []};
  noFacture: number;
  count = 0; // ceci permet de pas enregistrer plusieurs noFacture;
  montant: BehaviorSubject<number>;
  infoFacture = {montant: 0};
  typeCotisation: number;
  infoCotisation: object;
  courriel: string;
  fraisPost: number;
  total: number;
  typeAbonement: string;
  rowspan = 8;
  factObect = {};
  membre: Membre;
  takeOneItem= 0;
  listeItem = {typeCotisation: 0, don: 0, fraisDePosteOrnitaouais: 0};
  constructor( private inf: InformationService, private auth: AuthService, private fac: FacturationService,
     private http: HttpClient, private conf: ConfigService, private emailId: EmailIdService) {
    const numbers = Observable.timer(0, 1000); // Call after 10 second.. Please set your time
    numbers.subscribe(x => {
     if (x > 1) {
        this.infoFacture['conjouint'] = this.infConjouint ? this.infConjouint : {};
        this.addItem('typeCotisation', this.inf.infoCotisation[this.infMembre['typeCotisation']]);
        this.montant.next(this.total * 100);
        this.typeCotisation = this.inf.infoCotisation[this.infMembre['typeCotisation']];
        this.membre = this.auth.userToken['membre'];
        this.aUneAdhesion(this.membre);
        this.infoFacture['numeroFacture'] = this.noFacture;
        this.infoCotisation = this.inf.infoCotisation;
        this.fraisPost = this.inf.fraisDePosteOrnitaouais;
     }
    //  this.infoCotisation = this.inf.infoCotisation;
    });
    this.montant = new BehaviorSubject(0);
    this.montant.subscribe( y => {
      this.infoFacture['montant'] = y;
    });

  }
  itemFactureCotisation() {

    switch (this.infMembre['typeCotisation']) {
case 'familiale' :
this.itemsPaiement = {type: 'adhesion', tabItems: [{
     id: 2, nom: 'Cotisation familiale', montant: this.inf.cotFamillial}] };
     break;
     case 'individuelle' :
     this.itemsPaiement = {type: 'adhesion', tabItems: [{
      id: 1, nom: 'Cotisation individuelle', montant: this.inf.cotInd}] };
      break;
      case 'organisme' :
      this.itemsPaiement = {type: 'adhesion', tabItems: [{
      id: 3, nom: 'Cotisation organisme', montant: this.inf.cotOrg}] };
      break;
    }

console.log('cotisation____', this.infMembre['typeCotisation'], this.itemsPaiement );
  }
  // if (e.value === 'familiale' ) {
  //   this.itemsFacturation = {type: 'adhesion', tabItems: [{
  //     id: 2, nom: 'Cotisation familiale', montant: this.inf.cotFamillial}] };
  //   if (this.membre.membre['courrielConjouint'] === '') {
  //     this.initialisationConjouint();
  //   }
  // } else if (e.value === 'individuelle') {
  //   this.itemsFacturation = {type: 'adhesion', tabItems: [{
  //     id: 2, nom: 'Cotisation individuelle', montant: this.inf.cotInd}] };
  // } else {
  //   this.itemsFacturation = {type: 'adhesion', tabItems: [{
  //     id: 2, nom: 'Cotisation organisme', montant: this.inf.cotOrg}] };
  // }

  ngOnInit() {


   // this.itemsPaiement = this.itemsFacturation;

    this.infoFacture['membre'] = this.infMembre;
    this.total = 0;
    this.fac.nofacture.take(1).subscribe( x => {

      if (this.count === 0 ) {
        const noEmail = x['noEmail'];
        this.noFacture = x['noFacture'] + 1;
        this.updateNoFacture({ noFacture: this.noFacture, noEmail: noEmail });
        this.count++;
      }
    });
  }

  aUneAdhesion(oldData: Membre) {
    const tab = Object.getOwnPropertyNames(oldData);
    const tabFact = Object.getOwnPropertyNames(oldData);
    // S'il y a une date d'adésion dans la base de donné, les données doivent être conservé.
    if (tab.includes('adhDate')) {
      this.infoFacture['membre']['adhDate'] = oldData.adhDate;
      this.infoFacture['conjouint']['adhDate'] = oldData.adhDate;
    }
      this.infoFacture['membre']['infFacturation'] = oldData.infFacturation;
      this.infoFacture['conjouint']['infFacturation'] = oldData.infFacturation;
  }
  updateNoFacture(a: Numerotation) {
    this.fac.updateNoFacture(a);
  }
  onKey(e: any ) {
    this.listeItem['don'] = Number(e);
    this.addItem('don', Number(e));
    this.montant.next(this.total * 100);
  }
  addItem( key: string, value: number) {
    this.listeItem[key] = value;
    this.total = this.listeItem['typeCotisation']
     + this.listeItem['don']
     + this.listeItem['fraisDePosteOrnitaouais'];
  }
  addFraiOrnitouais(e) {
    if (e.checked) {
    this.addItem('fraisDePosteOrnitaouais', this.inf.fraisDePosteOrnitaouais);
    this.itemsPaiement['tabItems'].push({id: 4, nom: 'frais de poste Ornitaouais', montant: this.inf.fraisDePosteOrnitaouais});
    } else {
      this.itemsPaiement['tabItems'].pop();
      this.addItem('fraisDePosteOrnitaouais', 0);
    }
    this.montant.next(this.total * 100);
  }
  test() {
  }
  mouseover_Card() {
    if (this.takeOneItem === 0) {
    this.itemFactureCotisation();
    this.takeOneItem++;
}
  }
}
