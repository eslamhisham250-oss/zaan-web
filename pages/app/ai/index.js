import { useState } from "react";
import PrimaryButton from "../../../components/Button";

export default function AIPage() {
  const [tab, setTab] = useState("text2img");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleText2Img = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-text2img", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.url);
    } catch (err) {
      console.error("Error generating image:", err);
    }
    setLoading(false);
  };

  const handleImg2Img = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", image);

      const res = await fetch("/api/generate-img2img", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data.url);
    } catch (err) {
      console.error("Error editing image:", err);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h2 style={{ marginBottom: 10 }}>✨ تصميم بالذكاء الاصطناعي</h2>
      <p style={{ marginBottom: 20, color: "#555" }}>
        اختر الطريقة: كتابة وصف أو رفع صورة لتعديلها.
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <PrimaryButton
          onClick={() => setTab("text2img")}
          style={{
            ...tabBtn,
          }}
        >
          ✍️ أوصف بالأحرف
        </PrimaryButton>
        <button
          onClick={() => setTab("img2img")}
          style={{
            ...tabBtn,
          }}
        >
          🖼️ عندي صورة
        </button>
      </div>

      {/* Text2Img */}
      {tab === "text2img" && (
        <div>
          <textarea
            placeholder="اكتب وصفك هنا..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={textarea}
          />
          <button onClick={handleText2Img} disabled={loading} style={btn}>
            {loading ? "⏳ جاري..." : "🚀 إنشاء صورة"}
          </button>
        </div>
      )}

      {/* Img2Img */}
      {tab === "img2img" && (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ marginBottom: 12 }}
          />
          <button onClick={handleImg2Img} disabled={loading} style={btn}>
            {loading ? "⏳ جاري..." : "🎨 تعديل الصورة"}
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>✅ النتيجة</h3>
          <img src={result} alt="AI Result" style={{ maxWidth: "100%", borderRadius: 8 }} />
        </div>
      )}
    </div>
  );
}

/* ===== Styles ===== */
const tabBtn = {
  flex: 1,
  padding: "12px 16px",
  border: "1px solid #ccc",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
};

const textarea = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
  minHeight: 120,
  marginBottom: 12,
};

const btn = {
  background: "#0a7",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "12px 20px",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: "bold",
};
