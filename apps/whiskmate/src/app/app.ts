import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatNavList,
} from '@angular/material/list';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatToolbar,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatIcon,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
  ],
  selector: 'wm-root',
  template: `
    <mat-sidenav-container class="shell">
      <mat-sidenav #drawer mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/search" routerLinkActive="active">
            <mat-icon matListItemIcon>search</mat-icon>
            <span matListItemTitle>Search</span>
          </a>
          <a mat-list-item routerLink="/meal-plan" routerLinkActive="active">
            <mat-icon matListItemIcon>restaurant</mat-icon>
            <span matListItemTitle>Meal Plan</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar>
          <span>Whiskmate</span>
        </mat-toolbar>

        <main class="content">
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class App {
  private readonly drawer = viewChild.required<MatSidenav>('drawer');

  toggleDrawer(): void {
    this.drawer().toggle();
  }
}
