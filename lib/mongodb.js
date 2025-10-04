// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("⚠️ من فضلك ضيف MONGODB_URI في ملف .env.local");
}

if (process.env.NODE_ENV === "development") {
  // 🛠 يمنع فتح Connections كتير مع كل Hot Reload
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // 🟢 في Production
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
