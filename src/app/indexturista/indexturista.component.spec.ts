import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexturistaComponent } from './indexturista.component';

describe('IndexturistaComponent', () => {
  let component: IndexturistaComponent;
  let fixture: ComponentFixture<IndexturistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexturistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexturistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
