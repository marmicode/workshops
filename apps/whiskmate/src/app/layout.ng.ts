import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from './cart';
import { recipeRouteHelper } from './recipe-route-helper';

@Component({
  selector: 'app-layout',
  imports: [RouterLink],
  template: `
    <h1>Welcome to Whiskmate!</h1>
    <p>You have {{ cart.recipes().length }} recipes in your cart.</p>
    <ng-content />
    <footer>
      <ul>
        <li>
          <a [routerLink]="recipeRouteHelper.search()">Search</a>
        </li>
        <li>
          <!-- TODO: use cartRouteHelper.cart() -->
          <a routerLink="/cart">Cart</a>
        </li>
      </ul>
    </footer>
  `,
})
export class Layout {
  protected cart = inject(Cart);
  protected recipeRouteHelper = recipeRouteHelper;
}
