/**
 * All renderer factories (builtin & custom) for the Data Grid
 * 
 * Use: import { GridRenderers } from 'ngx-kit-ui'
 * 
 * @example
 * headerRenderer: GridRenderers.KitDataGridBuiltinHeaderRenderers.Control({ sortable: true })
 * cellRenderer: GridRenderers.KitDataGridBuiltinCellRenderers.TimeAgo()
 * cellRenderer: GridRenderers.KitDataGridCustomRenderers.cell(MyCell, { color: 'primary' })
 */

export * from './kit-data-grid-builtin-renderers.model';
