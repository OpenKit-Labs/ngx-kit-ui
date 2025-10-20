
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitInputOtpComponent } from './input-otp.component';

describe('KitInputOtpComponent', () => {
  let component: KitInputOtpComponent;
  let fixture: ComponentFixture<KitInputOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitInputOtpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitInputOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
