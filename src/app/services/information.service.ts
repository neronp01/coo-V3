import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import { Item } from './item.model';

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
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  tabItem: Array<object>;
infoCotisation: object;
  fraisDePosteOrnitaouais: number;
  constructor( private dbc: AngularFirestore) {
    this.listItem();

  }
getInfoFactureAdhesion() {

  let cotFam: number;
  let cotInd: number;
  let cotCor: number;
  this.tabItem.forEach( x => {
    switch ( x['nom'] ) {
      case 'cotisationFamiliale':
      cotFam = x['prix'];
      break;
      case 'cotisationIndividuelle':
      cotInd = x['prix'];
      break;
      case 'cotisationOrganisme':
      cotCor = x['prix'];
      break;
      case 'ornitaouais':
      this.fraisDePosteOrnitaouais = x['prix'];
      break;
    }
  });
  this.infoCotisation = {familiale: cotFam, individuelle: cotInd, organisme: cotCor };
}
  get info(): Observable<object> {
    let newInfo = new Observable<object>();
    this.infoDoc = this.dbc.doc<object>('informations/prix');
    newInfo = this.infoDoc.valueChanges();
    return newInfo;
  }
  get itemsInfo(): Observable<Item[]> {
    let listeItem = new Observable<Item[]>();
    this.itemsCollection = this.dbc.collection<Item>('informations/listeItemes/itemes');
    this.items = this.itemsCollection.valueChanges();
    listeItem = this.items;
    return listeItem;
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
listItem() {
  this.itemsInfo.subscribe( x => {
    this.tabItem = x;
    this.getInfoFactureAdhesion();
  });
}
  updateRole( role: object) {
    this.roleDoc = this.dbc.doc<object>('informations/role');
    this.roleDoc.update(role);
  }
}
