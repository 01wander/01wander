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
    const { limit = 20 } = req.query;

    const history = await prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: parseInt(String(limit)),
      distinct: ['keyword'],
    });

    res.status(200).json({
      code: 0,
      message: 'success',
      data: history,
    });
  } catch (error) {
    console.error('Get search history error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const userId = authHeader.split(' ')[1];
    const { keyword, type = 'recipe' } = req.body;

    if (!keyword || keyword.trim().length === 0) {
      res.status(400).json({ code: 400, message: '关键词不能为空', data: null });
      return;
    }

    const history = await prisma.searchHistory.create({
      data: {
        userId,
        keyword: keyword.trim(),
        type,
      },
    });

    res.status(201).json({ code: 0, message: '搜索记录已保存', data: history });
  } catch (error) {
    console.error('Save search history error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.delete('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const userId = authHeader.split(' ')[1];

    await prisma.searchHistory.deleteMany({
      where: { userId },
    });

    res.status(200).json({ code: 0, message: '搜索记录已清除', data: null });
  } catch (error) {
    console.error('Clear search history error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const userId = authHeader.split(' ')[1];
    const { id } = req.params;

    await prisma.searchHistory.deleteMany({
      where: { id: parseInt(id), userId },
    });

    res.status(200).json({ code: 0, message: '已删除', data: null });
  } catch (error) {
    console.error('Delete search history error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

export default router;
