import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Cart } from './cart/cart';
import { recipeRouteHelper } from './recipe/recipe-route-helper';
import { Layout } from './ui/layout.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, Layout, RouterLink],
  template: `
    <app-layout>
      <p slot="header">
        You have {{ cart.recipes().length }} recipes in your cart.
      </p>

      <router-outlet slot="body" />

      <ng-container slot="footer">
        <ul>
          <li>
            <a [routerLink]="recipeRouteHelper.search()">Search</a>
          </li>
          <li>
            <!-- TODO: use cartRouteHelper.cart() -->
            <a routerLink="/cart">Cart</a>
          </li>
        </ul>
      </ng-container
      >
    </app-layout>
  `,
})
export class App {
  protected cart = inject(Cart);
  protected recipeRouteHelper = recipeRouteHelper;
}
