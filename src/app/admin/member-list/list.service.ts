import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import * as moment from 'moment';

export interface LMembres {
  photo: string;
  prenom: string;
  nom: string;
  tel: string;
  email: string;
}

@Injectable()
export class ListService {
  private listeMembreCollection: AngularFirestoreCollection<LMembres>;
  membres: Observable<LMembres[]>;
  membre: BehaviorSubject<LMembres[]|null>;
  _membre: LMembres[];
  dateFilter$: BehaviorSubject<string|null>;
  constructor(private afs: AngularFirestore) {
    this.membre = new BehaviorSubject(null);
    this.listeMembreCollection = afs.collection<LMembres>('users', ref => ref.orderBy('displayName', 'asc'));
    this.membres = this.listeMembreCollection.valueChanges();
    this.membres.map( (list) => {
      list = list.map( item => {
        const dateNow = Date.now();
        if (moment(item['membre']['adhDate']).isBefore(moment(dateNow).format('YYYYMMDD'))) {
          return null;
        } else {
          if (item['membre']['nomListe']) {
            return {
              photo: item['photoURL'],
              prenom: item['membre']['prenom'],
              nom: item['membre']['nom'],
              tel: item['membre']['teleList'] ? item['membre']['telephone'] : '',
              email: item['email']
            };
          } else {
            return null;
          }
        }
      }).filter( items => {
         return items !== null; }
        );
        console.log('mapList', list);
        this.membre.next(list);
    }
    ).subscribe( x => {
    //  this._membre = x;
   //   this.membre.next(mapList);
    });
   }

}
