
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTextCaptionComponent } from './text-caption.component';

describe('KitTextCaptionComponent', () => {
  let component: KitTextCaptionComponent;
  let fixture: ComponentFixture<KitTextCaptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitTextCaptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitTextCaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
