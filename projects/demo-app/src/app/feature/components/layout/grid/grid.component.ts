import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitGridComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-grid [cols]="3" [rows]="2" [colGap]="16" [rowGap]="16">
  <!-- Your content here -->
</kit-grid>`;

  // Example 1: Fixed Grid
  example1Code = `<kit-grid [cols]="3" [colGap]="16" [rowGap]="16">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
  <div class="grid-item">Item 4</div>
  <div class="grid-item">Item 5</div>
  <div class="grid-item">Item 6</div>
</kit-grid>`;

  // Example 2: Responsive Grid with Column Width
  example2Code = `<kit-grid [minColWidth]="'200px'" [maxColWidth]="'1fr'" [colGap]="16" [rowGap]="16">
  <div class="grid-item">Responsive Item 1</div>
  <div class="grid-item">Responsive Item 2</div>
  <div class="grid-item">Responsive Item 3</div>
  <div class="grid-item">Responsive Item 4</div>
</kit-grid>`;

  // Example 3: Grid with Alignment
  example3Code = `<kit-grid [cols]="2" [rows]="2" [colGap]="16" [rowGap]="16" 
          [justifyItems]="'center'" [alignItems]="'center'">
  <div class="grid-item">Centered 1</div>
  <div class="grid-item">Centered 2</div>
  <div class="grid-item">Centered 3</div>
  <div class="grid-item">Centered 4</div>
</kit-grid>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'cols', type: "number | string", default: "'none'", description: 'Defines the number of columns in the grid. Can be a number or a string for custom templates.' },
    { input: 'rows', type: "number | string", default: "'none'", description: 'Defines the number of rows in the grid. Can be a number or a string for custom templates.' },
    { input: 'minCols', type: 'number', default: "undefined", description: 'Sets the minimum number of columns for responsive auto-fitting grids.' },
    { input: 'maxCols', type: 'number', default: "undefined", description: 'Sets the maximum number of columns for responsive auto-fitting grids.' },
    { input: 'minColWidth', type: 'string', default: "undefined", description: 'Sets the minimum width for columns, enabling responsive auto-fitting.' },
    { input: 'maxColWidth', type: 'string', default: "undefined", description: 'Sets the maximum width for columns (fallback: 1fr when minColWidth is set).' },
    { input: 'minRowHeight', type: 'string', default: "undefined", description: 'Sets the minimum height for rows, enabling responsive auto-fitting.' },
    { input: 'maxRowHeight', type: 'string', default: "undefined", description: 'Sets the maximum height for rows (fallback: 1fr when minRowHeight is set).' },
    { input: 'rowGap', type: 'SpacingValue', default: "undefined", description: 'The gap between rows in predefined spacing values (0, 4, 8, 16, 24, 32).' },
    { input: 'colGap', type: 'SpacingValue', default: "undefined", description: 'The gap between columns in predefined spacing values (0, 4, 8, 16, 24, 32).' },
    { input: 'justifyItems', type: "'start' | 'end' | 'center' | 'stretch'", default: "undefined", description: 'Aligns grid items along the inline (row) axis.' },
    { input: 'alignItems', type: "'start' | 'end' | 'center' | 'stretch'", default: "undefined", description: 'Aligns grid items along the block (column) axis.' },
    { input: 'justifyContent', type: "'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'", default: "undefined", description: 'Justifies the grid along the inline (row) axis.' },
    { input: 'alignContent', type: "'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'", default: "undefined", description: 'Aligns the grid along the block (column) axis.' },
  ];
}