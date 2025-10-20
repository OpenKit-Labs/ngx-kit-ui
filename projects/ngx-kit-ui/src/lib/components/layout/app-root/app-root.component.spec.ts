import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitAppRootComponent } from './app-root.component';

describe('KitAppRootComponent', () => {
    let component: KitAppRootComponent;
    let fixture: ComponentFixture<KitAppRootComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [KitAppRootComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(KitAppRootComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
