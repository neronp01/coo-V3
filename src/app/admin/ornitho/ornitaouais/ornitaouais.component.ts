import { Component, OnInit, HostBinding, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { OrnitaouaisService, Ornitaouais } from '../../ornitaouais.service';
import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'app-ornitaouais',
  templateUrl: './ornitaouais.component.html',
  styleUrls: ['./ornitaouais.component.scss']
})
export class OrnitaouaisComponent implements OnInit {
  @ Input () _orni: Ornitaouais[];
  downLoadPath: string;
  displayedColumns = ['date', 'data', 'downLoadPath'];
  dataSource = new MatTableDataSource(this._orni);
  panelOpenState = false;
  ornataouais: Observable<Ornitaouais[]>;
  constructor(private orni: OrnitaouaisService) {
    console.log('testsssss', this._orni);
   this.test();
  }

  test() {
    this.orni.ornitao.subscribe( x => {
      this.dataSource = new MatTableDataSource(x);
    });
  }
  ngOnInit() {

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
