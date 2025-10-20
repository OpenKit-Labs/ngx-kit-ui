
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitExpandedComponent } from './expanded.component';

describe('KitExpandedComponent', () => {
  let component: KitExpandedComponent;
  let fixture: ComponentFixture<KitExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitExpandedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
