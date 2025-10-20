
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTopBarComponent } from './top-bar.component';

describe('KitTopBarComponent', () => {
  let component: KitTopBarComponent;
  let fixture: ComponentFixture<KitTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitTopBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
