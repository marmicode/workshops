import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  email,
  form,
  FormField,
  FormRoot,
  required,
} from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthState } from './auth-state';
import { authPaths } from './auth.paths';

interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-login',
  imports: [
    FormField,
    FormRoot,
    MatButtonModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
  ],
  template: `
    <section class="auth-panel">
      <h1>Sign in</h1>
      <p class="hint">
        Demo sign-in — any password works. You will be asked for a one-time code
        next.
      </p>

      <form class="auth-form" [formRoot]="loginForm" (submit)="onSubmit($event)">
        <mat-form-field>
          <mat-label>Email</mat-label>
          <input
            [formField]="loginForm.email"
            autocomplete="username"
            matInput
            type="email"
          />
          @if (loginForm.email().touched() && loginForm.email().invalid()) {
            @for (error of loginForm.email().errors(); track error.kind) {
              <mat-error>{{ error.message }}</mat-error>
            }
          }
        </mat-form-field>

        <mat-form-field>
          <mat-label>Password</mat-label>
          <input
            [formField]="loginForm.password"
            autocomplete="current-password"
            matInput
            type="password"
          />
          @if (
            loginForm.password().touched() && loginForm.password().invalid()
          ) {
            @for (error of loginForm.password().errors(); track error.kind) {
              <mat-error>{{ error.message }}</mat-error>
            }
          }
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="loginForm().invalid()"
        >
          Continue
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
  `,
})
export class Login {
  private readonly _auth = inject(AuthState);
  private readonly _router = inject(Router);

  credentials = signal<LoginCredentials>({ email: '', password: '' });

  loginForm = form(this.credentials, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Enter a valid email address' });
    required(path.password, { message: 'Password is required' });
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (this.loginForm().invalid()) {
      return;
    }
    const { email: address } = this.credentials();
    this._auth.submitCredentials(address);
    void this._router.navigate(authPaths.otpRoute());
  }
}
