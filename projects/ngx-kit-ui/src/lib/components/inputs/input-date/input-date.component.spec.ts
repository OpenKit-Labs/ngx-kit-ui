
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitInputDateComponent } from './input-date.component';

describe('KitInputDateComponent', () => {
  let component: KitInputDateComponent;
  let fixture: ComponentFixture<KitInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitInputDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
