// pages/api/auth/register.js
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  password: z.string().min(6)
});

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const data = schema.parse(req.body);
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) return res.status(400).json({ error: 'Email already in use' });
    const hash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { name: data.name, email: data.email, phone: data.phone, password: hash }
    });
    res.json({ ok: true, userId: user.id });
  } catch (e) {
    res.status(400).json({ error: e.message || 'Bad request' });
  }
}