import { Router, type Request, type Response } from 'express';
import prisma from '../../prisma/client.js';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const userId = authHeader.split(' ')[1];
    const { page = 1, limit = 20, unread } = req.query;

    const where: any = { userId };
    if (unread === 'true') {
      where.isRead = false;
    }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(String(limit)),
      skip: (parseInt(String(page)) - 1) * parseInt(String(limit)),
    });

    const unreadCount = await prisma.notification.count({
      where: { userId, isRead: false },
    });

    res.status(200).json({
      code: 0,
      message: 'success',
      data: {
        data: notifications,
        unreadCount,
      },
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.put('/read/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const { id } = req.params;
    const userId = authHeader.split(' ')[1];

    await prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true },
    });

    res.status(200).json({ code: 0, message: '已标记为已读', data: null });
  } catch (error) {
    console.error('Read notification error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.put('/read-all', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const userId = authHeader.split(' ')[1];

    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });

    res.status(200).json({ code: 0, message: '全部已读', data: null });
  } catch (error) {
    console.error('Read all notifications error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

export default router;
