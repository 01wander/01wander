import { Router, type Request, type Response } from 'express';

const router = Router();

const cookingSessions: Map<string, any> = new Map();
const completedRecipes: Map<string, any[]> = new Map();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const token = authHeader.split(' ')[1];
    const userId = token;

    const userCompleted = completedRecipes.get(userId) || [];
    const inProgress = cookingSessions.get(userId);

    res.status(200).json({
      code: 0,
      message: 'success',
      data: {
        completedRecipes: userCompleted,
        inProgressRecipe: inProgress || null,
        statistics: {
          totalCooked: userCompleted.length,
          streak: userCompleted.length > 0 ? Math.min(userCompleted.length, 7) : 0,
          favoriteCuisine: '中餐',
          heatmap: [],
        },
      },
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.post('/cook/:recipeId', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const { recipeId } = req.params;
    const token = authHeader.split(' ')[1];
    const userId = token;

    const session = {
      recipeId,
      currentStep: 1,
      startedAt: new Date().toISOString(),
      completedSteps: [],
    };

    cookingSessions.set(userId, session);

    res.status(201).json({ code: 0, message: '开始烹饪成功', data: session });
  } catch (error) {
    console.error('Start cooking error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.put('/step/:stepNumber', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const { stepNumber } = req.params;
    const token = authHeader.split(' ')[1];
    const userId = token;

    const session = cookingSessions.get(userId);
    if (session) {
      if (!session.completedSteps.includes(parseInt(stepNumber))) {
        session.completedSteps.push(parseInt(stepNumber));
      }
      session.currentStep = parseInt(stepNumber) + 1;
      cookingSessions.set(userId, session);
    }

    res.status(200).json({ code: 0, message: '步骤已标记完成', data: session });
  } catch (error) {
    console.error('Complete step error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.post('/complete/:recipeId', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const { recipeId } = req.params;
    const { rating, photoUrl } = req.body;
    const token = authHeader.split(' ')[1];
    const userId = token;

    const session = cookingSessions.get(userId);
    if (session) {
      const completed = {
        recipeId,
        recipeName: '未知食谱',
        completedAt: new Date().toISOString(),
        rating,
        photoUrl,
      };

      const userCompleted = completedRecipes.get(userId) || [];
      userCompleted.push(completed);
      completedRecipes.set(userId, userCompleted);

      cookingSessions.delete(userId);
    }

    res.status(200).json({ code: 0, message: '烹饪完成', data: null });
  } catch (error) {
    console.error('Complete cooking error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

export default router;
