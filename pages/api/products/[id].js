import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(product);
    }

    if (req.method === "PUT") {
      const data = req.body;
      const product = await prisma.product.update({ where: { id }, data });
      return res.status(200).json(product);
    }

    if (req.method === "DELETE") {
      await prisma.product.delete({ where: { id } });
      return res.status(204).end();
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
