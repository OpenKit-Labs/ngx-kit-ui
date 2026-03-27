import { KitGridDefaultCellRendererComponent } from './cell/default/kit-grid-default-cell-renderer.component';
import { KitGridTimeAgoCellRendererComponent } from './cell/time-ago/kit-grid-time-ago-cell-renderer.component';
import { KitGridDefaultHeaderRendererComponent } from './header/default/kit-grid-default-header-renderer.component';
import { KitGridControlHeaderRendererComponent, KitGridControlHeaderRendererConfig } from './header/control/kit-grid-control-header-renderer.component';
import { KitGridDefaultFooterRendererComponent, KitGridDefaultFooterRendererConfig } from './footer/default/kit-grid-default-footer-renderer.component';
import {
    kitCellRenderer,
    kitHeaderRenderer,
    kitFooterRenderer,
    KitGridCellRendererDescriptor,
    KitGridHeaderRendererDescriptor,
    KitGridFooterRendererDescriptor,
} from './kit-grid-renderer-descriptor';

export const KitGridBuiltinCellRenderers = {
    Default: (): KitGridCellRendererDescriptor =>
        kitCellRenderer(KitGridDefaultCellRendererComponent),
    TimeAgo: (): KitGridCellRendererDescriptor =>
        kitCellRenderer(KitGridTimeAgoCellRendererComponent),
} as const;

export const KitGridBuiltinHeaderRenderers = {
    Default: (): KitGridHeaderRendererDescriptor =>
        kitHeaderRenderer(KitGridDefaultHeaderRendererComponent),
    Control: (config?: KitGridControlHeaderRendererConfig): KitGridHeaderRendererDescriptor =>
        kitHeaderRenderer(KitGridControlHeaderRendererComponent, config),
} as const;

export const KitGridBuiltinFooterRenderers = {
    Default: (config?: KitGridDefaultFooterRendererConfig): KitGridFooterRendererDescriptor =>
        kitFooterRenderer(KitGridDefaultFooterRendererComponent, config),
} as const;
