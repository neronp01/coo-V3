import { Component, OnInit, NgZone, HostListener, HostBinding} from '@angular/core';
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
import { InformationService } from '../services/information.service';
import { EmailService } from '../services/email.service';
import { InterfaceService } from './interface.service';


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
        state('inSide', style({  flex: '1 13.5%', transform: 'translate(0px,0px)'})),
        state('out', style({transform: 'translate(600px,0px)', opacity: '0'})),
        transition(
          'void <=> in', [animate('0.7s 0.1s ease-out', style({ height: '50px'})), animate('0.7s 0.1s ease-out')]),
        transition(
          'in <=> out', [animate('0.7s 0.1s ease-out', style({transform: 'translate(600px,-100px)', opacity: '0'})), animate('0.7s 0.1s ease-out')]),
        transition(
          'voidSide <=> inSide', [animate('0.5s 0.1s ease-out', style({  flex: '1 13.5%', transform: 'translate(0px,0px)'})), animate('0.5s 0.1s ease-out')])
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
  @HostBinding('class.isActive')
  @HostBinding('class.current') isActive: boolean;
p_citation = '“Les oiseaux sont responsables de trois au moins des grandes malédictions qui pèsent sur l’homme.' +
' Ils lui ont donné le désir de grimper aux arbres, celui de voler, celui de chanter…”'
 // state: this.state = _.fill(Array(60), '');;
