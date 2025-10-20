
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTextHeadingComponent } from './text-heading.component';

describe('KitTextHeadingComponent', () => {
  let component: KitTextHeadingComponent;
  let fixture: ComponentFixture<KitTextHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitTextHeadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitTextHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
