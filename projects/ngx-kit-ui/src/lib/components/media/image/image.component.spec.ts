import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitImageComponent } from './image.component';

describe('KitImageComponent', () => {
  let component: KitImageComponent;
  let fixture: ComponentFixture<KitImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
