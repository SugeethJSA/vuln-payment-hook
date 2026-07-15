# 🎯 QUICK START GUIDE - For Seminar Presenters

## ⚡ 5-Minute Setup

### 1. Install & Start (2 minutes)
```bash
cd vulnerable-webhook-demo
npm install
npm start
```

Server runs at: **http://localhost:3000**

---

## 🎬 Demo Flow (15-20 minutes)

### Phase 1: Introduction (2 minutes)
- Open browser to `http://localhost:3000`
- Show the product page
- Point out **"Security Mode OFF"** banner
- Explain: "We're simulating an online course marketplace"

### Phase 2: Create Order (3 minutes)
1. Click **"Buy Now"**
2. **IMPORTANT:** Copy the Order ID that appears in the alert
3. Show the payment processing page
4. Highlight: "Payment is pending, waiting for confirmation"
5. Show webhook logs section (empty for now)

### Phase 3: The Attack (5 minutes)

#### Using curl (Recommended for live demos)
```bash
# Copy-paste this command (replace ORDER_ID)
curl -X POST http://localhost:3000/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "YOUR_ORDER_ID_HERE",
    "payment_success": true
  }'
```

#### What to show:
1. Open terminal alongside browser
2. Paste the curl command with the actual Order ID
3. Press Enter
4. **Immediately** click "Check Order Status" on the payment page
5. Watch it change from PENDING → PAID! 🎉
6. Order unlocks premium content
7. Show webhook logs (new entry appears)

### Phase 4: Explain the Vulnerability (5 minutes)

Point out on screen:
- ❌ No authentication required
- ❌ Anyone can call the webhook
- ❌ Server blindly trusts the request
- ❌ No signature verification
- ❌ Business logic bypass

**Ask the audience:** "What's wrong with this picture?"

### Phase 5: The Fix (5 minutes)

1. Click **"Toggle Security"** button
2. Show banner changes to **"Security Mode ON"** 🔒
3. Create a new order
4. Try the same attack:
```bash
curl -X POST http://localhost:3000/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "NEW_ORDER_ID",
    "payment_success": true
  }'
```
5. Show it gets **REJECTED** ❌
6. Explain why: "Now we need a valid signature"

Optional: Generate valid signature
```bash
node generate-signature.js YOUR_ORDER_ID
```

---

## 🔧 Troubleshooting During Demo

### Port already in use?
```bash
# Change port in server.js to 3001
const PORT = 3001;
```

### Lost the Order ID?
- Click "Admin Panel" on homepage
- All orders are listed there
- Copy the latest one

### Webhook not updating?
- Click "Refresh Orders" button
- Auto-refresh happens every 3 seconds
- Check server console for logs

---

## 💡 Pro Tips for Presenters

### Make it Interactive
- Ask audience: "What could go wrong here?"
- Have them guess the attack before showing it
- Ask: "How would YOU fix this?"

### Emphasize Real Impact
- Mention: "This has cost companies millions"
- Example: "Imagine this is a $99 SaaS subscription"
- Scale: "Now multiply by 1000 attackers per day"

### Compare to Real World
- Stripe uses webhook signatures
- PayPal uses IPN validation
- This is why payment processors are paranoid

### Show Both Modes
- Always demonstrate BOTH insecure and secure modes
- Show the attack failing in secure mode
- Explain: "Same endpoint, different security"

---

## 📊 What to Have Open

### During Demo:
1. **Browser Tab 1:** Homepage (http://localhost:3000)
2. **Browser Tab 2:** Admin panel / Order list
3. **Terminal:** For curl commands
4. **Postman:** (Optional) As visual alternative to curl

### Optional:
- Slide deck explaining webhook concepts
- Network tab in browser DevTools
- Server logs visible on projector

---

## 🎤 Key Talking Points

### Opening
> "Today we're going to hack a payment system without writing a single line of malicious code."

### During Attack
> "Notice I never touched the frontend. Never saw the payment gateway. Just sent a simple HTTP request."

### Explaining Impact
> "The system trusts anyone who knows this URL. That's like leaving your bank vault code on a sticky note."

### The Fix
> "Security isn't about hiding your endpoint. It's about validating who you trust."

---

## 📝 Audience Questions (Be Ready For)

**Q:** "Couldn't you just hide the webhook URL?"  
**A:** "No! Security through obscurity fails. The URL will be discovered eventually."

**Q:** "Why don't companies just check the payment gateway directly?"  
**A:** "They should! But webhooks are for real-time updates. Double-checking is important though."

**Q:** "Is HMAC signature enough?"  
**A:** "It's a good start. Add IP whitelisting, idempotency, and amount validation for defense in depth."

**Q:** "Has this happened in real life?"  
**A:** "Yes! Multiple companies have been exploited this way. Payment fraud is a huge issue."

**Q:** "What if someone replays a valid signature?"  
**A:** "Great question! That's why we need idempotency - checking if a webhook was already processed."

---

## ⏱️ Time Management

| Segment | Time | Content |
|---------|------|---------|
| Intro | 2 min | Setup & scenario |
| User flow | 3 min | Create order normally |
| Attack | 5 min | Exploit webhook |
| Explanation | 5 min | Why it works |
| Defense | 5 min | Secure mode demo |
| Q&A | 5 min | Questions |

**Total:** ~20-25 minutes including buffer

---

## 🎯 Success Criteria

By the end, students should:
- ✅ Understand what a webhook is
- ✅ See how webhooks can be exploited
- ✅ Know why signature verification matters
- ✅ Understand server-to-server authentication
- ✅ Be able to identify similar vulnerabilities

---

## 🚨 Common Mistakes to Avoid

1. ❌ **Don't** skip showing the insecure mode first
2. ❌ **Don't** use overly technical jargon early on
3. ❌ **Don't** forget to copy the Order ID before attacking
4. ❌ **Don't** assume audience knows what webhooks are
5. ❌ **Don't** rush the "why it's dangerous" explanation

---

## 📚 Backup Slides/Topics

If you have extra time:
- Show the code in server.js (lines 80-130)
- Discuss other webhook vulnerabilities (replay attacks, etc.)
- Compare with OAuth flow security
- Discuss PCI compliance requirements

---

## 🎓 Learning Resources to Share

After the demo, point students to:
- OWASP API Security Top 10
- Stripe's webhook documentation
- The README.md in this project
- Real CVE examples of webhook exploits

---

## ✅ Pre-Demo Checklist

- [ ] Server is running
- [ ] No errors in console
- [ ] Browser can access localhost:3000
- [ ] curl is installed and working
- [ ] You've tested the full flow once
- [ ] You know where the Order ID displays
- [ ] Presentation slides are ready
- [ ] Backup demo video (in case of tech issues)

---

**Good luck with your presentation! 🎉**

Remember: The goal is to make security concepts **accessible and memorable**, not to scare people with complexity.
