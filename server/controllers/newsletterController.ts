import { Request, Response } from 'express';
import Newsletter from '../models/Newsletter.js';

export const subscribe = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
        res.json({ success: true, message: 'Re-subscribed successfully!' });
        return;
      }
      res.status(400).json({ success: false, message: 'Already subscribed' });
      return;
    }

    await Newsletter.create({ email });
    res.status(201).json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const unsubscribe = async (req: Request, res: Response) => {
  try {
    const subscriber = await Newsletter.findOneAndUpdate(
      { email: req.body.email },
      { isActive: false }
    );

    if (!subscriber) {
      res.status(404).json({ success: false, message: 'Email not found' });
      return;
    }

    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getSubscribers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const subscribers = await Newsletter.find({ isActive: true })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Newsletter.countDocuments({ isActive: true });

    res.json({
      success: true,
      data: subscribers,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
