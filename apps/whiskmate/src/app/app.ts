import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
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
import { recipeSearchRoute } from './recipe/recipe.paths';
import { FeatureToggles } from './feature-toggles';

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
          <a mat-list-item href="#">
            <mat-icon matListItemIcon>home</mat-icon>
            <span matListItemTitle>Home</span>
          </a>
          @if (featureToggles.canSearchRecipes()) {
            <a
              mat-list-item
              [routerLink]="recipeSearchRoute"
              routerLinkActive="active"
            >
              <mat-icon matListItemIcon>restaurant</mat-icon>
              <span matListItemTitle>Recipes</span>
            </a>
          }
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
  protected readonly recipeSearchRoute = recipeSearchRoute;

  private readonly drawer = viewChild.required<MatSidenav>('drawer');
  protected readonly featureToggles = inject(FeatureToggles);

  toggleDrawer(): void {
    this.drawer().toggle();
  }
}
