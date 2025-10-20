
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitRoundButtonComponent } from './round-button.component';

describe('KitRoundButtonComponent', () => {
  let component: KitRoundButtonComponent;
  let fixture: ComponentFixture<KitRoundButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitRoundButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitRoundButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
