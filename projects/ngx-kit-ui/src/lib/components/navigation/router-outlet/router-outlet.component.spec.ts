import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitRouterOutletComponent } from './router-outlet.component';

describe('KitRouterOutletComponent', () => {
  let component: KitRouterOutletComponent;
  let fixture: ComponentFixture<KitRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitRouterOutletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
