import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router, NavigationExtras } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [trigger(
    'openClose',
    [
      state('void', style({transform: 'translate(-600px,-100px)', opacity: '0'})),
      state('in', style({transform: 'translate(0px,0px)', opacity: '1'})),
      state('out', style({transform: 'translate(600px,0px)', opacity: '0'})),
      transition(
        'void <=> in', [animate('0.7s 0.1s ease-out', style({transform: 'translate(0px,0px)', opacity: '1'})), animate('0.7s 0.1s ease-out')]),
      transition(
        'in <=> out', [animate('0.7s 0.1s ease-out', style({transform: 'translate(600px,-100px)', opacity: '0'})), animate('0.7s 0.1s ease-out')])
    ])]
})
export class LoginComponent implements OnInit {
@ Input() state= 'void';
  constructor(public auth: AuthService, private router: Router) {
    const numbers = Observable.timer(0, 100).take(3); // Call after 10 second.. Please set your time
    numbers.subscribe(x => {
      this.state = 'in';
// if (x === 1 ) {
//   if (this.auth.isLoggedIn) {
//     console.log('ici' , this.auth.isLoggedIn);
//  //   this.router.navigate(['/accueil']);
//   } else {
//
//   }
// }
    });
  this.auth.user.subscribe( x => {
    this.router.navigate(['/accueil']);
  });
  }

  ngOnInit() {

  }
isConnected() {
   // if (this.auth.) {}
}
login(a: string) {
   switch (a) {
     case 'f': this.auth.FacebookLogin().then(() => {
       this.router.navigate(['/accueil']);
     });
     break;
     case 'g': this.auth.googleLogin().then(() => {
       this.outMove();
     });
     break;
     case 't': this.auth.twitterLogin().then(() => {
      // this.router.navigate(['/accueil']);
     });
   }
}
outMove() {
  const numbers = Observable.timer(0, 1000).take(3); // Call after 10 second.. Please set your time
  numbers.subscribe(x => {
if ( x === 0) {
  this.state = 'out';
} else if ( x === 1) {
 // this.router.navigate(['/accueil']);
}

  });
}
}
