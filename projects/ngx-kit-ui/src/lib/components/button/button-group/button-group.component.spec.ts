
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitButtonGroupComponent } from './button-group.component';

describe('KitButtonGroupComponent', () => {
  let component: KitButtonGroupComponent;
  let fixture: ComponentFixture<KitButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitButtonGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
