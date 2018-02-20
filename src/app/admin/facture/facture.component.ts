import { Component, OnInit, Input} from '@angular/core';
import { InformationService, Information} from '../../services/information.service';
import { Membre} from '../../services/membre.model';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import { AuthService} from '../../auth.service';
import { FacturationService , NoFacture } from '../../services/facturation.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';



@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
  providers: [ InformationService, ConfigService ]
})
export class FactureComponent implements OnInit {
  @ Input() infMembre: Membre;
  @ Input() infConjouint: Membre;
  endpoint = 'https://us-central1-coov3-f509c.cloudfunctions.net/helloWorld';
  noFacture: number;
  count = 0; // ceci permet de pas enregistrer plusieurs noFacture;
  montant: BehaviorSubject<number>;
  infoFacture = {montant: 0};
  typeCotisation: number;
  infoCotisation: object;
  courriel: string;
  fraisPost;
  total: number;
  typeAbonement: string;
  rowspan = 8;
  membre: Membre;
  listeItem = {typeCotisation: 0, don: 0, fraisDePosteOrnitaouais: 0};
  constructor( private inf: InformationService, private auth: AuthService, private fac: FacturationService,
     private http: HttpClient, private conf: ConfigService) {
    const numbers = Observable.timer(0, 1000).take(3); // Call after 10 second.. Please set your time
    numbers.subscribe(x => {
     if (x > 1) {
       if (this.infMembre['typeCotisation'] !== undefined) {
        this.addItem('typeCotisation', this.inf.infoCotisation[this.infMembre['typeCotisation']]);
        this.montant.next(this.total * 100);
        this.typeCotisation = this.inf.infoCotisation[this.infMembre['typeCotisation']];
        this.membre = this.auth.userToken['membre'];
        this.infoFacture['membre'] = this.infMembre;
        this.infoFacture['conjouint'] = this.infConjouint;
        this.infoFacture['numeroFacture'] = this.noFacture;
        this.aUneAdhesion(this.membre);
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
    this.fac.nofacture.take(1).subscribe( x => {
      if (this.count === 0 ) {
        this.noFacture = x.numero + 1;
        this.updateNoFacture({numero: this.noFacture });
        this.count++;
      }
    });
  }

  aUneAdhesion(oldData: Membre) {
    const tab = Object.getOwnPropertyNames(oldData);
    let aUneAdhesion: boolean;
    aUneAdhesion = true;
    // S'il y a une date d'adésion dans la base de donné, les données doivent être conservé.
    if (tab.includes('adhDate')) {
      this.infoFacture['membre']['adhDate'] = oldData.adhDate;
    }
    console.log('aUne adhésion',  this.infoFacture['membre']);
  }

  updateNoFacture(a: NoFacture) {
    this.fac.updateNoFacture({numero: this.noFacture});
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
  test() {
    const factureId = this.noFacture;
    const data = { facture: {
      toEmail: 'somebody@example.com',
      toName: 'Jeff Delaney',
      factureId: this.noFacture
    }
    };
    this.conf.sendEmail('neronpascal001@gmail.com').subscribe( x => {
      console.log('http', x);
    });  //  this.http.post(this.endpoint, data).subscribe();
  }

}
