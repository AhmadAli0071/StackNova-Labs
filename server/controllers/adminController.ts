import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyPin = async (req: Request, res: Response) => {
  try {
    const { pin } = req.body;
    const adminPin = String(process.env.ADMIN_PIN || '123456').trim();

    if (!pin) {
      res.status(400).json({ success: false, message: 'PIN is required' });
      return;
    }

    if (String(pin).trim() !== adminPin) {
      res.status(401).json({ success: false, message: 'Invalid PIN' });
      return;
    }

    const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET || 'stacknova-secret-key', {
      expiresIn: '24h',
    });

    res.json({ success: true, data: { token } });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
