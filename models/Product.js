// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short: String,
    price: { type: Number, required: true },
    oldPrice: Number,
    image: String,
    images: [String],
    material: String,
    color: String,
    size: String,
    rating: Number,
    reviews: Number,
    category: String,
    shipping: String,
    returnPolicy: String,
    warranty: String,
    colors: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
