import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferfontComponent } from './transferfont.component';

describe('TransferfontComponent', () => {
  let component: TransferfontComponent;
  let fixture: ComponentFixture<TransferfontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferfontComponent]
    });
    fixture = TestBed.createComponent(TransferfontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
