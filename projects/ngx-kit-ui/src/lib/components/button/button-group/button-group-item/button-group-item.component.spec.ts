
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitButtonGroupItemComponent } from './button-group-item.component';

describe('KitButtonGroupItemComponent', () => {
  let component: KitButtonGroupItemComponent;
  let fixture: ComponentFixture<KitButtonGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitButtonGroupItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitButtonGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
