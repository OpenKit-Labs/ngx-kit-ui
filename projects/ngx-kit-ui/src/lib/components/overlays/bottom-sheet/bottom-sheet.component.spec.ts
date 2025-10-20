import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KitBottomSheetComponent } from './bottom-sheet.component';

describe('KitBottomSheetComponent', () => {
  let component: KitBottomSheetComponent;
  let fixture: ComponentFixture<KitBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitBottomSheetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
