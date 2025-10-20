
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitInputNumberComponent } from './input-number.component';

describe('KitInputNumberComponent', () => {
  let component: KitInputNumberComponent;
  let fixture: ComponentFixture<KitInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitInputNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
