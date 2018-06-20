import { Component, OnInit, HostBinding } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { AuthService} from '../../auth.service';
import { EmailService } from '../../services/email.service';
import { Router, NavigationExtras} from '@angular/router';
import { slideComponent } from '../../animations';
import { Membre } from '../../services/membre.model';
import { ListService, LMembres } from './list.service';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  animations: [slideComponent]
})
export class MemberListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  displayedColumns = ['Photo', 'Nom', 'Telephone', 'Courriel'];
  displayedColumn = ['photo', 'prenom', 'nom', 'tel', 'email'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource(null);
  membresTable= [];
  constructor(private list: ListService, private auth: AuthService, private email: EmailService, private router: Router) {
   list.membre.subscribe( x => {
    this.dataSource = new MatTableDataSource(x);
     console.log('observabelListe', x);
   }
   );
    console.log();
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
