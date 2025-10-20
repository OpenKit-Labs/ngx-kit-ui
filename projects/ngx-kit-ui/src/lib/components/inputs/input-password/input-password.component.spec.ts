
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitInputPasswordComponent } from './input-password.component';

describe('KitInputPasswordComponent', () => {
  let component: KitInputPasswordComponent;
  let fixture: ComponentFixture<KitInputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitInputPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
