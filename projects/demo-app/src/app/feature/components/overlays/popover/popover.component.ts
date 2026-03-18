import { Component } from '@angular/core';
import { KitOverlaysModule, KitButtonModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
    selector: 'app-popover',
    standalone: true,
    imports: [KitOverlaysModule, KitButtonModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
    isPopoverOpen = false;

    isPositionPopoverOpen = false;
    selectedPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

    importModule = `import { KitOverlaysModule } from '@openkit-labs/ngx-kit-ui';`;
    importComponent = `import { KitPopoverComponent } from '@openkit-labs/ngx-kit-ui';`;
    usage = `<kit-button id="my-btn" (click)="isOpen = !isOpen">Open</kit-button>\n<kit-popover [isOpen]="isOpen" (isOpenChange)="isOpen = \$event"\n             ownerElement="my-btn" position="bottom">\n  Popover content here\n</kit-popover>`;

    inputsDefinition = [
        { title: 'Input', lookupField: 'input' },
        { title: 'Type', lookupField: 'type' },
        { title: 'Default', lookupField: 'default' },
        { title: 'Description', lookupField: 'description' }
    ];

    inputsDataset = [
        { input: 'isOpen', type: 'boolean', default: 'false', description: 'Controls whether the popover is open or closed.' },
        { input: 'ownerElement', type: 'string', default: 'undefined', description: 'The id of the element this popover is anchored to. Add id="foo" to the trigger and set ownerElement="foo".' },
        { input: 'position', type: 'PopoverPosition', default: "'bottom'", description: 'Position relative to the owner element. Options: top, bottom, left, right.' },
        { input: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Closes the popover when Escape is pressed.' },
        { input: 'closeOnScroll', type: 'boolean', default: 'true', description: 'Closes the popover when the page is scrolled.' },
        { input: 'padding', type: 'string', default: "'12px'", description: 'Padding inside the popover content area.' }
    ];

    outputsDefinition = [
        { title: 'Output', lookupField: 'output' },
        { title: 'Type', lookupField: 'type' },
        { title: 'Description', lookupField: 'description' }
    ];

    outputsDataset = [
        { output: 'isOpenChange', type: 'EventEmitter<boolean>', description: 'Emitted when the popover requests a state change (e.g. Escape key).' }
    ];

    stylingDefinition = [
        { title: 'Variable', lookupField: 'variable' },
        { title: 'Default', lookupField: 'default' },
        { title: 'Description', lookupField: 'description' }
    ];

    stylingDataset = [
        { variable: '--kit-z-overlay', default: '1000', description: 'The z-index of the popover.' },
        { variable: '--kit-popover-background-color', default: '#ffffff', description: 'Background color of the popover.' },
        { variable: '--kit-popover-border-radius', default: '8px', description: 'Border radius of the popover.' },
        { variable: '--kit-popover-border-color', default: '#e0e0e0', description: 'Border color of the popover.' },
        { variable: '--kit-popover-shadow', default: '0 4px 12px rgba(0,0,0,0.15)', description: 'Box shadow of the popover.' },
        { variable: '--kit-popover-text-color', default: '#333333', description: 'Text color inside the popover.' }
    ];

    openPositionPopover(position: 'top' | 'bottom' | 'left' | 'right') {
        if (this.isPositionPopoverOpen && this.selectedPosition === position) {
            this.isPositionPopoverOpen = false;
        } else {
            this.selectedPosition = position;
            this.isPositionPopoverOpen = true;
        }
    }
}
