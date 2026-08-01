// ⚠️ EDUCATIONAL DEMO ONLY - INTENTIONALLY VULNERABLE ⚠️
// This code demonstrates webhook security weaknesses for teaching purposes

const express = require('express');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve React production build first
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// In-memory database (resets on server restart)
let orders = {};
let webhookLogs = [];
let secureMode = false; // Toggle for demonstration

// Secret key (only used in secure mode)
const WEBHOOK_SECRET = 'demo_secret_key_12345';

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function generateOrderId() {
  return 'ORD_' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function logWebhook(data) {
  const log = {
    timestamp: new Date().toISOString(),
    data: data,
    mode: secureMode ? 'SECURE' : 'INSECURE'
  };
  webhookLogs.push(log);
  console.log('📝 Webhook Log:', log);
}

// ==========================================
// ROUTES - FRONTEND PAGES
// ==========================================

// Serve React SPA assets from build and root index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/payment/:orderId', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'payment.html'));
});

app.get('/success/:orderId', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ==========================================
// API ENDPOINTS
// ==========================================

// Create order
app.post('/api/create-order', (req, res) => {
  const orderId = generateOrderId();
  
  orders[orderId] = {
    order_id: orderId,
    product: 'Premium Course',
    amount: 999,
    status: 'PENDING',
    created_at: new Date().toISOString()
  };
  
  console.log(`✅ Order created: ${orderId}`);
  
  res.json({
    success: true,
    order_id: orderId,
    redirect_url: `/payment/${orderId}`
  });
});

// Get order status
app.get('/api/order/:orderId', (req, res) => {
  const { orderId } = req.params;
  const order = orders[orderId];
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order);
});

// ==========================================
// 🔴 VULNERABLE WEBHOOK ENDPOINT 🔴
// ==========================================

app.post('/webhook/payment', (req, res) => {
  const { order_id, payment_success, signature } = req.body;
  
  logWebhook(req.body);
  
  // ⚠️ VULNERABILITY: NO VALIDATION IN INSECURE MODE ⚠️
  if (!secureMode) {
    console.log('🔓 INSECURE MODE: Accepting webhook without verification!');
    
    // Blindly trust the webhook data
    if (order_id && payment_success === true) {
      const order = orders[order_id];
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      // ⚠️ CRITICAL VULNERABILITY: Mark order as paid without verification
      order.status = 'PAID';
      order.paid_at = new Date().toISOString();
      
      console.log(`💰 Order ${order_id} marked as PAID (INSECURE)`);
      
      return res.json({
        success: true,
        message: 'Payment confirmed (insecure)',
        order: order
      });
    }
    
    return res.status(400).json({ error: 'Invalid webhook data' });
  }
  
  // ==========================================
  // 🔐 SECURE MODE (FOR COMPARISON) 🔐
  // ==========================================
  
  console.log('🔒 SECURE MODE: Verifying webhook signature...');
  
  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(JSON.stringify({ order_id, payment_success }))
    .digest('hex');
  
  if (signature !== expectedSignature) {
    console.log('❌ Invalid signature! Webhook rejected.');
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Verify order exists and amount
  const order = orders[order_id];
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  // Additional validation
  if (order.status === 'PAID') {
    return res.status(400).json({ error: 'Order already paid' });
  }
  
  // Only mark as paid if all checks pass
  if (payment_success === true) {
    order.status = 'PAID';
    order.paid_at = new Date().toISOString();
    
    console.log(`💰 Order ${order_id} marked as PAID (SECURE)`);
    
    return res.json({
      success: true,
      message: 'Payment confirmed (secure)',
      order: order
    });
  }
  
  res.status(400).json({ error: 'Payment failed' });
});

// ==========================================
// ADMIN/DEBUG ENDPOINTS
// ==========================================

// Toggle security mode
app.post('/api/toggle-security', (req, res) => {
  secureMode = !secureMode;
  console.log(`🔄 Security mode: ${secureMode ? 'ENABLED' : 'DISABLED'}`);
  
  res.json({
    success: true,
    secureMode: secureMode
  });
});

// Get current security mode
app.get('/api/security-status', (req, res) => {
  res.json({
    secureMode: secureMode,
    webhookSecret: secureMode ? WEBHOOK_SECRET : null
  });
});

// Get webhook logs
app.get('/api/webhook-logs', (req, res) => {
  res.json({
    logs: webhookLogs.slice(-10), // Last 10 logs
    total: webhookLogs.length
  });
});

// Get all orders (admin view)
app.get('/api/all-orders', (req, res) => {
  res.json({
    orders: Object.values(orders),
    total: Object.keys(orders).length
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║  🎓 VULNERABLE WEBHOOK DEMO - EDUCATIONAL PURPOSES ONLY  ║
╚═══════════════════════════════════════════════════════════╝

Server running at: http://localhost:${PORT}

Security Mode: ${secureMode ? 'ENABLED 🔒' : 'DISABLED 🔓'}
Webhook Endpoint: http://localhost:${PORT}/webhook/payment

⚠️  This application is INTENTIONALLY VULNERABLE
⚠️  DO NOT use this code in production
⚠️  For educational demonstrations only

📖 Instructions:
1. Visit http://localhost:${PORT}
2. Create an order and observe the order ID
3. Use Postman/curl to send fake payment webhook
4. Watch the order get marked as PAID without real payment!

Toggle security: POST http://localhost:${PORT}/api/toggle-security
  `);
});
