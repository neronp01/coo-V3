import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './../auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import * as moment from 'moment';
import { Membre } from '../services/membre.model';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { MessagesService } from '../services/messages.service';

@Component({
  styleUrls: ['./admin.component.scss'],
  templateUrl: './admin.component.html',
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
    ]),
    trigger(
      'toolbar',
      [
        state('void', style({ height: '0px'})),
        state('in', style({ height: '50px'})),
        state('voidSide', style({  flex: '0 0%', transform: 'translate(-200px,0px)'})),
        state('inSide', style({  flex: '1 10%', transform: 'translate(0px,0px)'})),
        state('out', style({transform: 'translate(600px,0px)', opacity: '0'})),
        transition(
          'void <=> in', [animate('0.7s 0.1s ease-out', style({ height: '50px'})), animate('0.7s 0.1s ease-out')]),
        transition(
          'in <=> out', [animate('0.7s 0.1s ease-out', style({transform: 'translate(600px,-100px)', opacity: '0'})), animate('0.7s 0.1s ease-out')]),
        transition(
          'voidSide <=> inSide', [animate('0.5s 0.1s ease-out', style({  flex: '1 10%', transform: 'translate(0px,0px)'})), animate('0.5s 0.1s ease-out')])
      ]), trigger(
      'sidebar',
      [
        state('void', style({ height: '0px'})),
        state('in', style({ height: '50px'})),
        state('out', style({transform: 'translate(600px,0px)', opacity: '0'})),
        transition(
          'void <=> in', [animate('0.7s 0.1s ease-out', style({ height: '50px'})), animate('0.7s 0.1s ease-out')]),
        transition(
          'in <=> out', [animate('0.7s 0.1s ease-out', style({transform: 'translate(600px,-100px)', opacity: '0'})), animate('0.7s 0.1s ease-out')])
      ])
  ],
})
export class AdminComponent implements OnInit {
  url: BehaviorSubject<string>;
  isShrunk = false;
  sideState = 'voidSide';
  toolbarState = 'void';
  state= 'void';
  titre = 'Accueil';
  isConnected = false;
  _isMembre = false;
  test = '';
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(public auth: AuthService, private router: Router, zone: NgZone, private message: MessagesService) {

    window.scroll(0, 0);
    this.auth.user.subscribe( x => {
      if (x !== null) {
        this.isConnected = true;
        this._isMembre = this.isMembre;

      }
    });

    const numbers = Observable.timer(0, 1000).take(3); // Call after 10 second.. Please set your time

    numbers.subscribe(x => {

      this.toolbarState = 'in';
      if (x === 0) {
        this.sideState = 'inSide';
      }
    });


    window.onscroll = () => {
      zone.run(() => {
        if (window.pageYOffset > 0) {
          this.isShrunk = true;
        } else {
          this.isShrunk = false;
        }
      });
    };
  }
redirection(url: string) {
  const temp = [];
  temp.push(url);
console.log(' temp', temp);
  this.router.navigateByUrl(url);
}
  ngOnInit() {

  }
  buttonClick(a: string) {
    switch (a) {
      case 'inscription': this.titre = 'Inscription / Adhésion';
      break;
      case 'liste_membres': this.titre = 'Liste de membres';
      break;
      case 'infoPerso': this.titre = 'Informations personnelles';
      break;
      case 'boutique_en_ligne': this.titre = 'Boutique en ligne';
      break;
      case 'ornithologie': this.titre = 'Ornithologie';
      break;
      case 'redaction': this.titre = 'Rédaction';
      break;
      //  this.router.navigate(['/inscription']);
    }
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
