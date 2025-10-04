// lib/db.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("⚠️ MONGODB_URI is not set. The app will use fallback data.");
}

// Cache connection across hot-reloads in dev
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (!MONGODB_URI) return null; // هنسيب الـ API تستخدم Fallback

  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        // لا تمرر useNewUrlParser/useUnifiedTopology: Deprecated في v4+
        // ممكن تضيف maxPoolSize مثلاً:
        maxPoolSize: 10,
      })
      .then((m) => m.connection)
      .catch((err) => {
        console.error("❌ Mongo connect error:", err?.message || err);
        return null; // نرجّع null ونسمح للـ API تكمل بـ fallback
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
