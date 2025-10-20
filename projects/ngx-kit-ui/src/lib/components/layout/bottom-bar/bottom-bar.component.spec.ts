import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitBottomBarComponent } from './bottom-bar.component';

describe('KitBottomBarComponent', () => {
  let component: KitBottomBarComponent;
  let fixture: ComponentFixture<KitBottomBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitBottomBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitBottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
