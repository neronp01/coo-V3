import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrnithoComponent } from './ornitho.component';

describe('OrnithoComponent', () => {
  let component: OrnithoComponent;
  let fixture: ComponentFixture<OrnithoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrnithoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnithoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
