// pages/api/payments.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { amount, currency, email, phone } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    // 1️⃣ خُد Token من PayMob
    const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: process.env.PAYMOB_API_KEY }),
    });
    const authData = await authRes.json();
    if (!authData.token) {
      console.error("Auth error:", authData);
      return res.status(500).json({ success: false, message: "Auth token failed" });
    }
    const token = authData.token;

    // 2️⃣ أنشئ Order
    const orderRes = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: "false",
        amount_cents: amount * 100, // بالقرش
        currency: currency || "EGP",
        items: [],
      }),
    });
    const orderData = await orderRes.json();
    if (!orderData.id) {
      console.error("Order error:", orderData);
      return res.status(500).json({ success: false, message: "Order creation failed" });
    }

    // 3️⃣ خُد Payment Key
    const payRes = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: amount * 100,
        expiration: 3600,
        order_id: orderData.id,
        billing_data: {
          apartment: "NA",
          email: email || "customer@test.com",
          floor: "NA",
          first_name: "Test",
          last_name: "User",
          phone_number: phone || "+201111111111",
          street: "NA",
          building: "NA",
          shipping_method: "NA",
          postal_code: "NA",
          city: "Cairo",
          country: "EG",
          state: "NA",
        },
        currency: currency || "EGP",
        integration_id: process.env.PAYMOB_INTEGRATION_ID,
      }),
    });
    const payData = await payRes.json();
    if (!payData.token) {
      console.error("Payment key error:", payData);
      return res.status(500).json({ success: false, message: "Payment key failed" });
    }

    // 4️⃣ رجّع لينك الدفع للعميل
    const iframeURL = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${payData.token}`;

    console.log("✅ Payment session created:", iframeURL);

    return res.status(200).json({ success: true, url: iframeURL });

  } catch (err) {
    console.error("PayMob Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
  