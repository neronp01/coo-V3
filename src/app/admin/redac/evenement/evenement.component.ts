import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TexteService } from './texte.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent implements OnInit {
  input_obj: FormGroup;
  parent: string;
  task: AngularFireUploadTask;
  _texte: Observable<string>;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;
  constructor(private _formBuilder: FormBuilder, private texte: TexteService,
     private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit() {
    this.parent = 'evenements';
    this.initForm();
  }
  clear(e: any) {

  }
  initForm() {
    this.input_obj = this._formBuilder.group({
      titreCtrl: [ '', Validators],
      numeroCtrl: [ 0, Validators],
      dateParutionCtrl: [ new Date(), Validators],
      birdCtrl: [ 0, Validators]
    });
  }
  startUpload(entries: any) {

  }
}
// this.texte.getTextFile('url').subscribe( x => {
//   console.log(x);
// });
