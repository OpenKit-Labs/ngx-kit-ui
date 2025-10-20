import { Component, Input, OnInit, OnChanges, SimpleChanges, effect } from '@angular/core';
import { KitSideMenuService } from './side-menu.service';

type SideMenuMode = 'overlay' | 'side';

@Component({
  selector: 'kit-side-menu',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class KitSideMenuComponent implements OnInit, OnChanges {

  isOpen = false;
  mode: SideMenuMode = 'overlay';
  width = '280px';

  @Input() initialIsOpen?: boolean;
  @Input() initialMode?: SideMenuMode;
  @Input() initialWidth?: string;

  constructor(private sideMenuService: KitSideMenuService) {
    // Keep local state in sync with service signals using an effect (no RxJS subscriptions)
    effect(() => {
      this.isOpen = this.sideMenuService.isOpen();
      this.mode = this.sideMenuService.mode();
      this.width = this.sideMenuService.width();
    });
  }

  ngOnInit(): void {

    // If the initial inputs are provided, set the service signals directly.
    if (this.initialIsOpen !== undefined) {
      if (this.initialIsOpen) {
        this.sideMenuService.open();
      } else {
        this.sideMenuService.close();
      }
    } else {
      // default: open the menu
      this.sideMenuService.open();
      this.initialIsOpen = true;
    }

    if (this.initialMode !== undefined) {
      this.sideMenuService.setMode(this.initialMode);
    }

    if (this.initialWidth !== undefined) {
      this.sideMenuService.setWidth(this.initialWidth);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialIsOpen'] && this.initialIsOpen !== undefined) {
      if (changes['initialIsOpen'].currentValue) {
        this.sideMenuService.open();
        this.initialIsOpen = true;
      } else {
        this.sideMenuService.close();
        this.initialIsOpen = false;
      }
    }
    if (changes['initialMode'] && this.initialMode !== undefined) {
      this.sideMenuService.setMode(this.initialMode);
    }
    if (changes['initialWidth'] && this.initialWidth !== undefined) {
      this.sideMenuService.setWidth(this.initialWidth);
    }
  }

  close(): void {
    this.sideMenuService.close();
  }
}