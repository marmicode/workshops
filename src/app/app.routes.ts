import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'search',
    loadComponent: () => import('./recipe-search.ng'),
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart-detail.ng'),
  },
  {
    path: '**',
    redirectTo: 'search',
  },
];
