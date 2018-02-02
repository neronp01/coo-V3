import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { AuthService} from '../../auth.service';
import { EmailService } from '../../services/email.service';
import { Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  displayedColumns = [' ', 'Nom', 'Téléphone', 'Courriel'];
  displayedColumn = ['photo', 'prenom', 'nom', 'tel', 'email'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  membresTable= [];
  constructor(private auth: AuthService, private email: EmailService, private router: Router) {
    auth.membres.subscribe( x => {
      x.forEach( y => {
            let photo: string;
        if (y.photoURL === 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg' || '') {
          photo = './assets/pique.jpg';
          } else {
          photo = y.photoURL;
          }
        ELEMENT_DATA.push({photo: y.photoURL, prenom: y['membre']['prenom'], nom: y['membre']['nom'],
        tel: y['membre']['telephone'], email: y['membre']['email']});
      });
      console.log('membres' , ELEMENT_DATA);
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });
  }

  ngOnInit() {
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
// const ELEMENT_DATA: Element[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];
