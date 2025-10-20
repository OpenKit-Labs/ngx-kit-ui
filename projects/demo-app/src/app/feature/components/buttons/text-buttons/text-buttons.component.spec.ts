import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextButtonsComponent } from './text-buttons.component';

describe('TextButtonsComponent', () => {
  let component: TextButtonsComponent;
  let fixture: ComponentFixture<TextButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
