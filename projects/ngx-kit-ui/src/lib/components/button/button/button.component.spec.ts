
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitButtonComponent } from './button.component';

describe('KitButtonComponent', () => {
  let component: KitButtonComponent;
  let fixture: ComponentFixture<KitButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
