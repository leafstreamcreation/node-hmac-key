import { crypto } from 'crypto';

async function generateHMACKey(useSHA512 = false) {
  const key = await crypto.subtle.generateKey(
    {
      name: 'HMAC',
      hash: { name: useSHA512 ? 'SHA-512' : 'SHA-256' }, // Use 'SHA-512' for HS512
    },
    true, // extractable (can be exported)
    ['sign', 'verify'] // usages
  );

  return key;
}

const useSHA512 = process.argv.includes('--sha512');

generateHMACKey(useSHA512).then(key => console.log(key));