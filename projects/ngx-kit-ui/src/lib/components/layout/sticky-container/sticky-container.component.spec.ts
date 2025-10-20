import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitStickyContainerComponent } from './sticky-container.component';

describe('KitStickyContainerComponent', () => {
  let component: KitStickyContainerComponent;
  let fixture: ComponentFixture<KitStickyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitStickyContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitStickyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
