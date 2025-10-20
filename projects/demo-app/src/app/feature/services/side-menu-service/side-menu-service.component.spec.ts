import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuServiceComponent } from '../side-menu/side-menu.component';

describe('SideMenuServiceComponent', () => {
  let component: SideMenuServiceComponent;
  let fixture: ComponentFixture<SideMenuServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
