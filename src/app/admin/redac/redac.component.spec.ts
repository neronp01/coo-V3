import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedacComponent } from './redac.component';

describe('RedacComponent', () => {
  let component: RedacComponent;
  let fixture: ComponentFixture<RedacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
