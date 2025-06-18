import { computed, DestroyRef, inject, signal, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from './take-until-destroy';

export function marmicodeResource<T>(
  stream: () => Observable<T>,
): MarmicodeResourceRef<T> {
  const destroyRef = inject(DestroyRef);
  const sig = signal<{
    value?: T;
    error?: Error;
    isLoading: boolean;
  }>({
    value: undefined,
    error: undefined,
    isLoading: false,
  });

  load();

  return {
    hasValue: computed(() => sig().value !== undefined),
    value: computed(() => sig().value),
    error: computed(() => sig().error),
    isLoading: computed(() => sig().isLoading),
    reload: load,
  };

  function load() {
    if (sig().isLoading) {
      throw new Error('Already loading, cannot reload.');
    }
    const source$ = stream();
    sig.set({ isLoading: true });
    source$.pipe(takeUntilDestroyed(destroyRef)).subscribe({
      next: (value) => sig.set({ isLoading: false, value }),
      error: (error) => sig.set({ isLoading: false, error }),
    });
  }
}

export interface MarmicodeResourceRef<T> {
  hasValue: Signal<boolean>;
  value: Signal<T | undefined>;
  error: Signal<Error | undefined>;
  isLoading: Signal<boolean>;
  reload: () => void;
}
