import { Component, OnInit, HostBinding } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { AuthService} from '../../auth.service';
import { EmailService } from '../../services/email.service';
import { Router, NavigationExtras} from '@angular/router';
import { slideComponent } from '../../animations';
import { Membre } from '../../services/membre.model';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  animations: [slideComponent]
})
export class MemberListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  displayedColumns = [' ', 'Nom', 'Téléphone', 'Courriel'];
  displayedColumn = ['photo', 'prenom', 'nom', 'tel', 'email'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  membresTable= [];
  constructor(private auth: AuthService, private email: EmailService, private router: Router) {

    auth.membres.subscribe( x => {
      let count = 0;
      x.forEach( y => {

        if (count === 0) {
          count++;
        } else {
          if ( y['membre']['nomListe'] === true) {
          if ( !this.checkDoublon(y['membre']['nom'], y['membre']['prenom'])) {
            let telephone = y['membre']['telephone'];
            if ( y['membre']['teleList'] === false) {
                telephone = '';
            }
            ELEMENT_DATA.push({photo: y.photoURL, prenom: y['membre']['prenom'], nom: y['membre']['nom'],
            tel: telephone, email: y['membre']['email']});
          }
        }
        }
      });
      console.log('membres' , ELEMENT_DATA);
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });
  }
  checkDoublon( nom: string, prenom: string): boolean {
let estDoublon: boolean;
let oneTime = 0;
ELEMENT_DATA.forEach( x => {
  console.log( x.prenom, prenom);
  if (oneTime === 0) {
  if ( x.prenom === prenom && x.nom === nom) {
    estDoublon = true;
    oneTime++;
  } else {
    estDoublon = false;
  }
}
});
console.log('estDoublon' , estDoublon, nom, prenom, ELEMENT_DATA);
return estDoublon;

  }
  ngOnInit() {
    console.log('membres' , ELEMENT_DATA);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  _email (a: string) {
    this.email.setEmail(a);
    this.router.navigate([{ outlets: { popup: 'compose' }}]);
  }
}
export interface Element {
  photo: string;
  prenom: string;
  nom: string;
  tel: string;
  email: string;
}
// export interface Element {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

const ELEMENT_DATA: Element[] = [];
