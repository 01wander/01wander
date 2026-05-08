import { Router, type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/client.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface AuthRequest extends Request {
  userId?: string;
}

router.post('/register', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, phone, password, nickname } = req.body;

    if (!email || !password || !nickname) {
      res.status(400).json({ code: 400, message: '缺少必填字段', data: null });
      return;
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, ...(phone ? [{ phone }] : [])],
      },
    });

    if (existingUser) {
      res.status(400).json({ code: 400, message: '用户已存在', data: null });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        phone,
        passwordHash,
        nickname,
        title: '厨房小白',
        level: 1,
        exp: 0,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      code: 0,
      message: '注册成功',
      data: {
        user: {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          avatar: user.avatar,
          level: user.level,
          exp: user.exp,
          title: user.title,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.post('/login', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, phone, password } = req.body;

    if (!password || (!email && !phone)) {
      res.status(400).json({ code: 400, message: '缺少必填字段', data: null });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { OR: [{ email: email || '' }, { phone: phone || '' }] },
    });

    if (!user || !user.passwordHash) {
      res.status(401).json({ code: 401, message: '用户不存在', data: null });
      return;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      res.status(401).json({ code: 401, message: '密码错误', data: null });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      code: 0,
      message: '登录成功',
      data: {
        user: {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          avatar: user.avatar,
          level: user.level,
          exp: user.exp,
          title: user.title,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.post('/logout', async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({ code: 0, message: '退出成功', data: null });
});

router.get('/profile', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        nickname: true,
        avatar: true,
        level: true,
        exp: true,
        title: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ code: 404, message: '用户不存在', data: null });
      return;
    }

    res.status(200).json({ code: 0, message: 'success', data: user });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

export default router;
