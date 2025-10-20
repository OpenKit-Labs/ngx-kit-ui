
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTabViewComponent } from './tab-view.component';

describe('KitTabViewComponent', () => {
  let component: KitTabViewComponent;
  let fixture: ComponentFixture<KitTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitTabViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