p_pic_texte = 'Le Club des ornithologues de l\'Outaouais (COO)  vous souhaite la bienvenue. Le COO est un organisme sans but ' +
 'lucratif regroupant les personnes et les organismes s\'intéressant à l\'observation et à la protection des oiseaux et de leurs' +
 ' habitats. Nos membres pratiquent l\'ornithologie dans les régions de l\'Outaouais et le nord-ouest des Hautes-Laurentides, au Québec.' +
 'Cette application vous permet de vous inscrire ou de renouveler votre abonnement.';
 i_pic_texte = 'Nous publions quatre fois par année L\'Ornitaouais, un bulletin de liaison entre le Club et ses membres. Il présente des' +
 ' statistiques saisonnières d\'observation, des comptes-rendus d\'excursions et de voyages ornithologues, ainsi que des articles' +
 ' d\'intérêt général sur les oiseaux. Parmi ses activités, le Club organise des excursions sur le terrain en toute saison, offre des' +
  'cours d\'initiation à l\'observation des oiseaux, présente des conférences, réalise des recensements de Noël et s\'implique dans' +
  ' divers projets touchant la nature et l\'ornithologie.';
  tabMenu: BehaviorSubject<Array<object>>;
  innerWidth: number;
  accueil = true;
  url: BehaviorSubject<string>;
  isShrunk = false;
  sideState = 'voidSide';
  toolbarState = 'void';
  state= 'void';
  menue_small = true;
  menue_medium = false;
  menue_tall = false;
  titre = 'CLUB DES ORNITHOLOGUES DE L\'OUTAOUAIS';
  isConnected = false;
  _isMembre = false;
  test = '';
  items1 = [{'theme': 'accueil', 'routerLink': './', 'icone': 'home', 'titre': 'Accueil'},
           {'theme': 'infoPerso', 'routerLink': './informations_presonnelles', 'icone': 'person', 'titre': 'Renseignements personnels'},
           {'theme': 'inscription', 'routerLink': './inscription', 'icone': 'launch', 'titre': 'Adhésion/renouvellement'},
           {'theme': 'liste_membres', 'routerLink': './liste_de_membres', 'icone': 'people', 'titre': 'Liste de membres'},
           {'theme': 'ornithologie', 'routerLink': './ornithologie', 'icone': 'picture_as_pdf', 'titre': 'L’Ornitaouais'},
           {'theme': 'email', 'routerLink': [{ outlets: { popup: ['compose'] } }],
            'icone': 'email', 'titre': 'Communiquer avec l\'administrateur'},
            {'theme': 'redaction', 'routerLink': './redaction', 'icone': 'create', 'titre': 'Rédaction'},
];
items2 = [{'theme': 'accueil', 'routerLink': './', 'icone': 'home', 'titre': 'Accueil'},
{'theme': 'infoPerso', 'routerLink': './informations_presonnelles', 'icone': 'person', 'titre': 'Renseignements personnels'},
{'theme': 'inscription', 'routerLink': './inscription', 'icone': 'launch', 'titre': 'Adhésion/renouvellement'},
{'theme': 'liste_membres', 'routerLink': './liste_de_membres', 'icone': 'people', 'titre': 'Liste de membres'},
{'theme': 'ornithologie', 'routerLink': './ornithologie', 'icone': 'picture_as_pdf', 'titre': 'L’Ornitaouais'},
{'theme': 'email', 'routerLink': [{ outlets: { popup: ['compose'] } }],
 'icone': 'email', 'titre': 'Communiquer avec l\'administrateur'},
];
items3 = [{'theme': 'accueil', 'routerLink': './', 'icone': 'home', 'titre': 'Accueil'},
{'theme': 'inscription', 'routerLink': './inscription', 'icone': 'launch', 'titre': 'Adhésion/renouvellement'},
{'theme': 'email', 'routerLink': [{ outlets: { popup: ['compose'] } }],
 'icone': 'email', 'titre': 'Communiquer avec l\'administrateur'},
];
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(public auth: AuthService, private router: Router, zone: NgZone,
    private message: MessagesService, public email: EmailService, public inter: InterfaceService) {
    window.scroll(0, 0);
    this.auth.user.subscribe( x => {
      if (x !== null) {
        this.isConnected = true;
        this._isMembre = this.isMembre;
        this.isActiveDate(x.email);

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

  isActiveDate(email: string) {


      this.auth.isActive(email).subscribe( x => {
        const dateNow = Date.now();
        const temp = x['membre']['adhDate'];
        console.log('isActive' , temp , moment(dateNow).format('YYYYMMDD'));
        if (moment(temp).isAfter(moment(dateNow).format('YYYYMMDD'))) {
          if (x.email === 'maurice.thibaudeau@gmail.com' || x.email === 'neronpascal001@gmail.com') {
            this.tabMenu.next(this.items1);
            this.menue_small = false;
            this.menue_medium = false;
            this.menue_tall = true;
          } else {
            this.tabMenu.next(this.items2);
            this.menue_small = false;
            this.menue_medium = true;
            this.menue_tall = false;
          }
      } else {
       this.tabMenu.next(this.items3);
       this.menue_small = true;
       this.menue_medium = false;
       this.menue_tall = false;
      //  console.log('after', this.tabMenu.value);
      }
      });
  }
  ngOnInit() {
    this.tabMenu = new  BehaviorSubject(this.items3);
    this.tabMenu.subscribe();
  }
  buttonClick(a: string) {
    switch (a) {
      case 'accueil': this.titre = 'CLUB DES ORNITHOLOGUES DE L\'OUTAOUAIS';
      this.accueil = true;
      break;
      case 'inscription': this.titre = 'Inscription / Adhésion';
      this.accueil = false;
      break;
      case 'liste_membres': this.titre = 'Liste de membres';
      this.accueil = false;
      break;
      case 'infoPerso': this.titre = 'Informations personnelles';
      this.accueil = false;
      break;
      case 'boutique_en_ligne': this.titre = 'Boutique en ligne';
      this.accueil = false;
      break;
      case 'ornithologie': this.titre = 'L’Ornitaouais';
      this.accueil = false;
      break;
      case 'email': this.titre = 'Accueil';
      this.accueil = true;
      this._email('cooutaouais@outlook.com');
      this.inter.menuOpen = false;
      this.inter.icon = 'menu';
      break;
      case 'redaction': this.titre = 'Rédaction';
      this.accueil = false;
      break;
      //  this.router.navigate(['/inscription']);
    }
    console.log(this.accueil);
  }
  get isMembre(): boolean {
    const membre: Membre = this.auth.userToken['membre'];
    const tab = Object.getOwnPropertyNames(membre);
    let aUneAdhesion: boolean;
    aUneAdhesion = true;

    // S'il y a une date d'adésion dans la base de donné, les données doivent être conservé.
    if (tab.includes('adhDate')) {
      if (!moment(membre['adhDate']).isBefore(moment(Date.now()).format('YYYYMMDD'))) {
        aUneAdhesion = true;
      }
    }

    return aUneAdhesion;
  }
  _email (a: string) {
    this.email.setEmail(a);
    this.router.navigate([{ outlets: { popup: 'compose' }}]);
  }
  iconClick() {
    this.inter.icon = this.inter.menuOpen ? 'menu' : 'arrow_back';
    this.inter.menuOpen = this.inter.menuOpen ? false : true;
  }
  test2(a: any) {
    console.log('alloooooo', a);
  }
}
