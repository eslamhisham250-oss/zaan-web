// pages/api/generate-img2img.js
import formidable from "formidable";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      const form = formidable({ multiples: false });
      form.parse(req, (err, flds, fls) => (err ? reject(err) : resolve({ fields: flds, files: fls })));
    });

    // TODO: هنا تتعامل مع الصورة المرفوعة حسب احتياجك
    return res.status(200).json({ ok: true, fields, files: Object.keys(files) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Upload failed" });
  }
}
