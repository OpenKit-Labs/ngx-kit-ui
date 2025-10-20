import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitAvatarComponent } from './avatar.component';

describe('KitAvatarComponent', () => {
  let component: KitAvatarComponent;
  let fixture: ComponentFixture<KitAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitAvatarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(KitAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
