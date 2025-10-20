import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestureDetectorComponent } from './gesture-detector.component';

describe('GestureDetectorComponent', () => {
  let component: GestureDetectorComponent;
  let fixture: ComponentFixture<GestureDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestureDetectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestureDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
