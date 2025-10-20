import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitContainerComponent } from './container.component';

describe('KitContainerComponent', () => {
  let component: KitContainerComponent;
  let fixture: ComponentFixture<KitContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
