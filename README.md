# 🔴 Vulnerable Webhook Demo - Educational Purposes Only

## ⚠️ DISCLAIMER
This application is **INTENTIONALLY VULNERABLE** and designed solely for educational demonstrations about webhook security. **DO NOT** deploy this in production or use it for any real payment processing.

---

## 📚 What This Demonstrates

This demo shows how **blind trust in webhooks** can lead to serious security vulnerabilities. Specifically, it demonstrates:

- **Webhook Spoofing**: How attackers can send fake payment confirmations
- **Business Logic Bypass**: Getting premium content without payment
- **Integration Security**: Why server-to-server trust isn't automatic
- **Signature Verification**: The importance of HMAC/signature validation

---

## 🎯 Learning Objectives

Students will learn:
1. How webhook attacks work in real-world scenarios
2. The difference between secure and insecure webhook implementations
3. Why authentication is critical for server-to-server communication
4. How to implement proper webhook validation

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Postman or curl (for testing attacks)

### Installation

```bash
# 1. Navigate to the project directory
cd vulnerable-webhook-demo

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

The server will start at: **http://localhost:3000**

---

## 🎮 How to Use

### Normal User Flow (Victim Perspective)

1. Visit `http://localhost:3000`
2. Click **"Buy Now"** button
3. Note the **Order ID** that appears
4. You'll be redirected to a fake payment processing page
5. The order remains in **PENDING** status indefinitely

### Attacker Flow (Exploitation)

#### Method 1: Using curl

```bash
curl -X POST http://localhost:3000/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "YOUR_ORDER_ID_HERE",
    "payment_success": true
  }'
```

#### Method 2: Using Postman

1. Create a new POST request
2. URL: `http://localhost:3000/webhook/payment`
3. Headers:
   - `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "order_id": "YOUR_ORDER_ID_HERE",
  "payment_success": true
}
```
5. Click **Send**

#### Result
✅ The order instantly changes from **PENDING** to **PAID**  
✅ Premium content unlocks without payment  
✅ Attacker gains ₹999 worth of content for FREE

---

## 🔐 Security Modes

### Insecure Mode (Default - Vulnerable)

In this mode, the webhook endpoint:
- ❌ Accepts ANY request from ANY source
- ❌ Has NO signature verification
- ❌ Has NO authentication
- ❌ Blindly trusts request data
- ❌ No IP whitelisting
- ❌ No validation of payment gateway

**This is the vulnerable state used for demonstration.**

### Secure Mode (Protected)

Toggle security by clicking the "Toggle Security" button or:

```bash
curl -X POST http://localhost:3000/api/toggle-security
```

In secure mode, the webhook requires:
- ✅ Valid HMAC-SHA256 signature
- ✅ Secret key validation
- ✅ Order existence verification
- ✅ Duplicate payment prevention
- ✅ Proper request structure

#### Secure Mode Attack Example

```bash
# This will be REJECTED in secure mode
curl -X POST http://localhost:3000/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "YOUR_ORDER_ID",
    "payment_success": true,
    "signature": "invalid_signature"
  }'
```

To send a **valid** webhook in secure mode, you need to generate a proper HMAC signature:

```javascript
const crypto = require('crypto');

const payload = {
  order_id: "YOUR_ORDER_ID",
  payment_success: true
};

const signature = crypto
  .createHmac('sha256', 'demo_secret_key_12345')
  .update(JSON.stringify(payload))
  .digest('hex');

// Now include this signature in your webhook request
```

---

## 📊 API Endpoints

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Homepage with product listing |
| POST | `/api/create-order` | Create a new order |
| GET | `/api/order/:orderId` | Get order status |
| GET | `/payment/:orderId` | Payment processing page |
| GET | `/success/:orderId` | Success page (if paid) |

### Webhook Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/webhook/payment` | **VULNERABLE** Payment webhook |

### Admin/Debug Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/toggle-security` | Toggle secure/insecure mode |
| GET | `/api/security-status` | Check current security mode |
| GET | `/api/webhook-logs` | View recent webhook activity |
| GET | `/api/all-orders` | List all orders |

---

## 🧪 Demo Script for Seminars

### Part 1: Setup (2 minutes)
1. Start the application
2. Show the homepage
3. Explain the "Premium Course" scenario
4. Show the "Security Mode OFF" banner

### Part 2: Normal Flow (3 minutes)
1. Click "Buy Now" and create an order
2. Show the order ID to the audience
3. Explain that the payment page is fake
4. Show order status is **PENDING**
5. Explain: "Normally, a real payment gateway would send a webhook"

