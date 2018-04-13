import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class MessagesService {
message: BehaviorSubject<string>;
messageRemerciement = 'Ceci est un test';
  constructor() {
    this.message = new BehaviorSubject('');
   }

}
