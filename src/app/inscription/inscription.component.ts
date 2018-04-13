import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import { HostBinding, Component, ElementRef, Input, OnDestroy, Renderer2, OnInit, Output, EventEmitter , OnChanges} from '@angular/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs/Subject';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService, User} from '../auth.service';
import {VALID} from '@angular/forms/src/model';
import { Membre } from '../services/membre.model';
import { InformationService } from '../services/information.service';
import { MessagesService } from '../services/messages.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query
} from '@angular/animations';


/** Data structure for holding telephone number. */
export class MyTel {
  constructor(public area: string, public exchange: string, public subscriber: string) {}
}

@Component({
  selector: 'my-tel-input',
  templateUrl: 'form-field-custom-control.html',
  styleUrls: ['form-field-custom-control.css'],
  providers: [{provide: MatFormFieldControl, useExisting: MyTelInput}],
  host: {
    '[class.floating]': 'shouldPlaceholderFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})

export class MyTelInput implements MatFormFieldControl<MyTel>, OnDestroy {
  static nextId = 0;
@ Output() tel = new EventEmitter <string>();
@ Output() focusTel = new EventEmitter <string>();
@ Output() parts2 = new EventEmitter <FormGroup>();
parts: FormGroup;
  stateChanges = new Subject<void>();

  focused = false;

  ngControl = null;

  errorState = false;

  controlType = 'my-tel-input';

  get empty() {
    let n = this.parts.value;
    return !n.area && !n.exchange && !n.subscriber;
  }

  get shouldPlaceholderFloat() {
    return this.focused || !this.empty;
  }

  id = `my-tel-input-${MyTelInput.nextId++}`;

  describedBy = '';

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = true;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): MyTel | null {
    let n = this.parts.value;
    if (n.area.length === 3 && n.exchange.length === 3 && n.subscriber.length === 4) {
      return new MyTel(n.area, n.exchange, n.subscriber);
    }
    return null;
  }
  set value(tel: MyTel | null) {
    tel = tel || new MyTel('', '', '');
    this.parts.setValue({area: tel.area, exchange: tel.exchange, subscriber: tel.subscriber});
    this.stateChanges.next();
  }
  @ Input () focus: string;
  constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef,
              renderer: Renderer2) {
                setTimeout(() => {
                  this.parts2.emit(this.parts);
                }, 100);
                this.focus = '1';
    this.parts =  fb.group({
      'area': ['', Validators.minLength(3)] ,
      'exchange': ['', Validators.minLength(3)] ,
      'subscriber': ['', Validators.minLength(4)] ,
    });
    fm.monitor(elRef.nativeElement, renderer, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }

  }
  onKey(a: any, input: string) {
    if (a.length === 3 && input === 'area') {
          this.focus = 'exchange';
    } else if (a.length === 3 && input === 'exchange') {
      this.focus = 'subscriber';
    }  else if (a.length === 4 && input === 'subscriber') {
      this.focus = '4';
      this.focusTel.emit('profession');
    }

    const tel = this.parts.value['area'] + '-' + this.parts.value['exchange'] + '-' + this.parts.value['subscriber'];

    if (tel.length === 12) {
      this.tel.emit(tel);
    } else {
      this.tel.emit('');
    }
    this.parts2.emit(this.parts);
  }
}

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  animations: [ trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0px)'
      })
    ),
    transition(':enter', [
     style({ opacity: 0, transform: 'translateX(-200px)' })
      , animate('.5s ease-in'),
    ]),
    transition(':leave', [
      style({ opacity: 0, transform: 'translateX(400px)' })
       , animate('.5s ease-out'),
     ])
  ])]
})

export class InscriptionComponent implements OnInit {
  membre: User;
  membreConjouint: User;
  membreInfo: BehaviorSubject<Membre>;
  _membre: Membre;
  telForm: FormGroup;
  itemsFacturation = {type: 'adhesion', tabItems: [{}] };
  conjouintInfo: BehaviorSubject<Membre>;
  infoCotisation: BehaviorSubject<string>;
  infoPersoFormGroup: FormGroup;
  infoPersoFormGroupAll: FormGroup;
  infoPersoConjFormGroup: FormGroup;
  factureFormGroup: FormGroup;
  infMembreFacturation: Membre; // variable envoyé dans module facturation
  infConjouintFacturation: Membre;
  cotisation: string;
  infoDatabaseMembre: User;
  remerciement = false;

