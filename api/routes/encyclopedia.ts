import { Router, type Request, type Response } from 'express';
import prisma from '../../prisma/client.js';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, language = 'zh' } = req.query;
    const { page = 1, limit = 20 } = req.query;

    const where: any = {};

    if (category) {
      where.category = String(category);
    }

    if (search) {
      const searchLower = String(search).toLowerCase();
      where.OR = [
        { name: { contains: String(search) } },
        { nameEn: { contains: String(search) } },
      ];
    }

    const ingredients = await prisma.ingredientEncyclopedia.findMany({
      where,
      orderBy: { name: 'asc' },
      take: parseInt(String(limit)),
      skip: (parseInt(String(page)) - 1) * parseInt(String(limit)),
    });

    const result = ingredients.map((ing) => ({
      id: ing.id,
      name: language === 'en' ? ing.nameEn : language === 'ja' && ing.nameJa ? ing.nameJa : language === 'ko' && ing.nameKo ? ing.nameKo : ing.name,
      nameEn: ing.nameEn,
      category: ing.category,
      description: language === 'en' ? ing.descriptionEn : ing.description,
      substitutes: ing.substitutes,
      nutrition: ing.nutrition,
      purchaseTips: ing.purchaseTips,
      storageTips: ing.storageTips,
      image: ing.image,
    }));

    res.status(200).json({
      code: 0,
      message: 'success',
      data: result,
    });
  } catch (error) {
    console.error('Get encyclopedia error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { language = 'zh' } = req.query;

    const ingredient = await prisma.ingredientEncyclopedia.findUnique({
      where: { id },
    });

    if (!ingredient) {
      res.status(404).json({ code: 404, message: '食材不存在', data: null });
      return;
    }

    const result = {
      id: ingredient.id,
      name: language === 'en' ? ingredient.nameEn : language === 'ja' && ingredient.nameJa ? ingredient.nameJa : language === 'ko' && ingredient.nameKo ? ingredient.nameKo : ingredient.name,
      nameEn: ingredient.nameEn,
      nameJa: ingredient.nameJa,
      nameKo: ingredient.nameKo,
      category: ingredient.category,
      description: language === 'en' ? ingredient.descriptionEn : ingredient.description,
      substitutes: ingredient.substitutes,
      nutrition: ingredient.nutrition,
      purchaseTips: ingredient.purchaseTips,
      storageTips: ingredient.storageTips,
      image: ingredient.image,
    };

    res.status(200).json({
      code: 0,
      message: 'success',
      data: result,
    });
  } catch (error) {
    console.error('Get ingredient detail error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.get('/categories/list', async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.ingredientEncyclopedia.groupBy({
      by: ['category'],
      _count: { category: true },
    });

    const categoryList = categories.map((c) => ({
      name: c.category,
      count: c._count.category,
    }));

    res.status(200).json({
      code: 0,
      message: 'success',
      data: categoryList,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

export default router;
