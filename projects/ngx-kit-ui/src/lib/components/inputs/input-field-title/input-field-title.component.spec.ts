
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitInputFieldTitleComponent } from './input-field-title.component';

describe('KitInputFieldTitleComponent', () => {
  let component: KitInputFieldTitleComponent;
  let fixture: ComponentFixture<KitInputFieldTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitInputFieldTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitInputFieldTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
