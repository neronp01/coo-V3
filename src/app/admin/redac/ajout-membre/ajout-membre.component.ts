import { Component, OnInit } from '@angular/core';
import { AuthService, User} from '../../../auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { InformationService, Cotisation } from '../../../services/information.service';
import * as moment from 'moment';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-ajout-membre',
  templateUrl: './ajout-membre.component.html',
  styleUrls: ['./ajout-membre.component.css']
})
export class AjoutMembreComponent implements OnInit {
  infoPersoFormGroup: FormGroup;
  $cotisation: BehaviorSubject<Cotisation[]|null>;
  date = new FormControl(new Date());
  constructor(public auth: AuthService, private _formBuilder: FormBuilder, private inf: InformationService) { }

  ngOnInit() {
    this.getItemifo();
    this.initForm();
  }
  getItemifo() {
    this.$cotisation = new BehaviorSubject(null);
    this.inf.cotisationTable.subscribe( x => {
      this.$cotisation.next(x);
    }
    );
    this.$cotisation.subscribe( x => {
     console.log('cotisationObservable', x);
    }
    );
  }
  initForm() {
    // console.log('membre--', this.membre.membre);
        this.infoPersoFormGroup = this._formBuilder.group({
          adhDateCtrl: [moment(this.date.value).format('YYYYMMDD'), Validators.required],
          infFacturationCtrl: ['', Validators],
          estMembreActifCtrl: [ '', Validators],
          emailCtrl: [ '', Validators],
          dateNaissanceCtrl: [ '', Validators],
          typeCotisationCtrl: [ '', Validators],
          prenomCtrl: ['', Validators.required],
          nomCtrl: ['' , Validators.required],
          adresseCtrl: ['' , Validators.required],
          villeCtrl: ['' , Validators.required],
          codePostalCtrl: ['' , Validators.required],
          provinceCtrl: ['' , Validators.required],
          professionCtrl: ['' , Validators],
          telephoneCtrl: ['' , Validators],
          courrielConjouintCtrl: ['', Validators],
          teleListCtrl: ['' , Validators],
          nomListeCtrl: ['' , Validators],
          animExcCtrl: ['' , Validators],
          recenNoelCtrl: ['' , Validators],
          animKioCtrl: ['' , Validators],
          consAdmCtrl: ['' , Validators],
          redacReviCtrl: ['' , Validators],
          promoPubliCtrl: ['' , Validators],
          autreCtrl : ['' , Validators],
        });
    console.log('info' , this.infoPersoFormGroup);
      }
  clickProv(pr: any) {
  //  this._formBuilder.group['provinceCtrl'] = pr.value;
  //  this.membre.membre['province'] = pr.value;
  }
  sauverClick() {
    const _date = moment(this.date.value).format('YYYYMMDD');
    this.auth.adminAddMembre( this.infoPersoFormGroup, _date);
  }
  cotisationSelcted(e: any) {
    this._formBuilder.group['typeCotisationCtrl'] = e.value;
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const _date = moment(event.value).format('YYYYMMDD');
    this.date.setValue(event.value);
    console.log('date----' , this.date);
   // this._formBuilder.group['adhDateCtrl'] = _date;
    console.log('date' , this.infoPersoFormGroup);
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
}
