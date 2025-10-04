import { useState } from "react";

export default function Searchbar({ onSearch }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <form onSubmit={submit} style={{ marginBottom:16 }}>
      <input
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        placeholder="ابحث عن منتج..."
        style={{ padding:8, width:"70%", border:"1px solid #ccc", borderRadius:6 }}
      />
      <button type="submit" style={{marginRight:8}}>بحث</button>
    </form>
  );
}
