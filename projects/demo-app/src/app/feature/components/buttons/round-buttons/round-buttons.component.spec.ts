import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundButtonsComponent } from './round-buttons.component';

describe('RoundButtonsComponent', () => {
  let component: RoundButtonsComponent;
  let fixture: ComponentFixture<RoundButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
