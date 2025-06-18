/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { assertInInjectionContext, DestroyRef, inject } from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Backport of `takeUntilDestroyed` from Angular 19.
 *
 * {@link https://github.com/angular/angular/blob/main/packages/core/rxjs-interop/src/take_until_destroyed.ts}
 */
export function takeUntilDestroyed<T>(
  destroyRef?: DestroyRef,
): MonoTypeOperatorFunction<T> {
  if (!destroyRef) {
    if (ngDevMode) {
      assertInInjectionContext(takeUntilDestroyed);
    }
    destroyRef = inject(DestroyRef);
  }

  const destroyed$ = new Observable<void>((subscriber) => {
    const unregisterFn = destroyRef.onDestroy(subscriber.next.bind(subscriber));
    return unregisterFn;
  });

  return <T>(source: Observable<T>) => {
    return source.pipe(takeUntil(destroyed$));
  };
}
