/**
 * Core type definitions and models for the Data Grid
 * 
 * Use: import { GridTypes } from 'ngx-kit-ui'
 * 
 * @example
 * config: GridTypes.KitDataGridConfig<User> = { ... }
 * event: GridTypes.KitDataGridRowClickEvent<User> = { ... }
 */

// Config
export * from './config/kit-data-grid-column-config.model';
export * from './config/kit-data-grid-row-config.model';
export * from './config/kit-data-grid-config.model';

// Data source models
export * from './data-source/kit-data-grid-query.model';
export * from './data-source/kit-data-grid-result.model';
export * from './data-source/kit-data-grid-data-source.model';

// Events
export * from './kit-data-grid-events.model';

// Renderer interfaces (for custom renderers)
export * from './renderers/kit-data-grid-cell-renderer.model';
export * from './renderers/kit-data-grid-header-renderer';
export * from './renderers/kit-data-grid-footer-renderer.model';
