import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FeatureToggles {
  private _toggles = new Map<string, boolean>();

  constructor() {
    this._toggles.set(
      'recipe-search',
      localStorage.getItem('recipe-search') === 'true',
    );
  }

  canSearchRecipes(): boolean {
    return this._toggles.get('recipe-search') ?? false;
}
}
