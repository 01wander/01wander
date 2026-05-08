import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import recipeRoutes from './routes/recipes.js';
import favoritesRoutes from './routes/favorites.js';
import progressRoutes from './routes/progress.js';
import communityRoutes from './routes/community.js';
import commentsRoutes from './routes/comments.js';
import badgesRoutes from './routes/badges.js';
import notificationsRoutes from './routes/notifications.js';
import challengesRoutes from './routes/challenges.js';
import searchHistoryRoutes from './routes/searchHistory.js';
import messagesRoutes from './routes/messages.js';
import encyclopediaRoutes from './routes/encyclopedia.js';

dotenv.config();

const app: express.Application = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/badges', badgesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/search-history', searchHistoryRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/encyclopedia', encyclopediaRoutes);

app.use('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ code: 0, message: 'ok', data: null });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', error);
  res.status(500).json({ code: 500, message: '服务器内部错误', data: null });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ code: 404, message: 'API 不存在', data: null });
});

export default app;
