import { Component } from '@angular/core';
import { KitPanelModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
    selector: 'app-badge',
    standalone: true,
    imports: [KitLayoutModule, KitPanelModule, KitTextModule, SimpleTableComponent, CodeBlockComponent],
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
    importModule = `import { KitPanelModule } from ' @openkit-labs/ngx-kit-ui';`;
    importComponent = `import { KitBadgeComponent } from ' @openkit-labs/ngx-kit-ui';`;
    usage = `<kit-badge>...</kit-badge>`;

    inputsDefinition = [
        { title: 'Input', lookupField: 'input' },
        { title: 'Type', lookupField: 'type' },
        { title: 'Default', lookupField: 'default' },
        { title: 'Description', lookupField: 'description' }
    ];

    inputsDataset = [
        { input: 'color', type: 'ButtonColor', default: "'primary'", description: 'The color of the badge.' },
        { input: 'active', type: 'boolean', default: 'true', description: 'Whether the badge is active; set to false to use the subtle/inactive appearance.' },
        { input: 'fullWidth', type: 'boolean', default: 'false', description: 'Whether the badge should take up the full width of its container.' },
    ];

    stylingDefinition = [
        { title: 'Variable', lookupField: 'variable' },
        { title: 'Default', lookupField: 'default' },
        { title: 'Description', lookupField: 'description' }
    ];

    stylingDataset = [
        { variable: '--kit-badge-border-radius', default: '12px', description: 'Border radius for badge shape.' },
        { variable: '--kit-badge-font-weight', default: '700', description: 'Font weight for badge text.' },
        { variable: '--kit-badge-padding', default: '6px 12px', description: 'Padding inside the badge.' },
        { variable: '--kit-badge-font-size', default: '12px', description: 'Font size for badge text.' },
    ];
}
