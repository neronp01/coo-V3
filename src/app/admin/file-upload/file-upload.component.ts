import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @ Input () input_obj: FormGroup;
  @ Input () parent: string;
  @ Output () clear = new EventEmitter<string>();
  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;



  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {


   }
   ngOnInit() {

  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'application') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `journalPDF/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges();

    // The file's download URL
    this.downloadURL = this.task.downloadURL();
    console.log('file:' , this.downloadURL);
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.downloadURL.subscribe(x => {
            console.log('ici' , x);
            this.db.collection(this.parent).add( this.dataObject(path, x));
            this.clear.emit(this.parent);
          });
        }
      })
    );
  }
dataObject(path: string, downPath: string): object {
  let obj: object;
  switch (this.parent) {
    case 'ornitaouais':
    obj = { path: path , numero: this.input_obj.get('numeroCtrl').value,
    volume: this.input_obj.get('volumeCtrl').value,
    date: this.input_obj.get('dateParutionCtrl').value,
    data: this.input_obj.get('birdCtrl').value,
    downLoadPath: downPath
   };
    break;
    case 'evenements':
    obj = { path: path,
      date: this.input_obj.get('dateCtrl').value,
  user: this.input_obj.get('userCtrl').value,
  titre: this.input_obj.get('titreCtrl').value,
  setup: this.input_obj.get('setupCtrl').value,
  texte: this.input_obj.get('texteCtrl').value,
  downLoadPath: downPath
   };
    break;
  }
  return obj;
}
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }


}
