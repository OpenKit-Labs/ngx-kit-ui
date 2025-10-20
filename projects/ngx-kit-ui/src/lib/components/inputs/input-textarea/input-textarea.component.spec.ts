
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitInputTextareaComponent } from './input-textarea.component';

describe('KitInputTextareaComponent', () => {
  let component: KitInputTextareaComponent;
  let fixture: ComponentFixture<KitInputTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitInputTextareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitInputTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
