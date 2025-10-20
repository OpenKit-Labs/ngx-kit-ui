import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularButtonsComponent } from '../buttons.component';

describe('RegularButtonsComponent', () => {
  let component: RegularButtonsComponent;
  let fixture: ComponentFixture<RegularButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegularButtonsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegularButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
