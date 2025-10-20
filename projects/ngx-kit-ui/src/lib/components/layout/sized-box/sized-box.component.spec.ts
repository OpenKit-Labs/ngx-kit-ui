
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitSizedBoxComponent } from './sized-box.component';

describe('KitSizedBoxComponent', () => {
  let component: KitSizedBoxComponent;
  let fixture: ComponentFixture<KitSizedBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitSizedBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitSizedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
