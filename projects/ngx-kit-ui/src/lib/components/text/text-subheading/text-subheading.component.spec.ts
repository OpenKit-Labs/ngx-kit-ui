
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTextSubheadingComponent } from './text-subheading.component';

describe('KitTextSubheadingComponent', () => {
  let component: KitTextSubheadingComponent;
  let fixture: ComponentFixture<KitTextSubheadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitTextSubheadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitTextSubheadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
