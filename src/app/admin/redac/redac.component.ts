import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

export class State {
  constructor(public name: string, public population: string, public flag: string) { }
}

@Component({
  selector: 'app-redac',
  templateUrl: './redac.component.html',
  styleUrls: ['./redac.component.scss']
})
export class RedacComponent implements OnInit {
  stateCtrl: FormControl;
  date = new FormControl(new Date());
  infoOrnitaouais: FormGroup;
  parent: string;
  filteredStates: Observable<any[]>;
  input_obj = { parent: 'Ornitaouais', data: this.infoOrnitaouais };
  states: State[] = [
    {
      name: 'Grand Pic',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'Geai bleu',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Dindon sauvage',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Merlebleu de l\'Est',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  birds = [];
  constructor(private _formBuilder: FormBuilder) {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.states.slice())
      );
  }

  ngOnInit() {
    this.initForm();
  }
  filterStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  selectedBird(a: any, numero: number, volume: number, dateParu: number) {
    console.log(numero, volume, dateParu);
this.birds.push(a);
this.stateCtrl.setValue('');
const temp = this.birds;
this.date = new FormControl(dateParu);
this.infoOrnitaouais.setValue({
  volumeCtrl: volume,
      numeroCtrl: numero,
      dateParutionCtrl: moment(dateParu).format(),
      birdCtrl: this.birds
});
console.log(this.infoOrnitaouais, this.date.value);
  }
  initForm() {
    //  formControlName="prenomCtrl"
    this.infoOrnitaouais = this._formBuilder.group({
      volumeCtrl: [ 0, Validators],
      numeroCtrl: [ 0, Validators],
      dateParutionCtrl: [ new Date(), Validators],
      birdCtrl: [ 0, Validators]
    });
  }
  _parent(a: any) {
    switch (a.index) {
      case 1 :
      this.parent = 'ornitaouais';
      break;
    }
  }
  clear(a: any) {
    switch (a) {
      case 'ornitaouais' :
      this.initForm();
      this.birds = [];
      break;
    }
  }
}
