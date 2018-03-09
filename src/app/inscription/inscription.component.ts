import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, ElementRef, Input, OnDestroy, Renderer2, OnInit, Output, EventEmitter} from '@angular/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs/Subject';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService, User} from '../auth.service';
import {VALID} from '@angular/forms/src/model';
import { Membre } from '../services/membre.model';
import { InformationService } from '../services/information.service';


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

  constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef,
              renderer: Renderer2) {
    this.parts =  fb.group({
      'area': '',
      'exchange': '',
      'subscriber': '',
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
  onKey() {
    const tel = this.parts.value['area'] + '-' + this.parts.value['exchange'] + '-' + this.parts.value['subscriber'];

    if (tel.length === 12) {
      this.tel.emit(tel);
    } else {
      this.tel.emit('');
    }
  }
}

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})

export class InscriptionComponent implements OnInit {
  membre: User;
  membreConjouint: User;
  membreInfo: BehaviorSubject<Membre>;
  _membre: Membre;
  itemsFacturation = {type: 'adhesion', tabItems: [1] };
  conjouintInfo: BehaviorSubject<Membre>;
  infoCotisation: BehaviorSubject<string>;
  infoPersoFormGroup: FormGroup;
  infoPersoConjFormGroup: FormGroup;
  factureFormGroup: FormGroup;
  infMembreFacturation: Membre; // variable envoyé dans module facturation
  infConjouintFacturation: Membre;
  cotisation: string;
  infoDatabaseMembre: User;
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
  constructor(private _formBuilder: FormBuilder, private auth: AuthService, private inf: InformationService) {
    this.initUserConjouint();
    this.membre = this.auth.userToken;
    if (this.auth.memberIsInDataBase) {
      this.infMembreFacturation = auth.userToken['membre'];
        this.initForm();
        this._membre = this.membre.membre;
        this._dateNaissance = this.membre.membre['dateNaissance'];
        this.telephoneHolder();
        if (this.membre.membre['typeCotisation'] === 'familiale') {

          this.auth.getConjouintInfo(this.membre.membre['courrielConjouint']).subscribe(y => {
            this.cotisation = 'familiale';
            console.log('sdfsdfsdgssg');
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

      this.initialisationMembre();
      this.initialisationConjouint();
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
      cotisationsCtrl: [this.membre.membre['typeCotisation'] ? this.membre.membre['typeCotisation'] : '', Validators.required],
      prenomCtrl: [this.membre.membre['prenom'] ? this.membre.membre['prenom'] : '', Validators.required],
      nomCtrl: [this.membre.membre['nom'] ? this.membre.membre['nom'] : '', Validators.required],
      adresseCtrl: [this.membre.membre['adresse'] ? this.membre.membre['adresse'] : '', Validators.required],
      villeCtrl: [this.membre.membre['ville'] ? this.membre.membre['ville'] : '', Validators.required],
      codePostalCtrl: [this.membre.membre['codePostal'] ? this.membre.membre['codePostal'] : '', Validators.required],
      professionCtrl: [this.membre.membre['profession'] ? this.membre.membre['profession'] : '', Validators],
    });
  }
  initFormConjouint() {
    this.infoPersoConjFormGroup = this._formBuilder.group({
      emailCtrl: [this.membreConjouint.membre['email'] ? this.membreConjouint.membre['email'] : '', Validators.required],
      prenomCtrl: [this.membreConjouint.membre['prenom'] ? this.membreConjouint.membre['prenom'] : '', Validators.required],
      nomCtrl: [this.membreConjouint.membre['nom'] ? this.membreConjouint.membre['nom'] : '', Validators.required],
      professionCtrl: [this.membreConjouint.membre['profession'] ? this.membreConjouint.membre['profession'] : '', Validators],
    });
  }
  get infoPersoisDisabled(): boolean {
    let status: boolean;
    if (this.infoPersoFormGroup.status === 'VALID') {

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
  this.cotisation = e.value;
  if (e.value === 'familiale' ) {
    if (this.membre.membre['courrielConjouint'] === '') {

      this.initialisationConjouint();
    }

  }
    this.initFormConjouint();
  this.membreInfoAdd('typeCotisation', e.value);
    this.infoCotisation.next(e.value);
  }
  tel(e: any, prenom: string, nom: string, adresse: string, ville: string, codePostal: string, profession: string) {
    this.infoPersoFormGroup = this._formBuilder.group({
      cotisationsCtrl: [this.cotisation, Validators.required],
      prenomCtrl: [prenom, Validators.required],
      nomCtrl: [nom, Validators.required],
      adresseCtrl: [adresse, Validators.required],
      villeCtrl: [ville, Validators.required],
      codePostalCtrl: [codePostal, Validators.required],
      telephoneCtrl: [e, Validators.required],
      professionCtrl: [profession, Validators]
    });
    this. membreInfoAdd('tel', e);
  }
  telConjouint(e: any, email: string, prenom: string, nom: string, profession: string) {
    this.infoPersoConjFormGroup = this._formBuilder.group({
      emailCtrl: [email, Validators.required],
      prenomCtrl: [prenom, Validators.required],
      nomCtrl: [nom, Validators.required],
      telephoneCtrl: [e, Validators.required],
      professionCtrl: [profession, Validators],
    });
    this.membreConjouint.membre['telephone'] = e;
  }
  autorisationsTelephone(e) {
    if (e.checked === true) {
      this._autorisationsTelephone = ['Je ', 'ne veux pas ', 'que mon numéro de téléphone figure sur la liste des membres.'];
    }else {
      this._autorisationsTelephone = ['Je ', 'veux ', 'que mon numéro de téléphone figure sur la liste des membres.'];
    }
    this.autorisationTel = e;
    this.membre.membre['teleList'] = e.checked;
  }
  autorisationsNom(e) {
    if (e.checked === true) {
      this._autorisationsNom = ['Je ', 'ne veux pas ', 'que mon nom figure sur la liste des membres.'];
    }else {
      this._autorisationsNom = ['Je ', 'veux  ', ' que mon nom figure sur la liste des membres.'];
    }
    this.autorisationNom = e;
    this.membre.membre['nomListe'] = e.checked;
  }
  checkBox(activite: string, event: any) {
    this.membre.membre[activite] = event.checked;
  }
  initialisationMembre() {
    this.membre.membre = {
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
    switch (key) {
      case 'nom':
        this.membre.membre['nom'] = value;
        this.membreInfo.next(this.membre.membre);
        break;
      case 'prenom':
        this.membre.membre['prenom'] = value;
        this.membreInfo.next(this.membre.membre);
        break;
      case 'adresse':
        this.membre.membre['adresse'] = value;
        this.membreInfo.next(this.membre.membre);
        break;
      case 'ville':
        this.membre.membre['ville'] = value;
        this.membreInfo.next(this.membre.membre);
        break;
      case 'codePostal':
        this.membre.membre['codePostal'] = value;
        this.membreInfo.next(this.membre.membre);
        break;
      case 'tel':
        this.membre.membre['telephone'] = value;
        this.membreInfo.next(this.membre.membre);
        break;
      case 'profession':
        this.membre.membre['profession'] = value;
        this.membreInfo.next(this.membre.membre);
        break;
      case 'dateNaissance':
        this.membre.membre['dateNaissance'] = value;
        this.membreInfo.next(this.membre.membre);
        break;
      case 'typeCotisation':
        this.membre.membre['typeCotisation'] = value;
        this.membreInfo.next(this.membre.membre);
        break;
      case 'autre':
        this.membre.membre['autre'] = value;
        this.membreInfo.next(this.membre.membre);
        break;
      case 'courrielConjouint':
        this.membre.membre['courrielConjouint'] = value;
        this.membreConjouint.membre['email'] = value;
        this.membreConjouint.membre['courrielConjouint'] = this.membre['email'];
        this.membreInfo.next(this.membre.membre);
        this.conjouintInfo.next(this.membreConjouint.membre);
        break;
      case 'prenomConjouint':
        this.membreConjouint.membre['prenom'] = value;
        this.conjouintInfo.next(this.membreConjouint.membre);
        break;
      case 'nomConjouint':
        this.membreConjouint.membre['nom'] = value;
        this.conjouintInfo.next(this.membreConjouint.membre);
        break;
      case 'professionConjouint':
        this.membreConjouint.membre['profession'] = value;
        this.conjouintInfo.next(this.membreConjouint.membre);
        break;
      case 'dateNaissanceConjouint':
        this.membreConjouint.membre['dateNaissance'] = value;
        this.conjouintInfo.next(this.membreConjouint.membre);
        break;
    }
  }

}
