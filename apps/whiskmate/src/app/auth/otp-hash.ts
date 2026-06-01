/** SHA-256 hex digest of the demo OTP `876543`. */
export const OTP_SHA256_HASH =
  '8a84d8b172e48772627a10b2702013f80412c848eef812333beda0ae51deb590';

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function otpMatchesHash(code: string): Promise<boolean> {
  return (await sha256Hex(code)) === OTP_SHA256_HASH;
}
