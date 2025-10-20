
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTextLinkComponent } from './text-link.component';

describe('KitTextLinkComponent', () => {
  let component: KitTextLinkComponent;
  let fixture: ComponentFixture<KitTextLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitTextLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitTextLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
