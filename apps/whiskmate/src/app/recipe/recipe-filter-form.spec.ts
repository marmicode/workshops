import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it, vi } from 'vitest';
import { createDefaultRecipeFilterCriteria } from './recipe-filter-criteria';
import { RecipeFilterForm } from './recipe-filter-form.ng';
import type { RecipeFilterCriteria } from './recipe-filter-criteria';

describe(RecipeFilterForm.name, () => {
  it.todo('submits keywords', () => {
    const filterChange = vi.fn<(criteria: RecipeFilterCriteria) => void>();

    const fixture = TestBed.createComponent(RecipeFilterForm);
    fixture.componentInstance.filterChange.subscribe(filterChange);
    fixture.detectChanges();

    const keywordsInput = fixture.debugElement.query(By.css('[name="keywords"]'));
    keywordsInput.triggerEventHandler('input', {
      target: { value: 'salad' },
    });
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]'),
    );
    submitButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(filterChange).toHaveBeenCalledOnce();
    expect(filterChange).toHaveBeenCalledWith({
      ...createDefaultRecipeFilterCriteria(),
      keywords: 'salad',
    });
  });
});
