import { Router, type Request, type Response } from 'express';
import prisma from '../../prisma/client.js';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { featured, status = 1 } = req.query;

    const where: any = { status: parseInt(String(status)) };
    if (featured === 'true') {
      where.featured = true;
    }

    const challenges = await prisma.challenge.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { startDate: 'desc' }],
    });

    res.status(200).json({
      code: 0,
      message: 'success',
      data: challenges,
    });
  } catch (error) {
    console.error('Get challenges error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: {
        participations: {
          take: 10,
          orderBy: { joinedAt: 'desc' },
          include: {
            user: {
              select: { id: true, nickname: true, avatar: true },
            },
          },
        },
      },
    });

    if (!challenge) {
      res.status(404).json({ code: 404, message: '挑战不存在', data: null });
      return;
    }

    res.status(200).json({
      code: 0,
      message: 'success',
      data: challenge,
    });
  } catch (error) {
    console.error('Get challenge error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.post('/:id/join', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const { id } = req.params;
    const userId = authHeader.split(' ')[1];

    const existing = await prisma.challengeParticipant.findUnique({
      where: {
        challengeId_userId: { challengeId: id, userId },
      },
    });

    if (existing) {
      res.status(400).json({ code: 400, message: '已参与过此挑战', data: null });
      return;
    }

    await prisma.challengeParticipant.create({
      data: {
        challengeId: id,
        userId,
      },
    });

    await prisma.challenge.update({
      where: { id },
      data: { participants: { increment: 1 } },
    });

    res.status(201).json({ code: 0, message: '参与成功', data: null });
  } catch (error) {
    console.error('Join challenge error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

export default router;
