import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  applyWhenValue,
  form,
  FormField,
  FormRoot,
  max,
  maxLength,
  min,
  minLength,
  required,
} from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthState } from './auth-state';
import { recipePaths } from '../recipe/recipe.paths';
import { createEmptyWelcomeProfile, WelcomeProfile } from './welcome-profile';

const COOKING_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'professional', label: 'Professional' },
] as const;

const DIETS = [
  { value: 'omnivore', label: 'Omnivore' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'gluten-free', label: 'Gluten-free' },
  { value: 'other', label: 'Other' },
] as const;

const SHOPPING_DAYS = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
] as const;

const REFERRAL_SOURCES = [
  { value: 'friend', label: 'Friend or family' },
  { value: 'social', label: 'Social media' },
  { value: 'search', label: 'Search engine' },
  { value: 'podcast', label: 'Podcast or video' },
  { value: 'workshop', label: 'Workshop or event' },
  { value: 'other', label: 'Other' },
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-welcome',
  imports: [
    FormField,
    FormRoot,
    MatButtonModule,
    MatCheckboxModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelectModule,
  ],
  template: `
    <section class="welcome">
      <header class="welcome-header">
        <h1>Welcome to Whiskmate</h1>
        <p>
          Tell us about your kitchen and goals so we can personalize your
          experience. Every question below is required.
        </p>
      </header>

      <form class="welcome-form" [formRoot]="welcomeForm">
        <fieldset>
          <legend>About you</legend>
          <div class="field-row">
            <mat-form-field>
              <mat-label>Full legal name</mat-label>
              <input [formField]="welcomeForm.fullName" matInput type="text" />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Name we should use in the app</mat-label>
              <input
                [formField]="welcomeForm.preferredName"
                matInput
                type="text"
              />
            </mat-form-field>
          </div>
          <div class="field-row">
            <mat-form-field>
              <mat-label>Country</mat-label>
              <input [formField]="welcomeForm.country" matInput type="text" />
            </mat-form-field>
            <mat-form-field>
              <mat-label>City</mat-label>
              <input [formField]="welcomeForm.city" matInput type="text" />
            </mat-form-field>
          </div>
          <mat-form-field class="field-narrow">
            <mat-label>People in your household</mat-label>
            <input
              [formField]="welcomeForm.householdSize"
              matInput
              type="number"
            />
          </mat-form-field>
        </fieldset>

        <fieldset>
          <legend>Cooking habits</legend>
          <div class="field-row">
            <mat-form-field>
              <mat-label>Cooking experience</mat-label>
              <mat-select [formField]="welcomeForm.cookingExperience">
                <mat-option value="">Select a level</mat-option>
                @for (level of cookingLevels; track level.value) {
                  <mat-option [value]="level.value">{{
                    level.label
                  }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
            <mat-form-field>
              <mat-label>Primary diet</mat-label>
              <mat-select [formField]="welcomeForm.primaryDiet">
                <mat-option value="">Select a diet</mat-option>
                @for (diet of diets; track diet.value) {
                  <mat-option [value]="diet.value">{{ diet.label }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
          </div>
          <mat-form-field>
            <mat-label>Favorite cuisine</mat-label>
            <input
              [formField]="welcomeForm.favoriteCuisine"
              matInput
              type="text"
            />
          </mat-form-field>
          <div class="field-row">
            <mat-form-field>
              <mat-label>Meals you cook per week</mat-label>
              <input
                [formField]="welcomeForm.weeklyMealsCooked"
                matInput
                type="number"
              />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Preferred grocery day</mat-label>
              <mat-select [formField]="welcomeForm.shoppingDay">
                <mat-option value="">Select a day</mat-option>
                @for (day of shoppingDays; track day.value) {
                  <mat-option [value]="day.value">{{ day.label }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
          </div>
        </fieldset>

        <fieldset>
          <legend>How you found us</legend>
          <mat-form-field>
            <mat-label>Referral source</mat-label>
            <mat-select [formField]="welcomeForm.referralSource">
              <mat-option value="">Select one</mat-option>
              @for (source of referralSources; track source.value) {
                <mat-option [value]="source.value">{{
                  source.label
                }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field class="field-wide">
            <mat-label>What do you want Whiskmate to help you with?</mat-label>
            <textarea
              [formField]="welcomeForm.goals"
              matInput
              rows="4"
            ></textarea>
          </mat-form-field>
        </fieldset>

        <fieldset class="terms-fieldset">
          <mat-checkbox [formField]="welcomeForm.termsAccepted">
            I agree to the demo terms and privacy notice
          </mat-checkbox>
          @if (
            welcomeForm.termsAccepted().touched() &&
            welcomeForm.termsAccepted().invalid()
          ) {
            <p class="field-error" role="alert">
              You must accept the terms to continue.
            </p>
          }
        </fieldset>

        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="welcomeForm().invalid()"
        >
          Finish setup
        </button>
      </form>
    </section>
  `,
  styles: `
    :host {
      display: block;
      max-width: 52rem;
      margin: 0 auto;
      padding: 1.5rem 1rem 3rem;
    }

    .welcome-header h1 {
      margin: 0 0 0.5rem;
      font-size: 1.75rem;
    }

    .welcome-header p {
      margin: 0 0 2rem;
      color: var(--mat-sys-on-surface-variant, #5f6368);
      line-height: 1.5;
    }

    .welcome-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    fieldset {
      border: 1px solid var(--mat-sys-outline-variant, #e0e0e0);
      border-radius: 8px;
      margin: 0;
      padding: 1.25rem;
    }

    legend {
      font-weight: 600;
      padding: 0 0.25rem;
    }

    .field-row {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 640px) {
      .field-row {
        grid-template-columns: 1fr;
      }
    }

    .field-row mat-form-field,
    fieldset > mat-form-field {
      width: 100%;
    }

    .field-narrow {
      max-width: 14rem;
    }

    .field-wide {
      width: 100%;
    }

    .terms-fieldset {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .field-error {
      color: var(--mat-sys-error, #b3261e);
      font-size: 0.875rem;
      margin: 0;
    }

    .welcome-form button[type='submit'] {
      align-self: flex-start;
    }
  `,
})
export class Welcome {
  protected readonly cookingLevels = COOKING_LEVELS;
  protected readonly diets = DIETS;
  protected readonly shoppingDays = SHOPPING_DAYS;
  protected readonly referralSources = REFERRAL_SOURCES;

