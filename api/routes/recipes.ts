import { Router, type Request, type Response } from 'express';
import { mockRecipes } from '../../src/data/mockData.js';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, cuisine, difficulty, search } = req.query;

    let filtered = [...mockRecipes];

    if (cuisine) {
      filtered = filtered.filter((r) => r.cuisine === cuisine);
    }

    if (difficulty) {
      filtered = filtered.filter((r) => r.difficulty === difficulty);
    }

    if (search) {
      const searchLower = String(search).toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchLower) ||
          r.nameEn.toLowerCase().includes(searchLower) ||
          r.description.toLowerCase().includes(searchLower)
      );
    }

    const pageNum = parseInt(String(page));
    const limitNum = parseInt(String(limit));
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;

    const data = filtered.slice(start, end);

    res.status(200).json({
      code: 0,
      message: 'success',
      data: {
        data,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: filtered.length,
          pages: Math.ceil(filtered.length / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Get recipes error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const recipe = mockRecipes.find((r) => r._id === id);

    if (!recipe) {
      res.status(404).json({ code: 404, message: '食谱不存在', data: null });
      return;
    }

    res.status(200).json({ code: 0, message: 'success', data: recipe });
  } catch (error) {
    console.error('Get recipe detail error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

export default router;
