
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTextBodyComponent } from './text-body.component';

describe('KitTextBodyComponent', () => {
  let component: KitTextBodyComponent;
  let fixture: ComponentFixture<KitTextBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitTextBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitTextBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
