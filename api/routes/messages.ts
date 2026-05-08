import { Router, type Request, type Response } from 'express';
import prisma from '../../prisma/client.js';

const router = Router();

router.get('/conversations', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const userId = authHeader.split(' ')[1];

    const sentMessages = await prisma.message.findMany({
      where: { senderId: userId },
      select: { receiverId: true },
    });

    const receivedMessages = await prisma.message.findMany({
      where: { receiverId: userId },
      select: { senderId: true },
    });

    const userIds = new Set([
      ...sentMessages.map((m) => m.receiverId),
      ...receivedMessages.map((m) => m.senderId),
    ]);

    const conversations = await Promise.all(
      Array.from(userIds).map(async (otherUserId) => {
        const lastMessage = await prisma.message.findFirst({
          where: {
            OR: [
              { senderId: userId, receiverId: otherUserId },
              { senderId: otherUserId, receiverId: userId },
            ],
          },
          orderBy: { createdAt: 'desc' },
        });

        const unreadCount = await prisma.message.count({
          where: {
            senderId: otherUserId,
            receiverId: userId,
            isRead: false,
          },
        });

        const otherUser = await prisma.user.findUnique({
          where: { id: otherUserId },
          select: {
            id: true,
            nickname: true,
            avatar: true,
          },
        });

        return {
          user: otherUser,
          lastMessage,
          unreadCount,
        };
      })
    );

    conversations.sort((a, b) => {
      if (!a.lastMessage || !b.lastMessage) return 0;
      return new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime();
    });

    res.status(200).json({
      code: 0,
      message: 'success',
      data: conversations,
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.get('/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const userId = authHeader.split(' ')[1];
    const { userId: otherUserId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      },
      orderBy: { createdAt: 'asc' },
      take: parseInt(String(limit)),
      skip: (parseInt(String(page)) - 1) * parseInt(String(limit)),
    });

    await prisma.message.updateMany({
      where: {
        senderId: otherUserId,
        receiverId: userId,
        isRead: false,
      },
      data: { isRead: true },
    });

    const otherUser = await prisma.user.findUnique({
      where: { id: otherUserId },
      select: {
        id: true,
        nickname: true,
        avatar: true,
      },
    });

    res.status(200).json({
      code: 0,
      message: 'success',
      data: {
        user: otherUser,
        messages,
      },
    });
  } catch (error) {
    console.error('Get messages error:', error);
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

    const senderId = authHeader.split(' ')[1];
    const { receiverId, content, type = 'text' } = req.body;

    if (!receiverId || !content) {
      res.status(400).json({ code: 400, message: '参数不完整', data: null });
      return;
    }

    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
        type,
      },
    });

    await prisma.notification.create({
      data: {
        userId: receiverId,
        type: 'message',
        title: '收到新私信',
        content: '您收到了一条新私信',
        data: { messageId: message.id, senderId },
      },
    });

    res.status(201).json({ code: 0, message: '发送成功', data: message });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.put('/:id/read', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const userId = authHeader.split(' ')[1];
    const { id } = req.params;

    await prisma.message.updateMany({
      where: {
        id,
        receiverId: userId,
      },
      data: { isRead: true },
    });

    res.status(200).json({ code: 0, message: '已标记已读', data: null });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

export default router;
