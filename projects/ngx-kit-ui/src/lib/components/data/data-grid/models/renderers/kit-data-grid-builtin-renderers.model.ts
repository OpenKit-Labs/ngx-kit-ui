import { KitDataGridDefaultCellRendererComponent } from '../../renderers/cell/default/kit-data-grid-default-cell-renderer.component';
import { KitDataGridTimeAgoCellRendererComponent } from '../../renderers/cell/time-ago/kit-data-grid-time-ago-cell-renderer.component';
import { KitDataGridDefaultHeaderRendererComponent } from '../../renderers/header/default/kit-data-grid-default-header-renderer.component';
import { KitDataGridControlHeaderRendererComponent, KitDataGridControlHeaderRendererConfig } from '../../renderers/header/control/kit-data-grid-control-header-renderer.component';
import { KitDataGridDefaultFooterRendererComponent, KitDataGridDefaultFooterRendererConfig } from '../../renderers/footer/default/kit-data-grid-default-footer-renderer.component';
import { KitDataGridCellRenderer, KitDataGridCellRendererDescriptor, kitCellRenderer } from './kit-data-grid-cell-renderer.model';
import { KitDataGridHeaderRenderer, KitDataGridHeaderRendererDescriptor, kitHeaderRenderer } from './kit-data-grid-header-renderer';
import { KitDataGridFooterConfig, KitDataGridFooterRenderer, kitFooterRenderer } from './kit-data-grid-footer-renderer.model';

export const KitDataGridBuiltinCellRenderers = {
    Default: (): KitDataGridCellRendererDescriptor =>
        kitCellRenderer(KitDataGridDefaultCellRendererComponent),
    TimeAgo: (): KitDataGridCellRendererDescriptor =>
        kitCellRenderer(KitDataGridTimeAgoCellRendererComponent),
} as const;

export const KitDataGridBuiltinHeaderRenderers = {
    Default: (): KitDataGridHeaderRendererDescriptor =>
        kitHeaderRenderer(KitDataGridDefaultHeaderRendererComponent),
    Control: (config?: KitDataGridControlHeaderRendererConfig): KitDataGridHeaderRendererDescriptor =>
        kitHeaderRenderer(KitDataGridControlHeaderRendererComponent, config),
} as const;

export const KitDataGridBuiltinFooterRenderers = {
    Default: (config?: KitDataGridDefaultFooterRendererConfig): KitDataGridFooterConfig =>
        ({ renderer: KitDataGridDefaultFooterRendererComponent, config, isVisible: true }),
} as const;

/**
 * Factory helpers for wrapping your own components as grid renderers.
 *
 * @example
 * cellRenderer:   KitDataGridCustomRenderers.cell(MyStatusCell)
 * cellRenderer:   KitDataGridCustomRenderers.cell(MyStatusCell, { color: 'primary' })
 * headerRenderer: KitDataGridCustomRenderers.header(MyHeaderCell)
 * footer:         KitDataGridCustomRenderers.footer(MyFooterCell, { showPageInfo: true })
 */
export const KitDataGridCustomRenderers = {
    cell<C>(
        component: { new(...args: any[]): KitDataGridCellRenderer<any, C> },
        config?: C
    ): KitDataGridCellRendererDescriptor {
        return kitCellRenderer(component, config);
    },
    header<C>(
        component: { new(...args: any[]): KitDataGridHeaderRenderer<C> },
        config?: C
    ): KitDataGridHeaderRendererDescriptor {
        return kitHeaderRenderer(component, config);
    },
    footer<C>(
        component: { new(...args: any[]): KitDataGridFooterRenderer<C> },
        config?: C
    ): KitDataGridFooterConfig {
        return kitFooterRenderer(component, config);
    },
} as const;
