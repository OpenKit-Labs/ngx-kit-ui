import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostShellComponent } from './host-shell.component';

describe('HostShellComponent', () => {
  let component: HostShellComponent;
  let fixture: ComponentFixture<HostShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
