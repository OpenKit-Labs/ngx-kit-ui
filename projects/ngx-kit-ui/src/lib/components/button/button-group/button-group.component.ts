import { Component, ContentChildren, QueryList, AfterContentInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { KitButtonGroupItemComponent } from './button-group-item/button-group-item.component';
import { ButtonColor } from '../button-options';
import { NgClass } from '@angular/common';

@Component({
  selector: 'kit-button-group',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class KitButtonGroupComponent implements AfterContentInit, OnDestroy {

  @ContentChildren(KitButtonGroupItemComponent) items!: QueryList<KitButtonGroupItemComponent>;

  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() selectionMode: 'single' | 'multiple' = 'single';
  @Input() color: ButtonColor = 'primary';

  private itemsSubscription: Subscription | null = null;

  ngAfterContentInit(): void {
    this.updateItemColors();
    this.items.forEach(item => {
      item.clicked.subscribe(() => this.onItemClicked(item));
    });

    this.itemsSubscription = this.items.changes.subscribe(() => {
      this.updateItemColors();
      this.items.forEach(item => {
        item.clicked.subscribe(() => this.onItemClicked(item));
      });
    });
  }

  ngOnDestroy(): void {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }

  onItemClicked(item: KitButtonGroupItemComponent): void {
    if (this.selectionMode === 'single') {
      this.items.forEach(i => i.active = false);
      item.active = true;
    } else {
      item.active = !item.active;
    }
  }

  private updateItemColors(): void {
    this.items.forEach(item => {
      item.color = this.color;
    });
  }
}
