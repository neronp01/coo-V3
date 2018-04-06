import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { AuthService, User } from './../../auth.service';
import { Membre } from '../../services/membre.model';
import { FormControl } from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { MatMenuTrigger } from '@angular/material';
import { Information, InformationService } from '../../services/information.service';
import { map } from 'rxjs/operators/map';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query
} from '@angular/animations';



@Component({
  selector: 'app-info-perso',
  templateUrl: './info-perso.component.html',
  styleUrls: ['./info-perso.component.scss'],
  animations: [ trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0px)'
      })
    ),
    transition(':enter', [
     style({ opacity: 0, transform: 'translateX(-200px)' })
      , animate('.5s ease-out'),
    ]),
  ]),
    trigger('flyInOut', [
      state('void', style({transform: 'translateX(0px)'})),
      state('in', style({transform: 'translateX(-55px)'})),
      state('pink', style({ color: '#C51162', transform: 'scale(1.2)'})),
    transition('void => in', [
      style({
        transform: 'translateX(0px)',
      }),
      animate('.5s ease-in')
    ]),
  ]),
  trigger('flyInSave', [
    state('void', style({opacity: 0 , transform: 'translate(240px,-42px)'})),
    state('in', style({opacity: 1 , transform: 'translate(240px,-42px)'})),
    state('pink', style({ color: '#C51162', transform: 'scale(1.2)'})),
  transition('void => in', [
    style({
      transform: 'translate(240px,-42px)',
    }),
    animate('.5s ease-in')
  ]),
]),
trigger('flyInBox', [
  state('none', style({opacity: 1 , transform: 'translate(0px,0px)'})),
  state('adhesion', style({opacity: 0 , transform: 'translate(-100px,0px)'})),
transition('none => adhesion', [
  style({
    opacity: 1,
    transform: 'translate(240px,-42px)',
  }),
  animate('.5s ease-in')
]),
transition('* => none', [
  style({
    opacity: 0 , transform: 'translate(-100px,0px)'
  }),
  animate('.3s ease-in')
]),
]),

trigger('flyInBoxAdh', [
  state('adhesion', style({opacity: 1 , transform: 'translate(0px,0px)'})),
  state('*', style({opacity: 0 , transform: 'translate(-100px,0px)'})),
transition('* => adhesion', [
  style({
    opacity: 0 , transform: 'translate(-100px,0px)'
  }),
  animate('.3s ease-in')
]),
]),
trigger('flyInBoxFact', [
  state('achats', style({opacity: 1 , transform: 'translate(0px,0px)'})),
  state('*', style({opacity: 0 , transform: 'translate(-100px,0px)'})),
transition('* => achats', [
  style({
    opacity: 0 , transform: 'translate(-100px,0px)'
  }),
  animate('.3s ease-in')
]),
])

],

})
export class InfoPersoComponent implements OnInit {
@HostBinding('@routeAnimation') routeAnimation = true;
@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
stateBox = 'none';
urlPhoto = '';
infoUser: User;
infoMembre: Membre;
_inputElement= false;
_isDirty = false;
state = 'void';
fr = moment.locale('fr');
date: any;
showFacture: object;
telValue: string;
tabItems= [];
infoPersoFormGroup: FormGroup;
  constructor(private inf: InformationService, private auth: AuthService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.infoUser = this.auth.userToken;
    this.urlPhoto = this.infoUser.photoURL;
    setTimeout(() => {
      this.infoMembre = this.infoUser.membre;
      this.initForm();
      this.date = moment(this.infoMembre.adhDate).format('dddd, Do MMMM YYYY');
      const length = this.infosFacture.length;
      this.showFacture =  this.trouverDon(this.infosFacture[length - 1]);
      // this.inf.getItemInfo(1).ref.get().then( x => {

      // });

    }, 100);
  }
// <img src="auth.userToken.photoURL"/>
inputElement(a: boolean) {
  if ( a === false && this._isDirty === true) {
    this._inputElement = true;
  }else if ( a === false) {
    this._inputElement = a;
  } else {
    this._inputElement = true;
  }

}
initForm() {
  this.infoPersoFormGroup = this._formBuilder.group({
    adresseCtrl: [this.infoMembre.adresse , Validators.required],
    villeCtrl: [this.infoMembre.ville , Validators.required],
    codePostalCtrl: [this.infoMembre.codePostal , Validators.required],
    telephoneCtrl: [this.infoMembre.telephone , Validators.required],
  });
}
inputWriting(a: string, input: string) {
  this._isDirty = this.infoPersoFormGroup.dirty;

  if ( input === 'ville' && a.length === 1) {
    const ville = a.substring(0, 1).toLocaleUpperCase();
    this.infoMembre.ville = ville;
    this.infoPersoFormGroup.controls['villeCtrl'].setValue(ville);
  }
}

get infoPersoDisabled(): boolean {
  let status: boolean;
  if (this.infoPersoFormGroup.status === 'VALID') {
    status = false;
  } else {
    status = true;
  }
  this._isDirty = this.infoPersoFormGroup.dirty;
  if (this.infoPersoFormGroup.dirty) {
    this.state = 'in';
  }

  return status;
}
testBlur(e: any) {

}
sauverClick() {
  let newInfoMembre = new Membre;
  this.infoMembre.adresse = this.infoPersoFormGroup.value['adresseCtrl'];
  this.infoMembre.ville = this.infoPersoFormGroup.value['villeCtrl'];
  this.infoMembre.codePostal = this.infoPersoFormGroup.value['codePostalCtrl'];
  this.infoMembre.telephone = this.infoPersoFormGroup.value['telephoneCtrl'];
  newInfoMembre = this.infoMembre;
  this.auth.updateMembre(newInfoMembre);
  this.router.navigate(['/accueil/informations_presonnelles']);
}
bottonClick(a: string) {
  this.stateBox = a;
}
get infosFacture(): Array<object> | null {
const items: Array<object> = this.infoMembre.infFacturation;

return items;
}
trackByFn(index, item): Array<number> {
  this.tabItems = item['tabItems'];
  return item['tabItems'];
}
trouverDon(facture: object): object {
 const objReturn = facture;
 const total = facture['montant'] / 100;
 const sous = facture['tabItems'].length;
 const items = facture['tabItems'];
 let sous_total = 0;
 for (let i = 0 ; i < sous; i++) {
   const item = items[i];
  sous_total += item['montant'];
 }
 objReturn['don'] = total - sous_total;

 return objReturn;
}
someMethod() {
  this.trigger.openMenu();
}
factureClick(i: number) {
  this.trouverDon(this.infosFacture[i]);
  this.showFacture =  this.trouverDon(this.infosFacture[i]);

}
}
