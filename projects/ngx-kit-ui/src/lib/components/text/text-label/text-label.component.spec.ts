
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTextLabelComponent } from './text-label.component';

describe('KitTextLabelComponent', () => {
  let component: KitTextLabelComponent;
  let fixture: ComponentFixture<KitTextLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitTextLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitTextLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
