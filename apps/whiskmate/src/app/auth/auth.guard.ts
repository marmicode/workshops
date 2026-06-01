import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from './auth-state';
import { authPaths } from './auth.paths';
import { recipePaths } from '../recipe/recipe.paths';

export const onboardedGuard: CanActivateFn = () => {
  const auth = inject(AuthState);
  const router = inject(Router);
  if (auth.isOnboarded()) {
    return true;
  }
  if (auth.isOtpVerified()) {
    return router.createUrlTree(authPaths.welcomeRoute());
  }
  if (auth.isOtpPending()) {
    return router.createUrlTree(authPaths.otpRoute());
  }
  return router.createUrlTree(authPaths.loginRoute());
};

export const loginGuard: CanActivateFn = () => {
  const auth = inject(AuthState);
  const router = inject(Router);
  if (auth.isOnboarded()) {
    return router.createUrlTree(['/', recipePaths.RECIPE_SEARCH_PATH]);
  }
  if (auth.isOtpVerified()) {
    return router.createUrlTree(authPaths.welcomeRoute());
  }
  if (auth.isOtpPending()) {
    return router.createUrlTree(authPaths.otpRoute());
  }
  return true;
};

export const otpGuard: CanActivateFn = () => {
  const auth = inject(AuthState);
  const router = inject(Router);
  if (auth.isOnboarded()) {
    return router.createUrlTree(['/', recipePaths.RECIPE_SEARCH_PATH]);
  }
  if (auth.isOtpVerified()) {
    return router.createUrlTree(authPaths.welcomeRoute());
  }
  if (!auth.isOtpPending()) {
    return router.createUrlTree(authPaths.loginRoute());
  }
  return true;
};

export const welcomeGuard: CanActivateFn = () => {
  const auth = inject(AuthState);
  const router = inject(Router);
  if (auth.isOnboarded()) {
    return router.createUrlTree(['/', recipePaths.RECIPE_SEARCH_PATH]);
  }
  if (!auth.isOtpVerified()) {
    return auth.isOtpPending()
      ? router.createUrlTree(authPaths.otpRoute())
      : router.createUrlTree(authPaths.loginRoute());
  }
  return true;
};
