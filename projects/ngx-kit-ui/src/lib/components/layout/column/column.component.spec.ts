
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitColumnComponent } from './column.component';

describe('KitColumnComponent', () => {
  let component: KitColumnComponent;
  let fixture: ComponentFixture<KitColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
