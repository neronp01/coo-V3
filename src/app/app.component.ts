import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { EmailService } from './services/email.service';
import { FacturationService } from './services/facturation.service';
import * as moment from 'moment';
import { Membre } from './services/membre.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  _isMembre = false;
  test = false;
  constructor(private auth: AuthService, private router: Router, public email: EmailService ) {
  }
  ngOnInit() {
    this.auth.user.take(1).subscribe( x => {
      if (x !== null) {
        this._isMembre = this.isMembre;

      }
      console.log('app' , x, this.auth.currentUserEmail);
      this.auth.isInDatabase(this.auth.currentUserEmail);
    });
  }
enter() {
  this.router.navigate(['/accueil']);
}
get isMembre(): boolean {
  const membre: Membre = this.auth.userToken['membre'];
  const tab = Object.getOwnPropertyNames(membre);
  let aUneAdhesion: boolean;
  aUneAdhesion = false;

  // S'il y a une date d'adésion dans la base de donné, les données doivent être conservé.
  if (tab.includes('adhDate')) {
    if (!moment(membre['adhDate']).isBefore(moment(Date.now()).format('YYYYMMDD'))) {
      aUneAdhesion = true;
    }
  }
  return aUneAdhesion;
}

}
