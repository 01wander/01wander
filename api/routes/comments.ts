import { Router, type Request, type Response } from 'express';
import prisma from '../../prisma/client.js';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId, page = 1, limit = 20 } = req.query;

    if (!postId) {
      res.status(400).json({ code: 400, message: '缺少帖子ID', data: null });
      return;
    }

    const comments = await prisma.communityComment.findMany({
      where: {
        postId: String(postId),
        parentId: null,
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(String(limit)),
      skip: (parseInt(String(page)) - 1) * parseInt(String(limit)),
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
          },
        },
        replies: {
          orderBy: { createdAt: 'asc' },
          include: {
            user: {
              select: {
                id: true,
                nickname: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      code: 0,
      message: 'success',
      data: comments,
    });
  } catch (error) {
    console.error('Get comments error:', error);
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
    const { postId, parentId, content } = req.body;

    if (!postId || !content) {
      res.status(400).json({ code: 400, message: '参数不完整', data: null });
      return;
    }

    const comment = await prisma.communityComment.create({
      data: {
        userId,
        postId,
        parentId,
        content,
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
          },
        },
      },
    });

    await prisma.communityPost.update({
      where: { id: postId },
      data: { comments: { increment: 1 } },
    });

    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
      select: { userId: true },
    });

    if (post && post.userId !== userId) {
      await prisma.notification.create({
        data: {
          userId: post.userId,
          type: 'comment',
          title: '收到新评论',
          content: `有人评论了你的帖子: ${content.substring(0, 50)}...`,
          data: { postId, commentId: comment.id, userId },
        },
      });
    }

    res.status(201).json({ code: 0, message: '评论成功', data: comment });
  } catch (error) {
    console.error('Create comment error:', error);
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

    const comment = await prisma.communityComment.findUnique({
      where: { id },
    });

    if (!comment) {
      res.status(404).json({ code: 404, message: '评论不存在', data: null });
      return;
    }

    if (comment.userId !== userId) {
      res.status(403).json({ code: 403, message: '无权删除', data: null });
      return;
    }

    await prisma.communityComment.delete({
      where: { id },
    });

    await prisma.communityPost.update({
      where: { id: comment.postId },
      data: { comments: { decrement: 1 } },
    });

    res.status(200).json({ code: 0, message: '删除成功', data: null });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.post('/:id/like', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const userId = authHeader.split(' ')[1];
    const { id } = req.params;

    const comment = await prisma.communityComment.findUnique({
      where: { id },
    });

    if (!comment) {
      res.status(404).json({ code: 404, message: '评论不存在', data: null });
      return;
    }

    comment.likes += 1;

    await prisma.communityComment.update({
      where: { id },
      data: { likes: comment.likes },
    });

    res.status(200).json({ code: 0, message: '点赞成功', data: { likes: comment.likes } });
  } catch (error) {
    console.error('Like comment error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

export default router;