  private readonly _auth = inject(AuthState);
  private readonly _router = inject(Router);

  profile = signal<WelcomeProfile>(createEmptyWelcomeProfile());

  welcomeForm = form(
    this.profile,
    (path) => {
      required(path.fullName, { message: 'Full name is required' });
      minLength(path.fullName, 2, { message: 'Enter at least 2 characters' });
      required(path.preferredName, { message: 'Preferred name is required' });
      required(path.country, { message: 'Country is required' });
      required(path.city, { message: 'City is required' });
      required(path.householdSize, { message: 'Household size is required' });
      min(path.householdSize, 1, { message: 'At least one person' });
      max(path.householdSize, 20, {
        message: 'Enter a realistic household size',
      });
      required(path.cookingExperience, {
        message: 'Select your cooking experience',
      });
      required(path.primaryDiet, { message: 'Select your primary diet' });
      required(path.favoriteCuisine, {
        message: 'Favorite cuisine is required',
      });
      minLength(path.favoriteCuisine, 2, {
        message: 'Enter at least 2 characters',
      });
      required(path.weeklyMealsCooked, {
        message: 'Weekly meals cooked is required',
      });
      min(path.weeklyMealsCooked, 0, { message: 'Cannot be negative' });
      max(path.weeklyMealsCooked, 21, { message: 'Enter 21 or fewer' });
      required(path.shoppingDay, { message: 'Select a grocery day' });
      required(path.referralSource, {
        message: 'Select how you heard about us',
      });
      required(path.goals, { message: 'Tell us your goals' });
      minLength(path.goals, 20, {
        message: 'Write at least 20 characters about your goals',
      });
      maxLength(path.goals, 500, {
        message: 'Keep your answer under 500 characters',
      });
      applyWhenValue(
        path.termsAccepted,
        (accepted) => !accepted,
        (termsPath) => {
          required(termsPath, { message: 'You must accept the terms' });
        },
      );
    },
    {
      submission: {
        action: async () => {
          this._auth.completeWelcome();
          await this._router.navigate(['/', recipePaths.RECIPE_SEARCH_PATH]);
        },
      },
    },
  );
}
