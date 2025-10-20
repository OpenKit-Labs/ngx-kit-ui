
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitInputTextComponent } from './input-text.component';

describe('KitInputTextComponent', () => {
  let component: KitInputTextComponent;
  let fixture: ComponentFixture<KitInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitInputTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
