import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { SpacingValue } from '../layout-options';

@Component({
  selector: 'kit-padding',
  standalone: true,
  imports: [],
  templateUrl: './padding.component.html',
  styleUrls: ['./padding.component.scss']
})
export class KitPaddingComponent implements OnInit {
  @Input() top: SpacingValue = 4;
  @Input() bottom: SpacingValue = 4;
  @Input() left: SpacingValue = 4;
  @Input() right: SpacingValue = 4;
  @Input() x?: SpacingValue;  // shorthand for left + right
  @Input() y?: SpacingValue;  // shorthand for top + bottom
  @Input() all?: SpacingValue; // shorthand for all sides

  // Will hold the generated CSS classes
  spacingClasses: string[] = [];

  @HostBinding('class')
  get hostClasses() {
    return this.spacingClasses.join(' ');
  }

  ngOnInit(): void {
    this.updateSpacingClasses();
  }

  private updateSpacingClasses(): void {
    this.spacingClasses = [];

    // Handle individual sides
    if (this.top !== undefined) {
      this.spacingClasses.push(`pt-${this.top}`);
    }
    if (this.bottom !== undefined) {
      this.spacingClasses.push(`pb-${this.bottom}`);
    }
    if (this.left !== undefined) {
      this.spacingClasses.push(`pl-${this.left}`);
    }
    if (this.right !== undefined) {
      this.spacingClasses.push(`pr-${this.right}`);
    }

    // Handle shorthands (these take precedence)
    if (this.y !== undefined) {
      this.spacingClasses = this.spacingClasses.filter(c => !c.startsWith('pt-') && !c.startsWith('pb-'));
      this.spacingClasses.push(`py-${this.y}`);
    }

    if (this.x !== undefined) {
      this.spacingClasses = this.spacingClasses.filter(c => !c.startsWith('pl-') && !c.startsWith('pr-'));
      this.spacingClasses.push(`px-${this.x}`);
    }

    if (this.all !== undefined) {
      this.spacingClasses.push(`p-${this.all}`);
    }
  }
}