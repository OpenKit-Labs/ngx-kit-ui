
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitCenterComponent } from './center.component';

describe('KitCenterComponent', () => {
  let component: KitCenterComponent;
  let fixture: ComponentFixture<KitCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
