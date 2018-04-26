import { Component, OnInit, Inject } from '@angular/core';
import {AuthService} from './auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { EmailService } from './services/email.service';
import { FacturationService } from './services/facturation.service';
import * as moment from 'moment';
import { Membre } from './services/membre.model';
import {MatSnackBar} from '@angular/material';
import { MessagesService } from './services/messages.service';
import { MessageService } from './services/message.service';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { InformationService } from './services/information.service';
import {MAT_SNACK_BAR_DATA} from '@angular/material';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit {
  _isMembre = false;
  test = false;
  constructor(private auth: AuthService, private router: Router, public email: EmailService
  , public snackBar: MatSnackBar, private message: MessagesService,  ) {
  }
  ngOnInit() {
    this.getMessage();
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

openSnackBar() {

  console.log('test');
  this.message.message.next('Bordel de merde ca marche');


}
getMessage() {
  this.message.message.subscribe( x => {
    if (x !== '') {
      const url = this.router.routerState.snapshot['url'];
      this.snackBar.openFromComponent(MessageComponent, {
        duration: 105000,
        data: url
      });
    }
  });
}
}


@Component({
  selector: 'app-message-component',
  templateUrl: 'app-message-component.html',
  styleUrls: ['./app.component.scss'],
})
export class MessageComponent {
  message: string;
  famil: number;
  indiv: number;
  org: number;

  constructor( private _message: MessagesService, private snac: MatSnackBar, private info: InformationService,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = this._message.message.value;
setTimeout(() => {
  console.log(this.data);
  this.famil = info.cotFamillial;
    this.indiv = info.cotInd;
    this.org = info.cotOrg;
}, 200);
  }
test() {
  this.snac.dismiss();
}
}

