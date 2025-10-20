
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitFloatingActionButtonComponent } from './floating-action-button.component';

describe('KitFloatingActionButtonComponent', () => {
  let component: KitFloatingActionButtonComponent;
  let fixture: ComponentFixture<KitFloatingActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitFloatingActionButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitFloatingActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
