import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ContentChild, TemplateRef } from '@angular/core';
import { ButtonColor } from '../../button-options';
import { KitButtonGroupItemActiveDirective } from './kit-button-group-item-active.directive';
import { KitButtonGroupItemIdleDirective } from './kit-button-group-item-idle.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'kit-button-group-item',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './button-group-item.component.html',
  styleUrls: ['./button-group-item.component.scss']
})
export class KitButtonGroupItemComponent {

  @Input() active: boolean = false;
  @Input() color: ButtonColor = 'primary';
  @Output() clicked = new EventEmitter<void>();

  // Apply classes on the host element so SCSS selectors match
  @HostBinding('class')
  get hostClasses(): string {
    const base = `kit-button-group-item kit-button-group-item--${this.color}`;
    return this.active ? `${base} active` : base;
  }

  // Template slots
  @ContentChild(KitButtonGroupItemActiveDirective, { read: TemplateRef }) activeTemplate?: TemplateRef<any>;
  @ContentChild(KitButtonGroupItemIdleDirective, { read: TemplateRef }) idleTemplate?: TemplateRef<any>;

  // Forward clicks from the host
  @HostListener('click')
  onClick(): void {
    this.clicked.emit();
  }
}
