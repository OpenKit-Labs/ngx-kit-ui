import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { KitDialogComponent } from './dialog.component';
import { KitScreenService } from '../../../services/screen/screen.service';

describe('KitDialogComponent', () => {
  let component: KitDialogComponent;
  let fixture: ComponentFixture<KitDialogComponent>;

  beforeEach(async () => {
    const screenServiceMock = { currentSize$: of('medium') };

    await TestBed.configureTestingModule({
      imports: [KitDialogComponent],
      providers: [
        { provide: KitScreenService, useValue: screenServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(KitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
