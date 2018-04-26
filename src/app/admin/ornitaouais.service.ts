import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface Ornitaouais {
  date: Date;
  numero: number;
  path: string;
  data: Array<string>;
  volume: number;
  downLoadPath: string;

}

@Injectable()
export class OrnitaouaisService {
  private orniCollection: AngularFirestoreCollection<Ornitaouais>;
  ornitaouais: Observable<Ornitaouais[]>;
  ornitao: BehaviorSubject<Ornitaouais[]|null>;
  orni: Ornitaouais[];
  dateFilter$: BehaviorSubject<string|null>;
  constructor(private afs: AngularFirestore) {
    this.ornitao = new BehaviorSubject(null);
    this.orniCollection = afs.collection<Ornitaouais>('ornitaouais', ref => ref.orderBy('date', 'desc'));
    this.ornitaouais = this.orniCollection.valueChanges();
    this.ornitaouais.subscribe( x => {
      this.orni = x;
      this.ornitao.next(x);
    });
  }
}
