import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';

export interface Information {
  CotisationIndividuelle ?: number;
  calendrier ?: number;
  cotisationFamiliale ?: number;
  cotisationOrganisme ?: number;
  fraisDePosteOrnitaouais ?: number;
  fraisEnvoiCalendrier ?: number;
  fraisEnvoiGuide ?: number;
  guideDesSites ?: number;
  tps ?: number;
  tvq ?: number;
}

@Injectable()
export class InformationService {
  infoDoc:  AngularFirestoreDocument<object>;
  roleDoc:  AngularFirestoreDocument<object>;
infoCotisation: object;
  fraisDePosteOrnitaouais: number;

  constructor( private dbc: AngularFirestore) {
    this.info.subscribe( x => {
      this.infoCotisation = {familiale: x['cotisationFamiliale'],
        individuelle: x['CotisationIndividuelle'], organisme: x['cotisationOrganisme'] };
      this.fraisDePosteOrnitaouais = x['fraisDePosteOrnitaouais'];
    });
  }

  get info(): Observable<object> {
    let newInfo = new Observable<object>();
    this.infoDoc = this.dbc.doc<object>('informations/prix');
    newInfo = this.infoDoc.valueChanges();
    return newInfo;
  }
  prixAbonement(a: string): number {
    let prix: number;
    const tabPrix = [];
    let cotisation: string;
    switch (a) {
      case 'familiale': cotisation = 'cotisationFamiliale';
      break;
      case 'individuelle': cotisation = 'CotisationIndividuelle';
        break;
      case 'organisme': cotisation = 'cotisationOrganisme';
        break;
    }
    this.info.subscribe( x => {
      prix =  x[cotisation];
    });
    return prix;
  }
  get infoRole(): Observable<any> {
    let newInfo = new Observable<any>();
    this.roleDoc = this.dbc.doc<object>('informations/role');
    return newInfo = this.roleDoc.valueChanges();
  }

  updateRole( role: object) {
    this.roleDoc = this.dbc.doc<object>('informations/role');
    this.roleDoc.update(role)
  }
}
