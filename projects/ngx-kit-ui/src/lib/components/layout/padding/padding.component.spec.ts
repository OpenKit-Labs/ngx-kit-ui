
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitPaddingComponent } from './padding.component';

describe('KitPaddingComponent', () => {
  let component: KitPaddingComponent;
  let fixture: ComponentFixture<KitPaddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitPaddingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitPaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
