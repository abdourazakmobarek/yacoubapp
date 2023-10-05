import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingComponent } from './feeding.component';

describe('FeedingComponent', () => {
  let component: FeedingComponent;
  let fixture: ComponentFixture<FeedingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedingComponent]
    });
    fixture = TestBed.createComponent(FeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
