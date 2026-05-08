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

    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(String(page));
    const limitNum = parseInt(String(limit));
    const start = (pageNum - 1) * limitNum;

    const favorites = await prisma.favorite.findMany({
      skip: start,
      take: limitNum,
      orderBy: { createdAt: 'desc' },
      include: {
        recipe: {
          select: {
            id: true,
            name: true,
            nameEn: true,
            difficulty: true,
            cuisine: true,
            cookTime: true,
            images: true,
            description: true,
          },
        },
      },
    });

    res.status(200).json({
      code: 0,
      message: 'success',
      data: {
        data: favorites.map((f) => f.recipe),
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: favorites.length,
          pages: Math.ceil(favorites.length / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.post('/:recipeId', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const { recipeId } = req.params;
    const userId = authHeader.split(' ')[1];

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: { userId, recipeId },
      },
    });

    if (existing) {
      await prisma.favorite.delete({
        where: { id: existing.id },
      });

      await prisma.recipe.update({
        where: { id: recipeId },
        data: { favoriteCount: { decrement: 1 } },
      });

      res.status(200).json({ code: 0, message: '已取消收藏', data: null });
    } else {
      await prisma.favorite.create({
        data: { userId, recipeId },
      });

      await prisma.recipe.update({
        where: { id: recipeId },
        data: { favoriteCount: { increment: 1 } },
      });

      res.status(201).json({ code: 0, message: '收藏成功', data: null });
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.get('/check/:recipeId', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const { recipeId } = req.params;
    const userId = authHeader.split(' ')[1];

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: { userId, recipeId },
      },
    });

    res.status(200).json({
      code: 0,
      message: 'success',
      data: { isFavorited: !!favorite },
    });
  } catch (error) {
    console.error('Check favorite error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

export default router;
