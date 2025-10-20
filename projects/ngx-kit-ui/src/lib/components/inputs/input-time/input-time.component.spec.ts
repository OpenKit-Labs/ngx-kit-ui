
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitInputTimeComponent } from './input-time.component';

describe('KitInputTimeComponent', () => {
  let component: KitInputTimeComponent;
  let fixture: ComponentFixture<KitInputTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitInputTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitInputTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