  cotisations = [
    {value: 'individuelle', viewValue: 'Cotisation individuelle'},
    {value: 'familiale', viewValue: 'Cotisation familiale'},
      {value: 'organisme', viewValue: 'Cotisation organisme'}
  ];
  _autorisationsTelephone = ['Je ', 'veux ', 'que mon numéro de téléphone figure sur la liste des membres.'];
  _autorisationsNom = ['Je ', 'veux  ', ' que mon nom figure sur la liste des membres.'];
  autorisationTel= true;
  autorisationNom= true;
  _dateNaissance = '';
  _dateNaissanceConjouint = '';
  value: MyTel;
  valueConJouint: MyTel;
  public focus: string;
  constructor(private _formBuilder: FormBuilder, private auth: AuthService,
     private inf: InformationService, private message: MessagesService) {
    this.initUserConjouint();
    this.membre = this.auth.userToken;
    if (this.auth.memberIsInDataBase) {
        this.infMembreFacturation = auth.userToken['membre'];
        this.initForm();
        this._membre = this.membre.membre;
        this.listIni();
        this._dateNaissance = this.membre.membre['dateNaissance'];
        this.telephoneHolder();
        if (this.membre.membre['typeCotisation'] === 'familiale') {
          this.auth.getConjouintInfo(this.membre.membre['courrielConjouint']).subscribe(y => {
            this.cotisation = 'familiale';
            this.initialisationConjouint();
            this.membreConjouint['membre'] = y['membre'];
            this.initFormConjouint();
            this._dateNaissanceConjouint = this.membreConjouint.membre['dateNaissance'] ? this.membreConjouint.membre['dateNaissance'] : '';
            this.telephoneHolderConjouint();
            this.conjouintInfo = new BehaviorSubject(this.membreConjouint.membre);
            this.conjouintInfo.subscribe( x => {
              this.infConjouintFacturation = x;
            });
          });
      } else {
        }
    } else {

      this.initialisationConjouint();
      this.initialisationMembre();
      this._membre = this.membre.membre;
       this.initForm();
    }
    // initialisation conjouint object

      this.initialisationConjouint();
      this.conjouintInfo = new BehaviorSubject(this.membreConjouint.membre);
      this.conjouintInfo.subscribe( x => {
        this.infConjouintFacturation = x;
      });
    this.infoCotisation = new BehaviorSubject('');
   this.membreInfo = new BehaviorSubject(this.membre.membre);
    this.membreInfo.subscribe( x => {
      this.infMembreFacturation = x;
    });
  }

