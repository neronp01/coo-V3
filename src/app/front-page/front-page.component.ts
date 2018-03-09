import { Component, OnInit, OnDestroy, HostBinding, NgZone } from '@angular/core';
import * as _ from 'lodash';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import { slideInDownAnimation } from './../animations';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css'],
  animations: [
    trigger('flyInOut', [
      state('void', style({ opacity: 0, transform: 'translateX(100px)'})),
      state('in', style({ opacity: 1, transform: 'translateX(0px)'})),
      state('pink', style({ color: '#C51162', transform: 'scale(1.2)'})),
    transition('void => in', [
      style({
        opacity: 0,
        transform: 'translateX(300px)',
      }),
      animate('.5s ease-in')
    ]),
    transition('in => pink', [
      style({
        color: '#C51162',
        transform: 'scale(1.2)',
      }),
      animate('1.2s ease-in')
    ]),
  ],
),
trigger('animationSquar', [
  state('void', style({ opacity: 0 , transform: 'translate(0px , 350px)'})),
  state('in', style({ opacity: 1 ,
   transform:  'translate(0px , 350px)'})),
  state( 'rotate', style({ width: '1070px',
  height: '470px' , transform:  'translate(7.5px , 7.5px)' })),
  transition('void => in', [
    style({
      opacity: 0 ,
      transform: 'translate(0px , 350px)'
    }),
    animate('3.75s ease-in')
  ]),
  transition('in => rotate', [
    style({
      width: '15px',
      height: '15px',
      transform:  'translate(0px , 350px)'
    }),
    animate('2.75s ease-in')
  ]),
]),
trigger('animationSquarSmall', [
  state('void', style({ opacity: 0 , transform: 'translate(300px , 150px)'})),
  state('in', style({ opacity: 1 , transform:  'translate(300px , 150px)'})),
  state( 'rotate', style({ width: '585px',
  height: '285px' , transform:  'translate(7.5px , 7.5px)' })),
  transition('void => in', [
    style({
      opacity: 0 ,
      transform: 'translate(200px , 150px)'
    }),
    animate('3.75s ease-in')
  ]),
  transition('in => rotate', [
    style({
      width: '15px',
      height: '15px',
      transform:  'translate(550px , 600px)'
    }),
    animate('2.75s ease-in')
  ]),
]),
trigger('animationSVG', [
  state( 'void', style({ transform: 'translateY(300px)'})),
  state( 'rotate', style({ width: '800px',
  height: '500px'})),
  transition('void => rotate', [
    style({
      width: '15px',
      height: '15px',
    }),
    animate('2.75s ease-in')
  ]),
]),
trigger('photoClub', [
  state( 'void', style({ opacity: 0})),
  state('inPhoto', style({ opacity: 1})),
  transition('void => inPhoto', [
    style({
     opacity: 0
    }),
    animate('2.75s ease-in')
  ]),
]),
trigger('p_container', [
  state( 'void', style({ opacity: 0,   transform: 'scale(.35)'})),
  state('inP', style({ opacity: 1,  transform: 'scale(.35)'})),
  state('inPTranslateY', style({ position: 'relative', opacity: 1,  transform: 'translateY(-200px)'})),
  transition('void => inP', [
    style({
     transform: 'scale(.35)',
     opacity: 0
    }),
    animate('2.75s ease-in')
  ]),
  transition('inP => translateY', [
    style({
     transform: 'translateY(0px) ',
     opacity: 0
    }),
    animate('2.75s ease-in')
  ]),
]),
trigger('p_containerTranslate', [
  state( 'void', style({ transform: 'translateY(0px) scale(1)'})),
  state('translateY', style({   transform: 'translateY(0px) scale(1)'})),
  state('scale', style({  height: '80px', transform: 'translateY(0px) scale(1)'})),
  state('buttonHeight', style({ height: '500px',  transform: 'translateY(0px) scale(1)'})),
  transition('void => translateY', [
    style({
      transform: 'translateY(0px) scale(1)',
    }),
    animate('0s ease-in')
  ]),
  transition('translateY => scale', [
    style({
      transform: 'translateY(0px) scale(1)',
    }),
    animate('0s ease-in')
  ]),
  transition('scale => buttonHeight', [
    style({
      height: '80px',
    }),
    animate('1s ease-in')
  ]),
]),
trigger('p_backGround', [
  state( 'void', style({ transform: 'translateY(0px)' , display: 'none', width: '0px'})),
  state('expend', style({ transform: 'translateY(0px)' , display: 'block',  width: '1000px'})),
  transition('void => expend', [
    style({
      transform: 'translateY(0px)' , display: 'none', width: '0px'
    }),
    animate('1s ease-in')
  ]),
]),
trigger('p_image', [
  state( 'void', style({ opacity: 0})),
  state( 'show', style({ opacity: 1})),
  transition('void => show', [
    style({
      opacity: 0
    }),
    animate('1s ease-in')
  ]),
]),
trigger('i_container', [
  state( 'void', style({ opacity: 0,   transform: 'scale(.35)'})),
  state('inI', style({ opacity: 1,  transform: 'scale(.35)'})),
  state('inITranslateY', style({ position: 'relative', opacity: 1,  transform: 'translateY(-200px)'})),
  transition('void => inI', [
    style({
     transform: 'scale(.35)',
     opacity: 0
    }),
    animate('2.75s ease-in')
  ]),
  transition('inI => translateY', [
    style({
     transform: 'translateY(0px) ',
     opacity: 0
    }),
    animate('2.75s ease-in')
  ]),
]),
trigger('I_containerTranslate', [
  state( 'void', style({ transform: 'translateY(0px) scale(1)'})),
  state('ItranslateY', style({   transform: 'translateY(0px) scale(1)'})),
  state('Iscale', style({  height: '80px', transform: 'translateY(0px) scale(1)'})),
  state('IbuttonHeight', style({ height: '500px',  transform: 'translateY(0px) scale(1)'})),
  transition('void => ItranslateY', [
    style({
      transform: 'translateY(0px) scale(1)',
    }),
    animate('2.75s ease-in')
  ]),
  transition('ItranslateY => Iscale', [
    style({
      transform: 'translateY(0px) scale(1)',
    }),
    animate('1s ease-in')
  ]),
  transition('Iscale => IbuttonHeight', [
    style({
      height: '80px',
    }),
    animate('1s ease-in')
  ]),
]),
trigger('i_backGround', [
  state( 'void', style({ transform: 'translateY(0px)' , display: 'none', width: '0px'})),
  state('Iexpend', style({ transform: 'translateY(0px)' , display: 'block',  width: '1000px'})),
  transition('void => Iexpend', [
    style({
      transform: 'translateY(0px)' , display: 'none', width: '0px'
    }),
    animate('1s ease-in')
  ]),
]),
trigger('i_image', [
  state( 'void', style({ opacity: 0})),
  state( 'Ishow', style({ opacity: 1})),
  transition('void => Ishow', [
    style({
      opacity: 0
    }),
    animate('1s ease-in')
  ]),
]),
trigger('c_container', [
  state( 'void', style({ opacity: 0,   transform: 'scale(1)'})),
  state('inC', style({ opacity: 1,  transform: 'scale(1)'})),
  state('inCTranslateY', style({ position: 'relative', opacity: 1,  transform: 'translateY(-200px)'})),
  transition('void => inC', [
    style({
     transform: 'scale(1)',
     opacity: 0
    }),
    animate('2.75s ease-in')
  ]),
  transition('inC => translateY', [
    style({
     transform: 'translateY(0px) ',
     opacity: 0
    }),
    animate('2.75s ease-in')
  ]),
]),
trigger('c_containerTranslate', [
  state( 'void', style({ transform: 'translateY(0px) scale(1)'})),
  state('CtranslateY', style({   transform: 'translateY(0px) scale(1)'})),
  state('Cscale', style({  height: '80px', transform: 'translateY(0px) scale(1)'})),
  state('CbuttonHeight', style({ height: '500px',  transform: 'translateY(0px) scale(1)'})),
  transition('void => CtranslateY', [
    style({
      transform: 'translateY(0px) scale(1)',
    }),
    animate('2.75s ease-in')
  ]),
  transition('CtranslateY => Cscale', [
    style({
      transform: 'translateY(0px) scale(1)',
    }),
    animate('1s ease-in')
  ]),
  transition('Cscale => CbuttonHeight', [
    style({
      height: '80px',
    }),
    animate('1s ease-in')
  ]),
]),
trigger('c_backGround', [
  state( 'void', style({ transform: 'translateY(0px)' , display: 'none', width: '0px'})),
  state('Cexpend', style({ transform: 'translateY(0px)' , display: 'block',  width: '1000px'})),
  transition('void => Cexpend', [
    style({
      transform: 'translateY(0px)' , display: 'none', width: '0px'
    }),
    animate('1s ease-in')
  ]),
]),
trigger('c_image', [
  state( 'void', style({ opacity: 0})),
  state( 'Cshow', style({ opacity: 1})),
  transition('void => Cshow', [
    style({
      opacity: 0
    }),
    animate('1s ease-in')
  ]),
]),
]
})
export class FrontPageComponent implements OnInit {
  isShrunk = false;
  sideState = 'voidSide';
  toolbarState = 'void';
  state=_.fill(Array(60), 'void');
  stateSquar= 'void';
  stateSVG= 'void';
  statePhoto = 'void';
  stateP = 'void';
  stateC = 'void';
  stateTranslateP = 'void';
  stateTranslateI = 'void';
  stateTranslateC = 'void';
  stateBackGround = 'void';
  stateBackGround_I = 'void';
  stateBackGround_C = 'void';
  stateImpI = 'void';
  stateImpP = 'void';
  stateImpC = 'void';
  stateIContainer = 'void';
  countPic= 0;
  countP = 0;

