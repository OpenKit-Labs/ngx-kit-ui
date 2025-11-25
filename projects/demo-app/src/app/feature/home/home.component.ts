import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule } from '../../../../../ngx-kit-ui/src/public-api';
import { NgIcon } from "@ng-icons/core";
import { TestComponent } from "../../core/components/test/test.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule, NgIcon, RouterModule, TestComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent { }
