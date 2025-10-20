import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingActionButtonsComponent } from './floating-action-buttons.component';

describe('FloatingActionButtonsComponent', () => {
  let component: FloatingActionButtonsComponent;
  let fixture: ComponentFixture<FloatingActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingActionButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
