import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrnitaouaisComponent } from './ornitaouais.component';

describe('OrnitaouaisComponent', () => {
  let component: OrnitaouaisComponent;
  let fixture: ComponentFixture<OrnitaouaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrnitaouaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnitaouaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
