import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMembreComponent } from './ajout-membre.component';

describe('AjoutMembreComponent', () => {
  let component: AjoutMembreComponent;
  let fixture: ComponentFixture<AjoutMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
