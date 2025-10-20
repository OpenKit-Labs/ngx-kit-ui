
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitRowComponent } from './row.component';

describe('KitRowComponent', () => {
  let component: KitRowComponent;
  let fixture: ComponentFixture<KitRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
