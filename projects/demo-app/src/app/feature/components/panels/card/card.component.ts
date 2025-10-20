import { Component } from '@angular/core';
import { KitPanelModule, KitLayoutModule, KitTextModule, KitButtonModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [KitLayoutModule, KitPanelModule, KitTextModule, KitButtonModule, SimpleTableComponent, CodeBlockComponent],
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    importModule = `import { KitPanelModule } from ' @openkit-labs/ngx-kit-ui';`;
    importComponent = `import { KitCardComponent } from ' @openkit-labs/ngx-kit-ui';`;
    usage = `<kit-card>...</kit-card>`;

    inputsDefinition = [
        { title: 'Input', lookupField: 'input' },
        { title: 'Type', lookupField: 'type' },
        { title: 'Default', lookupField: 'default' },
        { title: 'Description', lookupField: 'description' }
    ];

    inputsDataset = [
        { input: 'elevation', type: 'CardElevation', default: "'low'", description: 'The elevation level of the card (affects shadow depth).' },
        { input: 'clickable', type: 'boolean', default: 'false', description: 'Whether the card is clickable.' },
        { input: 'disabled', type: 'boolean', default: 'false', description: 'Whether the card is disabled (only applies to clickable cards).' },
        { input: 'fullWidth', type: 'boolean', default: 'false', description: 'Whether the card should take up the full width of its container.' },
        { input: 'fullHeight', type: 'boolean', default: 'false', description: 'Whether the card should take up the full height of its container.' }
    ];

    outputsDefinition = [
        { title: 'Output', lookupField: 'output' },
        { title: 'Type', lookupField: 'type' },
        { title: 'Description', lookupField: 'description' }
    ];

    outputsDataset = [
        { output: 'clicked', type: 'EventEmitter<MouseEvent>', description: 'Emitted when the card is clicked (only for clickable cards).' }
    ];

    stylingDefinition = [
        { title: 'Variable', lookupField: 'variable' },
        { title: 'Default', lookupField: 'default' },
        { title: 'Description', lookupField: 'description' }
    ];

    stylingDataset = [
        { variable: '--kit-card-background-color', default: '#ffffff', description: 'The background color of the card.' },
        { variable: '--kit-card-border-radius', default: '16px', description: 'The border radius of the card.' },
        { variable: '--kit-card-border-width', default: '1px', description: 'The border width of the card.' },
        { variable: '--kit-card-border-color', default: 'transparent', description: 'The border color of the card.' },
        { variable: '--kit-card-padding', default: '16px', description: 'The padding of the card content.' },
        { variable: '--kit-card-shadow-low', default: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)', description: 'The box shadow for low elevation.' },
        { variable: '--kit-card-shadow-medium', default: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)', description: 'The box shadow for medium elevation.' },
        { variable: '--kit-card-shadow-high', default: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)', description: 'The box shadow for high elevation.' },
        { variable: '--kit-card-hover-transform', default: 'translateY(-2px)', description: 'The transform applied on hover for clickable cards.' },
        { variable: '--kit-card-hover-shadow', default: '0 4px 8px rgba(0, 0, 0, 0.16), 0 4px 8px rgba(0, 0, 0, 0.23)', description: 'The box shadow on hover for clickable cards.' },
        { variable: '--kit-card-active-transform', default: 'translateY(0)', description: 'The transform applied on active for clickable cards.' },
        { variable: '--kit-card-active-shadow', default: '0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24)', description: 'The box shadow on active for clickable cards.' },
        { variable: '--kit-card-focus-shadow', default: '0 0 0 3px rgba(var(--kit-color-primary-rgb, 0, 102, 204), 0.2)', description: 'The box shadow on focus for clickable cards.' },
        { variable: '--kit-card-disabled-opacity', default: '0.6', description: 'The opacity of disabled cards.' }
    ];

    onCardClick(cardType: string): void {
        console.log(`${cardType} card clicked!`);
        alert(`${cardType} card was clicked!`);
    }
}
