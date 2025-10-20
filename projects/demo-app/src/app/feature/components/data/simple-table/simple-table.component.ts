import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

import { KitLayoutModule, KitTextModule, SimpleTableComponent, KitDataModule } from '../../../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-simple-table-demo',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
  standalone: true,
  imports: [
    KitLayoutModule,
    CodeBlockComponent,
    KitTextModule,
    KitDataModule,
    SimpleTableComponent,
  ],
})
export class SimpleTableDemoComponent {
  importModule = `import { KitDataModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { SimpleTableComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-simple-table [definition]="tableDefinition" [dataset]="tableData"></kit-simple-table>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'definition', type: 'TableColumn[]', default: "[]", description: 'The definition of the table columns.' },
    { input: 'dataset', type: 'any[]', default: "[]", description: 'The data to be displayed in the table.' },
  ];

  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'rowClick', type: 'EventEmitter<any>', description: 'Emitted when a row is clicked.' },
  ];

  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];

  stylingDataset = [
    { variable: '--kit-table-border-radius', default: '8px', description: 'Border radius of the table and container.' },
    { variable: '--kit-table-background-color', default: '#fff', description: 'Background color of the table.' },
    { variable: '--kit-table-shadow', default: '0 2px 8px rgba(0,0,0,0.04)', description: 'Box shadow for the table.' },
    { variable: '--kit-table-cell-padding', default: '0.75rem 1.25rem', description: 'Padding for table cells.' },
    { variable: '--kit-table-row-border-width', default: '1px', description: 'Border width between table rows.' },
    { variable: '--kit-table-row-border-color', default: '#eaeaea', description: 'Border color between table rows.' },
    { variable: '--kit-table-font-size', default: '1rem', description: 'Font size for table cells.' },
    { variable: '--kit-table-header-background-color', default: '#f7f7f9', description: 'Background color for table header cells.' },
    { variable: '--kit-table-header-font-weight', default: '600', description: 'Font weight for table header text.' },
    { variable: '--kit-table-header-text-color', default: '#333', description: 'Text color for table header cells.' },
    { variable: '--kit-table-header-border-width', default: '2px', description: 'Border width for table header bottom border.' },
    { variable: '--kit-table-header-letter-spacing', default: '0.02em', description: 'Letter spacing for table header text.' },
    { variable: '--kit-table-row-hover-background-color', default: '#f0f4fa', description: 'Background color when hovering over table rows.' },
    { variable: '--kit-table-cell-text-color', default: '#444', description: 'Text color for table cells.' },
    { variable: '--kit-table-header-row-border-radius', default: '8px 8px 0 0', description: 'Border radius for the header row of the table.' },
    { variable: '--kit-table-cell-padding-mobile', default: '0.5rem 0.5rem', description: 'Padding for table cells on mobile screens.' },
    { variable: '--kit-table-font-size-mobile', default: '0.95rem', description: 'Font size for table cells on mobile screens.' },
  ];


  tableDefinition = [
    { title: 'Name', lookupField: 'name' },
    { title: 'Age', lookupField: 'age' },
    { title: 'City', lookupField: 'city' },
    {
      title: 'Salary',
      lookupField: 'salary',
      formatter: (value: number) => `$${value.toLocaleString()}`,
    },
  ];

  tableData = [
    { name: 'John Doe', age: 30, city: 'New York', salary: 50000 },
    { name: 'Jane Doe', age: 25, city: 'London', salary: 60000 },
    { name: 'Peter Jones', age: 42, city: 'Paris', salary: 75000 },
  ];

  tableDefinitionCode = `tableDefinition = [
    { title: 'Name', lookupField: 'name' },
    { title: 'Age', lookupField: 'age' },
    { title: 'City', lookupField: 'city' },
    { title: 'Salary', lookupField: 'salary', formatter: (value: any) => {return '$' + value.toLocaleString()} },
  ];`;

  tableDataCode = `tableData = [
    { name: 'John Doe', age: 30, city: 'New York', salary: 50000 },
    { name: 'Jane Doe', age: 25, city: 'London', salary: 60000 },
    { name: 'Peter Jones', age: 42, city: 'Paris', salary: 75000 },
  ];`;
}
