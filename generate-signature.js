// ====================================================
// HMAC Signature Generator for Secure Mode Testing
// ====================================================
// Use this script to generate valid signatures when testing secure mode

const crypto = require('crypto');

// The secret key used by the server (must match server.js)
const WEBHOOK_SECRET = 'demo_secret_key_12345';

// ====================================================
// FUNCTION: Generate HMAC Signature
// ====================================================
function generateSignature(orderId, paymentSuccess) {
  const payload = {
    order_id: orderId,
    payment_success: paymentSuccess
  };

  const signature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(JSON.stringify(payload))
    .digest('hex');

  return signature;
}

// ====================================================
// EXAMPLE USAGE
// ====================================================

// Replace this with your actual order ID
const YOUR_ORDER_ID = 'ORD_EXAMPLE123';

const signature = generateSignature(YOUR_ORDER_ID, true);

console.log('\n╔═══════════════════════════════════════════════════════════╗');
console.log('║          HMAC Signature Generator (Secure Mode)          ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

console.log('📋 Order ID:', YOUR_ORDER_ID);
console.log('🔑 Generated Signature:', signature);
console.log('\n📤 Use this in your webhook request:\n');

console.log('{\n  "order_id": "' + YOUR_ORDER_ID + '",');
console.log('  "payment_success": true,');
console.log('  "signature": "' + signature + '"\n}');

console.log('\n🔐 curl command:\n');
console.log(`curl -X POST http://localhost:3000/webhook/payment \\
  -H "Content-Type: application/json" \\
  -d '{
    "order_id": "${YOUR_ORDER_ID}",
    "payment_success": true,
    "signature": "${signature}"
  }'`);

console.log('\n✅ This will work ONLY in secure mode!');
console.log('❌ In insecure mode, signature is not checked\n');

// ====================================================
// INTERACTIVE MODE (if you want to customize)
// ====================================================

// Uncomment the lines below to make it interactive with command-line args
// const orderId = process.argv[2] || YOUR_ORDER_ID;
// const sig = generateSignature(orderId, true);
// console.log('\nSignature for', orderId, ':', sig);

// Usage: node generate-signature.js ORD_ABC123
