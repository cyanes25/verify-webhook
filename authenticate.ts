import crypto from 'crypto';

const body = {
  subscription: 'BURN',
  createdAt: 1724259015977,
  id: '375ed13b-4dd6-4c14-b056-b57d3c874759',
  userId: '03cf5943-2bec-48b2-b58d-56587efd02c4',
  data: {
    amount: 2179,
    chain: 'Polygon',
    externalId: '66c61ac7dadc394aa31c8c33',
    id: '7ab19052-4917-42b3-8c04-fc83a1d4adec',
    reason: 'sell order posted',
    status: 'QUEUED',
    transferFee: 75,
    walletAddress: '0xC774faB31111deE89a3f7Ae9fA34Cd9396209E19',
  },
  acknowledged: false,
};
const base64Signature =
  'MEUCIQDGfcNEZtfiq5CHxWmogr3t0pIE9VH5w9yWZa8ihZ8BxAIgPy9U3uyeIOTs5s88nSpOmXVhtM+yCB96D0vpAnO1+Dg=';

const bodyBytes = Buffer.from(JSON.stringify(body));
const signature = Buffer.from(base64Signature, 'base64');
const hashedBody = crypto.createHash('sha256').update(bodyBytes).digest();

const pubKey =
  '-----BEGIN PUBLIC KEY-----\n' +
  'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEY415QEIfaru/7bzRIdeuHDL6eIWE\n' +
  '8dUXq1MBygBWFPVYs/8DrNFBpv6ULXfncVvm+waodlSnAXIzDOlM6hI3Tg==\n' +
  '-----END PUBLIC KEY-----';

const verify = crypto.createVerify('SHA256');
verify.update(bodyBytes); // Notice that the bodyBytes is passed here, not the hashed body
verify.end();

const isVerified = verify.verify(pubKey, signature);

if (!isVerified) {
  console.error('Verification Failed!');
} else {
  console.log('Signature verified successfully!');
}
