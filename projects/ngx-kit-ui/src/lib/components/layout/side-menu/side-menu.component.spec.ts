
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitSideMenuComponent } from './side-menu.component';

describe('KitSideMenuComponent', () => {
  let component: KitSideMenuComponent;
  let fixture: ComponentFixture<KitSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitSideMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
