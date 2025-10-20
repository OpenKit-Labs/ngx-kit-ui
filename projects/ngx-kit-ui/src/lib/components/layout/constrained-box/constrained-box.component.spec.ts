import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitConstrainedBoxComponent } from './constrained-box.component';

describe('KitConstrainedBoxComponent', () => {
  let component: KitConstrainedBoxComponent;
  let fixture: ComponentFixture<KitConstrainedBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitConstrainedBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitConstrainedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
