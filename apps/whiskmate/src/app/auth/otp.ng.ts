import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  form,
  FormField,
  FormRoot,
  maxLength,
  minLength,
  required,
} from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthState } from './auth-state';
import { authPaths } from './auth.paths';
import { otpMatchesHash } from './otp-hash';

interface OtpModel {
  code: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-otp',
  imports: [
    FormField,
    FormRoot,
    MatButtonModule,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
  ],
  template: `
    <section class="auth-panel">
      <h1>Verify your identity</h1>
      <p class="hint">
        We sent a one-time code to
        <strong>{{ auth.email() }}</strong
        >. Enter the 6-digit code to continue.
      </p>

      <form class="auth-form" [formRoot]="otpForm">
        <mat-form-field>
          <mat-label>One-time code</mat-label>
          <input
            [formField]="otpForm.code"
            autocomplete="one-time-code"
            inputmode="numeric"
            matInput
            type="text"
          />
          <mat-hint>6 digits</mat-hint>
          @if (otpForm.code().touched() && otpForm.code().invalid()) {
            @for (error of otpForm.code().errors(); track error.kind) {
              <mat-error>{{ error.message }}</mat-error>
            }
          }
        </mat-form-field>

        @if (
          otpForm.code().errors().find(error => error.kind === 'invalid-otp');
          as otpError
        ) {
          <p class="otp-error" role="alert">
            {{ otpError.message }}
          </p>
        }

        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="otpForm().invalid() || otpForm().submitting()"
        >
          Verify
        </button>
      </form>
    </section>
  `,
  styles: `
    :host {
      display: block;
      max-width: 28rem;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .auth-panel h1 {
      margin: 0 0 0.5rem;
      font-size: 1.75rem;
    }

    .hint {
      color: var(--mat-sys-on-surface-variant, #5f6368);
      margin: 0 0 1.5rem;
      line-height: 1.5;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .auth-form button {
      align-self: flex-start;
      margin-top: 0.5rem;
    }

    .otp-error {
      color: var(--mat-sys-error, #b3261e);
      margin: 0;
    }
  `,
})
export class Otp {
  protected readonly auth = inject(AuthState);
  private readonly _router = inject(Router);

  otpModel = signal<OtpModel>({ code: '' });

  otpForm = form(
    this.otpModel,
    (path) => {
      required(path.code, { message: 'Code is required' });
      minLength(path.code, 6, { message: 'Enter all 6 digits' });
      maxLength(path.code, 6, { message: 'Enter only 6 digits' });
    },
    {
      submission: {
        action: async (path) => {
          const valid = await otpMatchesHash(this.otpModel().code.trim());
          if (!valid) {
            return {
              kind: 'invalid-otp',
              fieldTree: path.code,
              message: 'That code is incorrect. Try again.',
            };
          }

          this.auth.completeOtp();
          await this._router.navigate(authPaths.welcomeRoute());
          return null;
        },
      },
    },
  );
}
