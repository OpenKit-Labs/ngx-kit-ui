
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTextButtonComponent } from './text-button.component';

describe('KitTextButtonComponent', () => {
  let component: KitTextButtonComponent;
  let fixture: ComponentFixture<KitTextButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitTextButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitTextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