 // state: this.state = _.fill(Array(60), '');;
p_pic_texte = 'abc ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.' +
 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, ' +
 'pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, ' +
 'vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. ' +
 'Integer tincidunt. Cras dapibus.';
 p_pic_texte_tabe = [];
  constructor(zone: NgZone , private router: Router) {
    window.onscroll = () => {
      zone.run(() => {
        if (window.pageYOffset > 200 && window.pageYOffset < 300) {
          if (this.countPic === 0) {
            this.countPic++;
          }
          this.isShrunk = true;
        } else if (window.pageYOffset < 199 && window.pageYOffset > 150 && this.stateP === 'inP') {
          if (this.countP === 0) {
            this.stateTranslateP  = 'translateY';
            this.stateTranslateI = 'ItranslateY';
            this.stateTranslateC = 'CtranslateY';
            this.countP++;
          }
        } else {
          this.isShrunk = false;
        }
      });
    };
    const temp = _.split(this.p_pic_texte, ' ', 60);
    this.p_pic_texte_tabe = temp;
   }

  ngOnInit() {
this.stateSquar = 'in';
  }

pic_texte() {
  const numbers = Observable.timer(0, 200).take(64); // Call after 10 second.. Please set your time
    numbers.subscribe(x => {
      if (x < 61) {
        this.state[x] = 'in';
      } else if ( x === 61) {
        this.state[10] = 'pink';
      } else if ( x === 62) {
        this.state[32] = 'pink';
      }else if ( x === 63) {
        this.state[50] = 'pink';
      }
    });
}

animNext(e: any) {
  console.log('anim', e);
  if (e['toState'] === 'rotate') {
    this.statePhoto = 'inPhoto';
  } else if ( e['toState'] === 'in' ) {
    this.stateSquar = 'rotate';
    this.stateSVG = 'rotate';
  } else if ( e['toState'] === 'inPhoto' ) {
    this.stateC = 'inC';
    this.stateP = 'inP';
    this.stateIContainer = 'inI';
    console.log('inC-----');
  } else if ( e['toState'] === 'translateY' ) {
    this.stateTranslateP = 'scale';
  } else if ( e['toState'] === 'ItranslateY' ) {
  this.stateTranslateI = 'Iscale';
} else if ( e['toState'] === 'CtranslateY' ) {

  this.stateTranslateC = 'Cscale';
  console.log('stateTranslateC', this.stateTranslateC);
} else if ( e['toState'] === 'scale' ) {
    this.stateTranslateP = 'buttonHeight';
  } else if ( e['toState'] === 'Cscale' ) {
    this.stateTranslateC = 'CbuttonHeight';
    console.log('stateTranslateC', this.stateTranslateC);
  }else if ( e['toState'] === 'Iscale' ) {
    this.stateTranslateI = 'IbuttonHeight';
  } else if ( e['toState'] === 'buttonHeight') {
    this.stateBackGround = 'expend';
  } else if ( e['toState'] === 'expend') {
    this.stateImpP = 'show';
  } else if ( e['toState'] === 'show') {
    this.pic_texte();
  }else if ( e['toState'] === 'IbuttonHeight') {
    this.stateBackGround_I = 'Iexpend';
  } else if ( e['toState'] === 'Iexpend') {
    this.stateImpI = 'Ishow';
    console.log('Iexpend');
  } else if ( e['toState'] === 'Ishow') {
    console.log('Ishow');
    this.pic_texte();
  }else if ( e['toState'] === 'CbuttonHeight') {
      this.stateBackGround_C = 'Cexpend';
      console.log('CbuttonHeight', this.stateBackGround_C);
  } else if ( e['toState'] === 'Cexpend') {
    console.log('Cexpend');
    this.stateImpC = 'Cshow';
  } else if ( e['toState'] === 'Cshow') {
    this.pic_texte();
  }
}
clickAccederP() {
  this.router.navigate(['/accueil']);
  if (this.stateTranslateP === 'void') {
    this.stateTranslateP = 'translateY';
    this.stateTranslateC = 'CtranslateY';
  }

}
}
