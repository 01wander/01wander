import { Router, type Request, type Response } from 'express';
import prisma from '../../prisma/client.js';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const badges = await prisma.badge.findMany({
      orderBy: { createdAt: 'asc' },
    });

    res.status(200).json({
      code: 0,
      message: 'success',
      data: badges,
    });
  } catch (error) {
    console.error('Get badges error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.get('/user', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const userId = authHeader.split(' ')[1];

    const userBadges = await prisma.userBadge.findMany({
      where: { userId },
      include: {
        badge: true,
      },
    });

    const allBadges = await prisma.badge.findMany();
    const earnedIds = new Set(userBadges.map((ub) => ub.badgeId));

    const result = allBadges.map((badge) => {
      const userBadge = userBadges.find((ub) => ub.badgeId === badge.id);
      return {
        ...badge,
        earned: earnedIds.has(badge.id),
        unlockedAt: userBadge?.unlockedAt || null,
        progress: userBadge?.progress || 0,
      };
    });

    res.status(200).json({
      code: 0,
      message: 'success',
      data: result,
    });
  } catch (error) {
    console.error('Get user badges error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

export default router;
