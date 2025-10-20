import { Component, Input } from '@angular/core';

/**
 * TabContentComponent represents the content of a single tab.
 * Uses the CSS hidden display mode for better performance.
 */
@Component({
    selector: 'kit-tab-content',
    templateUrl: './tab-content.component.html',
    styleUrls: ['./tab-content.component.scss'],
    standalone: true,
    imports: []
})
export class KitTabContentComponent {
    /** Title to display in the tab header */
    @Input() title: string = '';

    /** Whether this tab is currently active */
    @Input() active = false;
}
