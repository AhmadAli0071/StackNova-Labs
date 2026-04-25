import { Request, Response } from 'express';
import Contact from '../models/Contact.js';
import Newsletter from '../models/Newsletter.js';
import Project from '../models/Project.js';
import BlogPost from '../models/BlogPost.js';
import Service from '../models/Service.js';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [totalContacts, newContacts, totalSubscribers, totalProjects, totalPosts, totalServices] =
      await Promise.all([
        Contact.countDocuments(),
        Contact.countDocuments({ status: 'new' }),
        Newsletter.countDocuments({ isActive: true }),
        Project.countDocuments(),
        BlogPost.countDocuments({ isPublished: true }),
        Service.countDocuments({ isActive: true }),
      ]);

    res.json({
      success: true,
      data: {
        totalContacts,
        newContacts,
        totalSubscribers,
        totalProjects,
        totalPosts,
        totalServices,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
