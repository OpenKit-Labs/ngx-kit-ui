import { Component, ContentChildren, Input, QueryList, AfterContentInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KitTabContentComponent } from '../tab-content/tab-content.component';


interface TabItem {
    index: number;
    title: string;
    active?: boolean;
}

@Component({
    selector: 'kit-tab-view',
    templateUrl: './tab-view.component.html',
    styleUrls: ['./tab-view.component.scss'],
    standalone: true,
    imports: []
})
export class KitTabViewComponent implements AfterContentInit, AfterViewInit, OnDestroy {

    @ContentChildren(KitTabContentComponent) tabContents!: QueryList<KitTabContentComponent>;
    @ViewChild('tabHeader') tabHeaderElement!: ElementRef;

    @Input() tabs: TabItem[] = [];

    activeTabIndex: number = 0;
    generatedTabs: TabItem[] = [];

    private tabsChangesSubscription: Subscription | null = null;

    ngAfterContentInit() {
        // Generate tabs from child tab-content components
        this.generateTabsFromContent();

        // Listen for changes in the tab-content children
        this.tabsChangesSubscription = this.tabContents.changes.subscribe(() => {
            this.generateTabsFromContent();
        });

        // If tabs were provided as input, use them instead
        if (this.tabs && this.tabs.length > 0) {
            this.useProvidedTabs();
        }
    }

    ngAfterViewInit() {
        // Once the view is initialized, make sure the active tab is scrolled into view
        setTimeout(() => {
            this.scrollActiveTabIntoView();
        });
    }

    ngOnDestroy() {
        if (this.tabsChangesSubscription) {
            this.tabsChangesSubscription.unsubscribe();
        }
    }

    selectTab(tabIndex: number) {
        // Update active state in tabs array
        const tabsToUse = this.tabs.length > 0 ? this.tabs : this.generatedTabs;

        tabsToUse.forEach(tab => {
            tab.active = tab.index === tabIndex;
        });

        this.activeTabIndex = tabIndex;
        this.updateTabContentState();

        // Scroll the selected tab into view
        this.scrollActiveTabIntoView();
    }

    // Scroll active tab into view (important for mobile)
    private scrollActiveTabIntoView() {
        setTimeout(() => {
            const headerElement = document.querySelector('.kit-tab-header');
            if (!headerElement) return;

            const activeTabElement = headerElement.querySelector('.kit-tab-item--active') as HTMLElement;
            if (!activeTabElement) return;

            // Calculate position to center the tab in view
            const scrollLeft = activeTabElement.offsetLeft - (headerElement.clientWidth / 2) + (activeTabElement.offsetWidth / 2);
            headerElement.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
        });
    }

    private generateTabsFromContent() {
        if (this.tabContents && this.tabContents.length > 0) {
            this.generatedTabs = this.tabContents.map((tabContent, index) => {
                const title = tabContent.title || `Tab ${index + 1}`;
                return {
                    index: index,
                    title: title,
                    active: index === 0 && this.activeTabIndex === 0
                };
            });

            // Set first tab as active if none is active yet
            if (this.generatedTabs.length > 0) {
                this.activeTabIndex = 0;
                this.generatedTabs[0].active = true;
            }

            this.updateTabContentState();
        }
    }

    private useProvidedTabs() {
        // Set the first tab as active if none is active
        if (this.tabs.length && !this.tabs.some(tab => tab.active)) {
            this.tabs[0].active = true;
            this.activeTabIndex = this.tabs[0].index;
        } else {
            const activeTab = this.tabs.find(tab => tab.active);
            if (activeTab) {
                this.activeTabIndex = activeTab.index;
            }
        }

        this.updateTabContentState();
    }

    private updateTabContentState() {
        if (this.tabContents) {
            this.tabContents.forEach((tabContent, index) => {
                tabContent.active = index === this.activeTabIndex;
            });
        }
    }
}
