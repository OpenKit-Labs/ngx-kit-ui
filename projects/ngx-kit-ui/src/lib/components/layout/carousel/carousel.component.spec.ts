
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitCarouselComponent } from './carousel.component';

describe('KitCarouselComponent', () => {
  let component: KitCarouselComponent;
  let fixture: ComponentFixture<KitCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
