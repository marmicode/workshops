import { Route } from '@angular/router';
import { RecipeSearch } from './recipe/feature-search/recipe-search.ng';
import { CartDetail } from './cart/cart-detail.ng';
import { NotFound } from './ui/not-found.ng';
import { recipeRouteHelper } from './recipe/recipe-route-helper';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: recipeRouteHelper.SEARCH,
  },
  {
    path: recipeRouteHelper.SEARCH,
    component: RecipeSearch,
  },
  {
    path: 'cart',
    component: CartDetail,
  },
  {
    path: '**',
    component: NotFound,
  },
];
