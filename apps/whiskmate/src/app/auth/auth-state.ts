import { computed, Injectable, signal } from '@angular/core';

export type AuthPhase =
  | 'anonymous'
  | 'otp-pending'
  | 'otp-verified'
  | 'onboarded';

const STORAGE_KEY = 'wm-auth-phase';
const EMAIL_KEY = 'wm-auth-email';

@Injectable({ providedIn: 'root' })
export class AuthState {
  readonly phase = signal<AuthPhase>(readPhase());
  readonly email = signal(readEmail());

  readonly isOnboarded = computed(() => this.phase() === 'onboarded');
  readonly isOtpVerified = computed(
    () => this.phase() === 'otp-verified' || this.isOnboarded(),
  );
  readonly isOtpPending = computed(() => this.phase() === 'otp-pending');

  submitCredentials(email: string): void {
    this.email.set(email.trim());
    this.setPhase('otp-pending');
  }

  completeOtp(): void {
    this.setPhase('otp-verified');
  }

  completeWelcome(): void {
    this.setPhase('onboarded');
  }

  signOut(): void {
    this.email.set('');
    this.setPhase('anonymous');
  }

  private setPhase(phase: AuthPhase): void {
    this.phase.set(phase);
    if (phase === 'anonymous') {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(EMAIL_KEY);
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, phase);
    sessionStorage.setItem(EMAIL_KEY, this.email());
  }
}

function readPhase(): AuthPhase {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (
    stored === 'otp-pending' ||
    stored === 'otp-verified' ||
    stored === 'onboarded'
  ) {
    return stored;
  }
  return 'anonymous';
}

function readEmail(): string {
  return sessionStorage.getItem(EMAIL_KEY) ?? '';
}