  ngOnInit() {
    this._remerciement();
    this.initTelForm();
this.membre['email'] = this.auth.currentUserEmail;
    this.membre.membre['email'] = this.auth.currentUserEmail;
    this.factureFormGroup = this._formBuilder.group({
      factureCtrl: ['', Validators.required]
    });
  }
  initUserConjouint() {
    const uid = '';
    const email = '';
    const displayName = '';
    const photoURL = '';
    const membre = {};
    this.membreConjouint = {uid, email, displayName , photoURL, membre };
  }
  initTelForm() {
    this.telForm =  this._formBuilder.group({
      'area': ['', Validators.minLength(3)] ,
      'exchange': ['', Validators.minLength(3)] ,
      'subscriber': ['', Validators.minLength(4)] ,
    });
  }
listIni() {
  console.log('AlloooooooooootelListe' , this.membre.membre['teleList']);
  if (!this.membre.membre['nomListe']) {
    this.autorisationNom = false;
    this._autorisationsNom = ['Je ', 'ne veux pas ', 'que mon nom figure sur la liste des membres.'];
  }
  console.log('AlloooooooooootelListe' , this.membre.membre['teleList']);
  if (!this.membre.membre['teleList']) {
    this.autorisationTel = false;
    this._autorisationsTelephone = ['Je ', 'ne veux pas ', 'que mon numéro de téléphone figure sur la liste des membres.'];
  }
}
telephoneHolder () {
  const area = this.membre.membre['telephone'].substring( 0 , 3 );
  const exchange = this.membre.membre['telephone'].substring( 4 , 7 );
  const subscriber = this.membre.membre['telephone'].substring( 8 , 12 );
  this.value = new MyTel( area , exchange , subscriber );
}
telephoneHolderConjouint () {
    const area = this.membreConjouint.membre['telephone'].substring( 0 , 3 );
    const exchange = this.membreConjouint.membre['telephone'].substring( 4 , 7 );
    const subscriber = this.membreConjouint.membre['telephone'].substring( 8 , 12 );
    this.valueConJouint = new MyTel( area , exchange , subscriber );
  }
  initForm() {

    this.infoPersoFormGroup = this._formBuilder.group({
      adhDateCtrl: [ this.membre.membre['adhDate'], Validators],
      infFacturationCtrl: [ this.membre.membre['infFacturation'], Validators],
      estMembreActifCtrl: [ this.membre.membre['estMembreActif'], Validators],
      emailCtrl: [ this.auth.userToken.email, Validators],
      dateNaissanceCtrl: [ this.membre.membre['dateNaissance'], Validators],
      typeCotisationCtrl: [ this.membre.membre['typeCotisation'], Validators],
      prenomCtrl: [this.membre.membre['prenom'], Validators.required],
      nomCtrl: [this.membre.membre['nom'] , Validators.required],
      adresseCtrl: [this.membre.membre['adresse'] , Validators.required],
      villeCtrl: [this.membre.membre['ville'] , Validators.required],
      codePostalCtrl: [this.membre.membre['codePostal'] , Validators.required],
      professionCtrl: [this.membre.membre['profession'] , Validators],
      telephoneCtrl: [this.membre.membre['telephone'] , Validators],
      courrielConjouintCtrl: [this.membre.membre['courrielConjouint'], Validators],
      teleListCtrl: [this.membre.membre['teleList'] , Validators],
      nomListeCtrl: [this.membre.membre['nomListe'] , Validators],
      animExcCtrl: [this.membre.membre['animExc'] , Validators],
      recenNoelCtrl: [this.membre.membre['recenNoel'] , Validators],
      animKioCtrl: [this.membre.membre['animKio'] , Validators],
      consAdmCtrl: [this.membre.membre['consAdm'] , Validators],
      redacReviCtrl: [this.membre.membre['redacRevi'] , Validators],
      promoPubliCtrl: [this.membre.membre['promoPubli'] , Validators],
      autreCtrl : [this.membre.membre['autre'] , Validators],
      c_emailCtrl: [this.membreConjouint.membre['email'] , Validators],
      c_prenomCtrl: [this.membreConjouint.membre['prenom'], Validators],
      c_nomCtrl: [this.membreConjouint.membre['nom'] , Validators],
      c_professionCtrl: [this.membreConjouint.membre['profession'] , Validators],
      c_telephoneCtrl: [this.membreConjouint.membre['telephone'], Validators],
      c_dateNaissanceCtrl: [this.membreConjouint.membre['dateNaissance'], Validators]
    });

  }
  formTel(e: any) {
    this.telForm = e;
  }
  conjointCourriel(e: string): string {
   // this.infoPersoFormGroup.controls['c_emailCtrl'].setValidators([ Validators.required]);
    let temp: string;
    if (e === 'familiale') {
      if (this.auth.memberIsInDataBase) {
        temp = this.infoPersoConjFormGroup.get('c_emailCtrl').value;

      } else {
        this.initFormConjouint();
        temp = this.infoPersoConjFormGroup.get('c_emailCtrl').value;

      }


    } else {

      temp = '';

    }

    return temp;
  }
  initFormConjouint() {
    this.infoPersoConjFormGroup = this._formBuilder.group({
      c_emailCtrl: [this.membreConjouint.membre['email'] ? this.membreConjouint.membre['email'] : '', Validators.email],
      c_prenomCtrl: [this.membreConjouint.membre['prenom'] ? this.membreConjouint.membre['prenom'] : '', Validators.required],
      c_nomCtrl: [this.membreConjouint.membre['nom'] ? this.membreConjouint.membre['nom'] : '', Validators.required],
      c_professionCtrl: [this.membreConjouint.membre['profession'] ? this.membreConjouint.membre['profession'] : '', Validators],
      c_telephoneCtrl: [this.membreConjouint.membre['telephone'] ? this.membreConjouint.membre['telephone'] : '', Validators],
      c_dateNaissanceCtrl: [this.membreConjouint.membre['dateNaissance'] ? this.membreConjouint.membre['dateNaissance'] : '', Validators],
    });
  }
  get infoPersoisDisabled(): boolean {
    let status: boolean;
    if (this.infoPersoFormGroup.status === 'VALID' && this.telForm.status  === 'VALID') {

      status = false;
    } else {
      status = true;
    }

    return status;
  }
  get infoPersoConjisDisabled(): boolean {
    let status: boolean;
    if (this.infoPersoConjFormGroup.status === 'VALID') {
      status = false;
    } else {
      status = true;
    }
    return status;
  }
  cotisationSelcted(e: any) {
    this.focus = 'prenom';

    this._formBuilder.group['typeCotisationCtrl'] = e.value;

  this.cotisation = e.value;
  if (e.value === 'familiale' ) {
    this.initFormConjouint();
    this.itemsFacturation = {type: 'adhesion', tabItems: [{
      id: 2, nom: 'Cotisation familiale', montant: this.inf.cotFamillial}] };
    if (this.membre.membre['courrielConjouint'] === '') {
      this.initialisationConjouint();

    }
  } else if (e.value === 'individuelle') {
    this.itemsFacturation = {type: 'adhesion', tabItems: [{
      id: 2, nom: 'Cotisation individuelle', montant: this.inf.cotInd}] };
  } else {
    this.itemsFacturation = {type: 'adhesion', tabItems: [{
      id: 2, nom: 'Cotisation organisme', montant: this.inf.cotOrg}] };
  }
    this.initFormConjouint();
  this.membreInfoAdd('typeCotisation', e.value);
    this.infoCotisation.next(e.value);
  }
  focusTel(e: any) {

    this.focus = e;
  }
  tel(e: any) {
    this._formBuilder.group['telephoneCtrl'] = e.value;
    this. membreInfoAdd('tel', e);

  }
  telConjouint(e: any, email: string, prenom: string, nom: string, profession: string) {
    this._formBuilder.group['c_telephoneCtrl'] = e.value;
    this.membreConjouint.membre['telephone'] = e;
  }
  autorisationsTelephone(e) {
    if (e.checked === true) {
      this._autorisationsTelephone = ['Je ', 'veux ', 'que mon numéro de téléphone figure sur la liste des membres.'];
    }else {
      this._autorisationsTelephone = ['Je ', 'ne veux pas ', 'que mon numéro de téléphone figure sur la liste des membres.'];
    }
    this.autorisationTel = e;
    this.membre.membre['teleList'] = e.checked;
  }
  autorisationsNom(e) {
    console.log('ee', e.checked);
    if (e.checked === true) {
      this._autorisationsNom = ['Je ', 'veux  ', ' que mon nom figure sur la liste des membres.'];
    }else {
      this._autorisationsNom = ['Je ', 'ne veux pas ', 'que mon nom figure sur la liste des membres.'];
    }
    this.autorisationNom = e;
    this.membre.membre['nomListe'] = e.checked;
  }
  checkBox(activite: string, event: any) {
    this.membre.membre[activite] = event.checked;
  }
  initialisationMembre() {
    this.membre.membre = {
      adhDateCtrl: '0',
      infFacturation : [],
      estMembreActif: false,
      email: '',
      nom: '',
      prenom: '',
      adresse: '',  // Référence à une autre interface
      ville: '',
      codePostal: '',
      telephone: '',
      profession: '',
      dateNaissance: '',
      typeCotisation: '',
      courrielConjouint: '',
      teleList: true,
      nomListe: true,
      animExc: false,
      recenNoel: false,
      animKio: false,
      consAdm: false,
      redacRevi: false,
      promoPubli: false,
      autre: ''
    };
  }
  initialisationConjouint() {
    this.membreConjouint.membre = {
        infFacturation : [],
        estMembreActif: false,
        email: '',
        nom: '',
        prenom: '',
        adresse: '',  // Référence à une autre interface
        ville: '',
        codePostal: '',
        telephone: '',
        profession: '',
        dateNaissance: '',
        typeCotisation: 'familiale',
        courrielConjouint: '',
        teleList: true,
        nomListe: true,
        animExc: false,
        recenNoel: false,
        animKio: false,
        consAdm: false,
        redacRevi: false,
        promoPubli: false,
        autre: ''
  };
  }
  membreInfoAdd(key: string, value: string) {
    const prevValue = value.substring(0, value.length - 1);
    const regexNoNumber: RegExp = new RegExp(/^[^\d]{1,}$/g);
    switch (key) {
      case 'nom':
      if ( !String(value).match(regexNoNumber)) {
        this.membre.membre['nom'] = prevValue;
      } else {
        this.membre.membre['nom'] = value;
        if (value.length === 1) {
          this.membre.membre['nom'] = value.toUpperCase();
        }
      }
        break;
      case 'prenom':

      if ( !String(value).match(regexNoNumber)) {
        this.membre.membre['prenom'] = prevValue;
      } else {
        this.membre.membre['prenom'] = value;
        if (value.length === 1) {
          this.membre.membre['prenom'] = value.toUpperCase();
        }
      }
        break;
      case 'adresse':
        this.membre.membre['adresse'] = value;
        break;
      case 'ville':
        this.membre.membre['ville'] = value;
        break;
      case 'codePostal':
        const regex: RegExp = new RegExp(/((^[A-z])$|(^[A-z]\d)$|(^[A-z]\d[A-z])$|(^[A-z]\d[A-z]\s)$|(^[A-z]\d[A-z]\s\d)$|(^[A-z]\d[A-z]\s\d[A-z])$|(^[A-z]\d[A-z]\s\d[A-z]\d)$)/g);
        if ( !String(value).match(regex)) {
          this.membre.membre['codePostal'] = prevValue;
        } else {
          this.membre.membre['codePostal'] = value.toUpperCase();
          if (value.length === 3) {
            this.membre.membre['codePostal'] = value + ' ';
          }
        }
        if (value.length === 7 && String(value).match(regex)) {
          this.focus = 'telephone';
        }
        break;
      case 'tel':
        const regexTel: RegExp = new RegExp(/(^\d$|^\d{1,3}$|^\d{1,3}\-$|^\d{1,3}\-\d{1,3}$|^\d{1,3}\-\d{1,3}\-$|^\d{1,3}\-\d{1,3}\-\d{1,4}$)/g);
        if ( !String(value).match(regexTel)) {
          this.membre.membre['telephone'] = prevValue;
        } else {
          this.membre.membre['telephone'] = value;
        }
        break;
      case 'profession':
      if ( !String(value).match(regexNoNumber)) {
        this.membre.membre['profession'] = prevValue;
      } else {
        this.membre.membre['profession'] = value;
      }
        break;
      case 'dateNaissance':
        this.membre.membre['dateNaissance'] = value;
     //   this.initForm();
        break;
      case 'typeCotisation':
        this.membre.membre['typeCotisation'] = value;
        break;
      case 'autre':
        this.membre.membre['autre'] = value;
        break;
      case 'courrielConjouint':
        this.membre.membre['courrielConjouint'] = value;
        this.membreConjouint.membre['email'] = value;
        this.membreConjouint.membre['courrielConjouint'] = this.membre['email'];
        break;
      case 'prenomConjouint':
      if ( !String(value).match(regexNoNumber)) {
        this.membreConjouint.membre['prenom'] = prevValue;
      } else {
        this.membreConjouint.membre['prenom'] = value;
        if (value.length === 1) {
          this.membreConjouint.membre['prenom'] = value.toUpperCase();
        }
      }
        break;
      case 'nomConjouint':
      if ( !String(value).match(regexNoNumber)) {
        this.membreConjouint.membre['nom'] = prevValue;
      } else {
        this.membreConjouint.membre['nom'] = value;
        if (value.length === 1) {
          this.membreConjouint.membre['nom'] = value.toUpperCase();
        }
      }
        break;
      case 'professionConjouint':
      if ( !String(value).match(regexNoNumber)) {
        this.membreConjouint.membre['profession'] = prevValue;
      } else {
        this.membreConjouint.membre['profession'] = value;
      }
        this.membreConjouint.membre['profession'] = value;
        break;
      case 'dateNaissanceConjouint':
        this.membreConjouint.membre['dateNaissance'] = value;
        break;
    }
    this.membreInfo.next(this.membre.membre);
    this.conjouintInfo.next(this.membreConjouint.membre);
    this.initForm();
  }
  clearFocus(e: any) {
    this.focus = '';

  }
  clickinfoPerso() {
  }
  _remerciement() {
    setTimeout(() => {
      this.message.message.next('inscription');
    }, 2000);
  }
}
