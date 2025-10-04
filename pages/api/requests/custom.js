import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const BodySchema = z.object({
  type: z.enum(["carpenter", "factory", "ai-design", "hire-designer"]),
  name: z.string().min(2),
  phone: z.string().min(5),
  address: z.string().min(3),
  // حقول اختيارية حسب النوع:
  furnitureType: z.string().optional(),
  material: z.string().optional(),
  measurements: z.string().optional(),
  quantity: z.string().optional(),
  deliveryDate: z.string().optional(),
  prompt: z.string().optional(),
  style: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  city: z.string().optional(),
  imageUrl: z.string().optional(),
  notes: z.string().optional(),
});

const statusMap = {
  "carpenter": "custom-carpenter",
  "factory": "custom-factory",
  "ai-design": "ai-design",
  "hire-designer": "hire-designer",
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) return res.status(401).json({ error: "UNAUTHORIZED" });

    const user = await prisma.user.findUnique({ where: { email: session.user.email }});
    if (!user) return res.status(401).json({ error: "USER_NOT_FOUND" });

    const data = BodySchema.parse(req.body);

    const noteParts = [
      `type=${data.type}`,
      data.furnitureType ? `furniture=${data.furnitureType}` : "",
      data.material ? `material=${data.material}` : "",
      data.measurements ? `measurements=${data.measurements}` : "",
      data.quantity ? `qty=${data.quantity}` : "",
      data.deliveryDate ? `delivery=${data.deliveryDate}` : "",
      data.prompt ? `prompt=${data.prompt}` : "",
      data.style ? `style=${data.style}` : "",
      data.projectType ? `project=${data.projectType}` : "",
      data.budget ? `budget=${data.budget}` : "",
      data.city ? `city=${data.city}` : "",
      data.imageUrl ? `image=${data.imageUrl}` : "",
      data.notes ? `notes=${data.notes}` : "",
    ].filter(Boolean);

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: 0,
        status: statusMap[data.type],
        note: noteParts.join(" | "),
        name: data.name,
        phone: data.phone,
        address: data.address,
      },
    });

    return res.status(200).json({ ok: true, orderId: order.id });
  } catch (err) {
    console.error("REQUEST_CREATE_ERROR", err);
    return res.status(400).json({ error: "INVALID_DATA", detail: String(err) });
  }
}
