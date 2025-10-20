
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitInputSelectComponent } from './input-select.component';

describe('KitInputSelectComponent', () => {
  let component: KitInputSelectComponent;
  let fixture: ComponentFixture<KitInputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitInputSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
