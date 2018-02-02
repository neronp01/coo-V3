import { Component, OnInit, Input} from '@angular/core';
import { InformationService, Information} from '../../services/information.service';
import { Membre} from '../../services/membre.model';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { AuthService} from '../../auth.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
  providers: [ InformationService ]
})
export class FactureComponent implements OnInit {
  @ Input() infMembre: Membre;
  @ Input() infConjouint: Membre;
  montant: BehaviorSubject<number>;
  infoFacture = {montant: 0};
  typeCotisation: number;
  infoCotisation: object;
  courriel: string;
  fraisPost;
  total: number;
  typeAbonement: string;
  rowspan = 8;
  listeItem = {typeCotisation: 0, don: 0, fraisDePosteOrnitaouais: 0};
  constructor( private inf: InformationService, private auth: AuthService) {
    const numbers = Observable.timer(0, 1000); // Call after 10 second.. Please set your time
    numbers.subscribe(x => {
     if (x > 1) {
       if (this.infMembre['typeCotisation'] !== undefined) {
        this.addItem('typeCotisation', this.inf.infoCotisation[this.infMembre['typeCotisation']]);
        this.montant.next(this.total * 100);
        this.typeCotisation = this.inf.infoCotisation[this.infMembre['typeCotisation']];
        this.infoFacture['membre'] = this.infMembre;
        this.infoFacture['conjouint'] = this.infConjouint;
       }
     }
      this.infoCotisation = this.inf.infoCotisation;
    });
    this.montant = new BehaviorSubject(0);
    this.montant.subscribe( y => {
      this.infoFacture['montant'] = y;
    });
  }

  ngOnInit() {
    this.total = 0;
  }
  onKey(e: any ) {
    this.listeItem['don'] = Number(e);
    this.addItem('don', Number(e));
    this.montant.next(this.total * 100);
  }
  addItem( key: string, value: number) {
    this.listeItem[key] = value;
    this.total = this.listeItem['typeCotisation'] + this.listeItem['don'] + this.listeItem['fraisDePosteOrnitaouais'];
  }
  addFraiOrnitouais(e) {
    if (e.checked) {
     this.addItem('fraisDePosteOrnitaouais', this.inf.fraisDePosteOrnitaouais);
    } else {
      this.addItem('fraisDePosteOrnitaouais', 0);
    }
    this.montant.next(this.total * 100);
  }

}
