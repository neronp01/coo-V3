import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { EmailService } from './services/email.service';
import { FacturationService } from './services/facturation.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {

  test = false;
  constructor(private auth: AuthService, private router: Router, public email: EmailService, private fac: FacturationService ) {
fac.nofacture.subscribe(x => {console.log('--XXXXXX--------------' , x.numero)});

    console.log('------facture', fac.nofacture);
  }
  ngOnInit() {
    this.auth.user.take(1).subscribe( x => {
      console.log('app' , x, this.auth.currentUserEmail);
      this.auth.isInDatabase(this.auth.currentUserEmail);
    });
  }
enter() {
  this.router.navigate(['/accueil']);
}
}
