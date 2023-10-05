import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSoleComponent } from './get-sole.component';

describe('GetSoleComponent', () => {
  let component: GetSoleComponent;
  let fixture: ComponentFixture<GetSoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetSoleComponent]
    });
    fixture = TestBed.createComponent(GetSoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
