
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitDividerComponent } from './divider.component';

describe('KitDividerComponent', () => {
  let component: KitDividerComponent;
  let fixture: ComponentFixture<KitDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitDividerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
