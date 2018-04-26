import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface Evenements {
  date: Date;
  user: string;
  titre: string;
  setup: object;
  path: string;
  texte: string;
  downLoadPath: string;
}

@Injectable()
export class EvenementsService {
  private evenementsCollection: AngularFirestoreCollection<Evenements>;
  evenements: Observable<Evenements[]>;
  evenements$: BehaviorSubject<Evenements[]|null>;
  events: Evenements[];
  dateFilter$: BehaviorSubject<string|null>;
  constructor(private afs: AngularFirestore) {
    this.evenements$ = new BehaviorSubject(null);
    this.evenementsCollection = afs.collection<Evenements>('evenements', ref => ref.orderBy('date', 'desc'));
    this.evenements = this.evenementsCollection.valueChanges();
    this.evenements.subscribe( x => {
      this.events = x;
      this.evenements$.next(x);
    });
  }
}