### Part 3: The Attack (5 minutes)
1. Open Postman/curl
2. Show the vulnerable webhook endpoint
3. Craft the fake webhook request with the order ID
4. Send the request
5. **BOOM** - Order instantly becomes PAID
6. Show premium content unlocked
7. Show webhook logs on the admin panel

### Part 4: The Fix (5 minutes)
1. Toggle security mode ON
2. Try the same attack again
3. Show it gets **REJECTED**
4. Explain the security measures:
   - HMAC signature verification
   - Secret key authentication
   - Order validation
5. Show how to generate a valid signature (optional)

### Part 5: Q&A (5 minutes)
- Discuss real-world implications
- Show examples of companies affected by this
- Discuss best practices

---

## 🎓 Teaching Points

### Key Vulnerabilities Explained

1. **Blind Trust**
   - The application trusts ANY incoming webhook
   - No verification of the source
   - Assumption: "If it comes to my endpoint, it must be legitimate"

2. **No Authentication**
   - Anyone who knows the endpoint can call it
   - No secret keys or tokens required
   - Endpoint is publicly accessible

3. **Business Logic Flaw**
   - Payment confirmation = instant unlock
   - No verification with actual payment gateway
   - State transition based solely on webhook data

### Real-World Impact

This vulnerability has affected:
- E-commerce platforms
- SaaS subscription services
- Digital content providers
- Ticketing systems
- Donation platforms

**Financial Impact**: Businesses have lost millions due to webhook vulnerabilities.

### Defense Strategies

1. **HMAC Signature Verification**
   ```javascript
   const signature = crypto
     .createHmac('sha256', SECRET_KEY)
     .update(webhookBody)
     .digest('hex');
   
   if (signature !== receivedSignature) {
     return reject();
   }
   ```

2. **Secret Keys**
   - Use environment variables
   - Rotate keys regularly
   - Never commit to version control

3. **IP Whitelisting**
   - Only accept webhooks from known IPs
   - Payment gateways publish their IP ranges

4. **Idempotency**
   - Prevent duplicate processing
   - Use unique webhook IDs

5. **Verify with Source**
   - Query payment gateway API
   - Confirm transaction independently

---

## 🔍 Monitoring & Logs

The application provides real-time monitoring:

- **Webhook Logs**: See every webhook request in real-time
- **Order Dashboard**: Monitor all orders and their status
- **Security Mode Indicator**: Visual feedback on protection level

Access logs at:
- UI: Homepage bottom section
- Console: Server terminal output
- API: `GET /api/webhook-logs`

---

## 🛠️ Customization

### Change Product Details

Edit in `server.js`:
```javascript
orders[orderId] = {
  product: 'Your Product Name',
  amount: 1999, // Change price
  ...
};
```

### Change Secret Key (Secure Mode)

Edit in `server.js`:
```javascript
const WEBHOOK_SECRET = 'your_new_secret_key';
```

### Change Port

Edit in `server.js`:
```javascript
const PORT = 3000; // Change to your preferred port
```

---

## 📝 Additional Resources

### Recommended Reading
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [Stripe Webhook Best Practices](https://stripe.com/docs/webhooks/best-practices)
- [PayPal Webhook Security](https://developer.paypal.com/docs/api-basics/notifications/webhooks/)

### Similar Vulnerabilities
- CVE-2019-XXXXX: E-commerce webhook bypass
- Case Study: How Company X lost $2M to webhook attacks

---

## 🤝 Contributing

This is an educational project. If you have suggestions for:
- Additional security scenarios
- Better demonstration features
- Documentation improvements

Feel free to create issues or pull requests.

---

## 📄 License

MIT License - Educational Use Only

---

## ⚡ Troubleshooting

### Server won't start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill the process or change the port
```

### Dependencies won't install
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Webhook not working
- Ensure the server is running
- Check the order ID is correct
- Verify Content-Type header is `application/json`
- Check server logs for errors

---

## 🎬 Video Tutorial

For a complete video walkthrough of this demo, visit:
[Coming soon - Add your YouTube/demo video link here]

---

## 📧 Contact

For questions about this educational demo:
- Create an issue on GitHub
- Email: [your-email@example.com]

---

**Remember: This is for EDUCATION ONLY. Never use vulnerable code in production!**

---

## 🏆 Credits

Created for cybersecurity education and awareness.

Special thanks to all security researchers who responsibly disclose vulnerabilities.

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**Status**: Educational Demo Only
