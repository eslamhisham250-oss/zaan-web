// components/admin/ProductForm.js
import { useState } from "react";
import { db, storage } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (file) {
        const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      const docRef = await addDoc(collection(db, "products"), {
        ...form,
        price: parseFloat(form.price),
        image: imageUrl,
        createdAt: new Date()
      });

      const newProduct = { id: docRef.id, ...form, price: parseFloat(form.price), image: imageUrl };
      onAdd(newProduct);

      setForm({ name: "", price: "", description: "" });
      setFile(null);
      alert("✅ تم إضافة المنتج!");
    } catch (err) {
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <input
        type="text"
        placeholder="اسم المنتج"
        value={form.name}
        onChange={(e)=> setForm({...form, name: e.target.value})}
        required
        style={{ display:"block", marginBottom:10, padding:8, width:"100%" }}
      />
      <input
        type="number"
        placeholder="السعر"
        value={form.price}
        onChange={(e)=> setForm({...form, price: e.target.value})}
        required
        style={{ display:"block", marginBottom:10, padding:8, width:"100%" }}
      />
      <textarea
        placeholder="الوصف"
        value={form.description}
        onChange={(e)=> setForm({...form, description: e.target.value})}
        style={{ display:"block", marginBottom:10, padding:8, width:"100%" }}
      ></textarea>
      <input
        type="file"
        onChange={(e)=> setFile(e.target.files[0])}
        style={{ marginBottom:10 }}
      />
      <button type="submit" disabled={loading} style={{ padding:"10px 20px", background:"#0a7", color:"#fff", border:"none", borderRadius:6 }}>
        {loading ? "⏳ جاري الإضافة..." : "➕ إضافة المنتج"}
      </button>
    </form>
  );
}
