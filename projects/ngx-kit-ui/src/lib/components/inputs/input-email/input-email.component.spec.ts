
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitInputEmailComponent } from './input-email.component';

describe('KitInputEmailComponent', () => {
  let component: KitInputEmailComponent;
  let fixture: ComponentFixture<KitInputEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KitInputEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitInputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
