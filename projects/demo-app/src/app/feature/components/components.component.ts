import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule, KitInputModule } from '../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [RouterModule, KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule, KitInputModule],
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent {

  componentGroups: Array<{ name: string, path: string, description: string, components: Array<{ name: string, path: string, description: string, enabled: boolean }> }> = [
    {
      name: 'Buttons',
      path: 'buttons',
      description: 'Button styles and variants',
      components: [
        {
          name: 'Regular Buttons',
          path: 'regular-buttons',
          description: 'Standard buttons',
          enabled: true
        },
        {
          name: 'Text Buttons',
          path: 'text-buttons',
          description: 'Text-only buttons',
          enabled: true
        },
        {
          name: 'Round Buttons',
          path: 'round-buttons',
          description: 'Circular icon buttons',
          enabled: true
        },
        {
          name: 'Floating Action Buttons',
          path: 'floating-action-buttons',
          description: 'Floating action buttons',
          enabled: true
        },
        {
          name: 'Button Groups',
          path: 'button-group',
          description: 'Grouped action buttons',
          enabled: true
        }
      ]
    },
    {
      name: 'Inputs',
      path: 'inputs',
      description: 'Form inputs and controls',
      components: [
        {
          name: 'Text',
          path: 'text',
          description: 'Single-line text input',
          enabled: true
        },
        {
          name: 'Text Area',
          path: 'text-area',
          description: 'Multi-line input',
          enabled: true
        },
        {
          name: 'Number',
          path: 'number',
          description: 'Numeric input',
          enabled: true
        },
        {
          name: 'Email',
          path: 'email',
          description: 'Email input',
          enabled: true
        },
        {
          name: 'Password',
          path: 'password',
          description: 'Password input with toggle',
          enabled: true
        },
        {
          name: 'Phone',
          path: 'phone',
          description: 'Phone input with country code',
          enabled: true
        },
        {
          name: 'Single Select',
          path: 'single-select',
          description: 'Dropdown for single selection',
          enabled: true
        },
        {
          name: 'OTP',
          path: 'otp',
          description: 'One-time code input',
          enabled: true
        },
        {
          name: 'Time',
          path: 'time',
          description: 'Time input',
          enabled: true
        },
        {
          name: 'Date',
          path: 'date',
          description: 'Date input',
          enabled: true
        }
      ]
    },
    {
      name: 'Interactors',
      path: 'interactors',
      description: 'Interaction and gesture helpers',
      components: [
        {
          name: 'Gesture Detector',
          path: 'gesture-detector',
          description: 'Detects user gestures',
          enabled: true
        }
      ]
    },
    {
      name: 'Navigation',
      path: 'navigation',
      description: 'Navigation components',
      components: [
        {
          name: 'Router Outlet',
          path: 'router-outlet',
          description: 'Displays routed views',
          enabled: false
        },
        {
          name: 'Tab View',
          path: 'tab-view',
          description: 'Tabbed content',
          enabled: true
        }
      ]
    },
    {
      name: 'Layout',
      path: 'layout',
      description: 'Layout and structure components',
      components: [
        {
          name: 'App Root',
          path: 'app-root',
          description: 'App root container',
          enabled: true
        },
        {
          name: 'Center',
          path: 'center',
          description: 'Center alignment',
          enabled: true
        },
        {
          name: 'Row',
          path: 'row',
          description: 'Row layout',
          enabled: true
        },
        {
          name: 'Column',
          path: 'column',
          description: 'Column layout',
          enabled: true
        },
        {
          name: 'Grid',
          path: 'grid',
          description: 'Grid layout',
          enabled: true
        },
        {
          name: 'Constrained Box',
          path: 'constrained-box',
          description: 'Constrained box',
          enabled: true
        },
        {
          name: 'Expanded',
          path: 'expanded',
          description: 'Expanded container',
          enabled: true
        },
        {
          name: 'Padding',
          path: 'padding',
          description: 'Padding container',
          enabled: true
        },
        {
          name: 'Page',
          path: 'page',
          description: 'Page container',
          enabled: true
        },
        {
          name: 'Sized Box',
          path: 'sized-box',
          description: 'Sized box',
          enabled: true
        },
        {
          name: 'Spacer',
          path: 'spacer',
          description: 'Flexible spacer',
          enabled: true
        },
        {
          name: 'Divider',
          path: 'divider',
          description: 'Thin separator line',
          enabled: true
        },
        {
          name: 'Sticky Container',
          path: 'sticky-container',
          description: 'Sticky positioned container',
          enabled: true
        },
        {
          name: 'Stack',
          path: 'stack',
          description: 'Vertical stacking container',
          enabled: true
        },
        {
          name: 'Container',
          path: 'container',
          description: 'Flexible container',
          enabled: true
        },
        {
          name: 'Top Bar',
          path: 'top-bar',
          description: 'Top bar',
          enabled: true
        },
        {
          name: 'Bottom Bar',
          path: 'bottom-bar',
          description: 'Bottom bar',
          enabled: true
        },
        {
          name: 'Side Menu',
          path: 'side-menu',
          description: 'Collapsible side menu',
          enabled: true
        },
        {
          name: 'Carousel',
          path: 'carousel',
          description: 'Content carousel',
          enabled: true
        }
      ]
    },
    {
      name: 'Media',
      path: 'media',
      description: 'Media display components',
      components: [
        {
          name: 'Image',
          path: 'image',
          description: 'Displays images',
          enabled: true
        },
        {
          name: 'Avatar',
          path: 'avatar',
          description: 'Displays avatars',
          enabled: true
        }
      ]
    },
    {
      name: 'Overlays',
      path: 'overlays',
      description: 'Modals and overlays',
      components: [
        {
          name: 'Dialog',
          path: 'dialog',
          description: 'Modal dialog',
          enabled: true
        },
        {
          name: 'Bottom Sheet',
          path: 'bottom-sheet',
          description: 'Slide-up panel',
          enabled: true
        },
      ]
    },
    {
      name: 'Panels',
      path: 'panels',
      description: 'Panel containers',
      components: [
        {
          name: 'Card',
          path: 'card',
          description: 'Card container',
          enabled: true
        },
        {
          name: 'Badge',
          path: 'badge',
          description: 'Status badge',
          enabled: true
        }
      ]
    },
    {
      name: 'Data Display',
      path: 'data-display',
      description: 'Data display components',
      components: [
        {
          name: 'Simple Table',
          path: 'simple-table',
          description: 'Tabular data view',
          enabled: true
        },
        {
          name: 'Progress Bar',
          path: 'progress-bar',
          description: 'Progress indicator',
          enabled: true
        }
      ]
    },
    {
      name: 'Typography',
      path: 'typography',
      description: 'Text and typographic elements',
      components: [
        {
          name: 'Text',
          path: 'text',
          description: 'Styled text elements',
          enabled: true
        },
      ]
    }
  ];
}