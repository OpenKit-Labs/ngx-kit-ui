
import { AfterViewInit, Component, Input } from '@angular/core';
import { KitButtonModule, KitLayoutModule, KitTextModule } from '../../../../../ngx-kit-ui/src/public-api';
import Prism from 'prismjs';
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [KitButtonModule, KitLayoutModule, KitTextModule, NgIcon],
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements AfterViewInit {
  @Input() language = 'javascript';
  @Input() code = '';

  ngAfterViewInit(): void {
    Prism.highlightAll();
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.code);
  }
}
