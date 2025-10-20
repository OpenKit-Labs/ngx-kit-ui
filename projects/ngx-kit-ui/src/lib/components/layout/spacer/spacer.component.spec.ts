
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitSpacerComponent } from './spacer.component';

describe('KitSpacerComponent', () => {
  let component: KitSpacerComponent;
  let fixture: ComponentFixture<KitSpacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitSpacerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitSpacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
