import { Router, type Request, type Response } from 'express';

const router = Router();

const posts = [
  {
    id: 'post-001',
    userId: 'user-001',
    userName: '美食达人',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    content: '今天尝试做了红烧肉，味道超棒！推荐给大家试试～',
    images: ['https://picsum.photos/400/300?random=1'],
    likes: 128,
    comments: 32,
    liked: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'post-002',
    userId: 'user-002',
    userName: '吃货小王',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
    content: '周末做了披萨，卖相还不错吧？',
    images: ['https://picsum.photos/400/300?random=2'],
    likes: 89,
    comments: 15,
    liked: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'post-003',
    userId: 'user-001',
    userName: '美食达人',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    content: '第一次尝试做日式味噌汤，成功！🥣',
    images: ['https://picsum.photos/400/300?random=3'],
    likes: 256,
    comments: 45,
    liked: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

router.get('/posts', async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(String(page));
    const limitNum = parseInt(String(limit));
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;

    res.status(200).json({
      code: 0,
      message: 'success',
      data: {
        data: posts.slice(start, end),
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: posts.length,
          pages: Math.ceil(posts.length / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.post('/posts', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ code: 401, message: '未登录', data: null });
      return;
    }

    const { content, images, recipeId } = req.body;

    const newPost = {
      id: `post-${Date.now()}`,
      userId: 'current-user',
      userName: '当前用户',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
      content,
      images: images || [],
      likes: 0,
      comments: 0,
      liked: false,
      createdAt: new Date().toISOString(),
    };

    posts.unshift(newPost);

    res.status(201).json({ code: 0, message: '发布成功', data: newPost });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

router.post('/posts/:id/like', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);

    if (!post) {
      res.status(404).json({ code: 404, message: '帖子不存在', data: null });
      return;
    }

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    res.status(200).json({ code: 0, message: post.liked ? '点赞成功' : '取消点赞', data: null });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

export default router;
