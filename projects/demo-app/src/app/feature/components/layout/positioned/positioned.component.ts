import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
    selector: 'app-positioned',
    standalone: true,
    imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
    templateUrl: './positioned.component.html',
    styleUrls: ['./positioned.component.scss']
})
export class PositionedComponent {
    importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
    importComponent = `import { KitPositionedComponent } from ' @openkit-labs/ngx-kit-ui';`;
    usage = `<kit-positioned [position]="'top-left'">
    <!-- Your content here -->
</kit-positioned>`;

    exampleCode = `
    <kit-container>
        <kit-positioned position="top-left">
            <div class="marker">
                <kit-text-body>Top Left</kit-text-body>
            </div>
        </kit-positioned>
        <kit-positioned position="top-center">
            <div class="marker">
                <kit-text-body>Top Center</kit-text-body>
            </div>
        </kit-positioned>
        <kit-positioned position="center">
            <div class="marker">
                <kit-text-body>Center</kit-text-body>
            </div>
        </kit-positioned>
        <kit-positioned position="bottom-right">
            <div class="marker">
                <kit-text-body>Bottom Right</kit-text-body>
            </div>
        </kit-positioned>
        <kit-positioned top="10%"
                        right="10%">
            <div class="marker">
                <kit-text-body>Custom</kit-text-body>
            </div>
        </kit-positioned>
    </kit-container>`;

    inputsDefinition = [
        { title: 'Input', lookupField: 'input' },
        { title: 'Type', lookupField: 'type' },
        { title: 'Default', lookupField: 'default' },
        { title: 'Description', lookupField: 'description' }
    ];

    inputsDataset = [
        { input: 'position', type: "'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'", default: "undefined", description: 'Preset position to place the element.' },
        { input: 'top', type: 'string', default: "undefined", description: 'Custom top value (e.g. "10px").' },
        { input: 'right', type: 'string', default: "undefined", description: 'Custom right value (e.g. "10px").' },
        { input: 'bottom', type: 'string', default: "undefined", description: 'Custom bottom value (e.g. "10px").' },
        { input: 'left', type: 'string', default: "undefined", description: 'Custom left value (e.g. "10px").' },
        { input: 'width', type: 'string', default: "undefined", description: 'Optional width for the positioned element.' },
        { input: 'height', type: 'string', default: "undefined", description: 'Optional height for the positioned element.' }
    ];
}
