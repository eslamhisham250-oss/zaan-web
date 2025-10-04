import { useState } from 'react';
import api from '../lib/api';

export default function RequestForm({ initialCategory = 'carpenter' }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [imageData, setImageData] = useState(null); // Base64
  const [loading, setLoading] = useState(false);

  const onPickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert('حجم الصورة كبير. الرجاء أقل من 3MB');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageData(reader.result);
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('رجاءً املأ العنوان والوصف.');
      return;
    }
    const dims = {
      length: length ? Number(length) : null,
      width:  width  ? Number(width)  : null,
      height: height ? Number(height) : null,
    };

    setLoading(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        dimensions: dims,
        category: initialCategory,
        images: imageData ? [imageData] : [], // نرسل Base64
      };
      await api.post('/api/requests', payload);

      // تفريغ الحقول
      setTitle(''); setDescription('');
      setLength(''); setWidth(''); setHeight('');
      setImageData(null);
      alert('تم إنشاء الطلب بنجاح ✔️');
    } catch (err) {
      console.error(err);
      alert('فشل إنشاء الطلب. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const input = { width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 8 };

  return (
    <form onSubmit={submit} style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 10 }}>
        <label>العنوان</label>
        <input style={input} value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>الوصف</label>
        <textarea style={{ ...input, minHeight: 120 }} value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input type="number" placeholder="طول (سم)" style={input} value={length} onChange={(e) => setLength(e.target.value)} />
        <input type="number" placeholder="عرض (سم)" style={input} value={width} onChange={(e) => setWidth(e.target.value)} />
        <input type="number" placeholder="ارتفاع (سم)" style={input} value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>صورة مرجعية (اختياري)</label><br/>
        <input type="file" accept="image/*" onChange={onPickImage} />
        {imageData && (
          <div style={{ marginTop: 8 }}>
            <img src={imageData} alt="preview" style={{ maxWidth: 240, borderRadius: 8, border: '1px solid #eee' }} />
          </div>
        )}
      </div>

      <button type="submit" disabled={loading} style={{ padding: '10px 16px', borderRadius: 8 }}>
        {loading ? 'جارٍ الإرسال…' : 'إنشاء الطلب'}
      </button>
    </form>
  );
}