// بيرسل للـ Google Colab (Stable Diffusion) عبر REST API
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body;

  try {
    const response = await fetch(process.env.COLAB_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();

    res.status(200).json({ url: data.url });
  } catch (err) {
    res.status(500).json({ error: "خطأ في توليد الصورة" });
  }
}
