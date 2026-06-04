import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
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
    MatSlideToggle,
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
        <mat-toolbar class="toolbar">
          <span>Whiskmate</span>
          <mat-slide-toggle
            [checked]="featureToggles.canSearchRecipes()"
            (change)="featureToggles.setRecipeSearchEnabled($event.checked)"
            aria-label="Recipe search"
          >
            Experimental Mode
          </mat-slide-toggle>
        </mat-toolbar>

        <main class="content">
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
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
