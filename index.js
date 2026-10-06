import { webcrypto } from 'node:crypto';

async function generateHMACKey(useSHA512 = false) {
  const key = await webcrypto.subtle.generateKey(
    {
      name: 'HMAC',
      hash: useSHA512 ? 'SHA-512' : 'SHA-256', // Use 'SHA-512' for HS512
    },
    true, // extractable (can be exported)
    ['sign', 'verify'] // usages
  );
  const raw = await webcrypto.subtle.exportKey("raw", key);
  const keyBytes = Array.from(new Uint8Array(raw));
  const hex = keyBytes.map(b => b.toString(16).padStart(2,'0')).join('');

  return hex;
}

const useSHA512 = process.argv.includes('--sha512');

generateHMACKey(useSHA512).then(hex => console.log(hex));