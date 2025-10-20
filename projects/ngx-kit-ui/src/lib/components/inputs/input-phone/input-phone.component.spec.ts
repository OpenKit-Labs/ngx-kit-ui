
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitInputPhoneComponent } from './input-phone.component';

describe('KitInputPhoneComponent', () => {
  let component: KitInputPhoneComponent;
  let fixture: ComponentFixture<KitInputPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitInputPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitInputPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
