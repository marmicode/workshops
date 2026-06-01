export const LOGIN_PATH = 'login' as const;
export const OTP_PATH = 'otp' as const;
export const WELCOME_PATH = 'welcome' as const;

export const authPaths = {
  LOGIN_PATH,
  OTP_PATH,
  WELCOME_PATH,
  loginRoute: () => ['/', LOGIN_PATH] as const,
  otpRoute: () => ['/', OTP_PATH] as const,
  welcomeRoute: () => ['/', WELCOME_PATH] as const,
};
