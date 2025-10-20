
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitBadgeComponent } from './badge.component';

describe('KitBadgeComponent', () => {
  let component: KitBadgeComponent;
  let fixture: ComponentFixture<KitBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
