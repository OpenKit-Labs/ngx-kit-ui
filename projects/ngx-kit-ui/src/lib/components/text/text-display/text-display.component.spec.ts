
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTextDisplayComponent } from './text-display.component';

describe('KitTextDisplayComponent', () => {
  let component: KitTextDisplayComponent;
  let fixture: ComponentFixture<KitTextDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitTextDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitTextDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
