import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import recipeRoutes from './routes/recipes.js';
import progressRoutes from './routes/progress.js';
import communityRoutes from './routes/community.js';

dotenv.config();

const app: express.Application = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/community', communityRoutes);

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
