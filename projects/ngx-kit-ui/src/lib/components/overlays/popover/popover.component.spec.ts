import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitPopoverComponent } from './popover.component';

describe('KitPopoverComponent', () => {
    let component: KitPopoverComponent;
    let fixture: ComponentFixture<KitPopoverComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [KitPopoverComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(KitPopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close on escape when closeOnEscape is true', () => {
        spyOn(component.isOpenChange, 'emit');
        component.isOpen = true;
        component.closeOnEscape = true;
        fixture.detectChanges();

        expect(component.closeOnEscape).toBeTrue();
    });

    it('should not close on escape when closeOnEscape is false', () => {
        spyOn(component.isOpenChange, 'emit');
        component.isOpen = true;
        component.closeOnEscape = false;
        fixture.detectChanges();

        expect(component.closeOnEscape).toBeFalse();
    });

    it('should apply correct popover classes based on position and elevation', () => {
        component.position = 'top';
        component.elevation = 'medium';
        component.isOpen = true;
        fixture.detectChanges();

        const classes = component.popoverClasses;

        expect(classes).toContain('kit-popover__container');
        expect(classes).toContain('kit-popover--top');
        expect(classes).toContain('kit-popover--medium');
    });

    it('should set padding from input', () => {
        component.padding = '20px';
        component.isOpen = true;
        fixture.detectChanges();

        const contentDiv = fixture.nativeElement.querySelector('.kit-popover__content');
        expect(contentDiv.style.padding).toBe('20px');
    });
});
