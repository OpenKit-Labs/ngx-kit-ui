
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTabContentComponent } from './tab-content.component';

describe('KitTabContentComponent', () => {
  let component: KitTabContentComponent;
  let fixture: ComponentFixture<KitTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitTabContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
