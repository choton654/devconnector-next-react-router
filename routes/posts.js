const router = require('express').Router();
const Post = require('../models/Post');
const Profile = require('../models/Profile');
const { authUser } = require('../utils/authUser');
const { validatePostInput } = require('../utils/validators');

// like single post
router.post('/like/:postId', authUser, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });

    if (!post) {
      return res.status(400).json({ error: 'no post found' });
    } else {
      const likedpost = post.likes.find(
        (like) => like.user.toString() === req.user.id,
      );
      if (likedpost) {
        return res.status(400).json({ msg: 'already liked post' });
      } else {
        post.likes.push({ user: req.user.id });
        await post.save();
      }
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Post not found' });
  }
});

// unlike single post
router.post('/unlike/:postId', authUser, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });

    if (!post) {
      return res.status(400).json({ error: 'no post found' });
    } else {
      const unlikedpost = post.likes.filter(
        (like) => like.user.toString() === req.user.id,
      );
      if (unlikedpost.length === 0) {
        return res.status(400).json({ msg: 'You have not like this post' });
      } else {
        const removeindex = post.likes
          .map((like) => like.user.toString())
          .indexOf(req.user.id);

        post.likes.splice(removeindex, 1);
        await post.save();
      }
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Post not found' });
  }
});

// delete comment from single post
router.delete('/comment/:postId/:commentId', authUser, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });

    if (!post) {
      return res.status(400).json({ error: 'no post found' });
    } else {
      if (
        post.comments.filter(
          (comment) => comment._id.toString() === req.params.commentId,
        ).length === 0
      ) {
        return res.status(400).json({ msg: 'Comment does not exists' });
      }
      const removeindex = post.comments
        .map((comment) => comment._id.toString())
        .indexOf(req.params.commentId);

      post.comments.splice(removeindex, 1);
      await post.save();
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Post not found' });
  }
});

//  comment on single post
router.post('/comment/:postId', authUser, async (req, res) => {
  try {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const post = await Post.findOne({ _id: req.params.postId });

    if (!post) {
      return res.status(400).json({ error: 'no post found' });
    } else {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Post not found' });
  }
});

// get single post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });

    if (!post) {
      return res.status(400).json({ error: 'no post found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Post not found' });
  }
});

// delete single post
router.delete('/:postId', authUser, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });

    // const profile = await Profile.findOne({ user: req.user.id });
    // if (!profile) {
    //   return res.status(400).json({ error: 'No profile found' });
    // } else {
    // }
    if (post.user.toString() !== req.user.id) {
      return res.status(400).json({ notauthorize: 'User not authorize' });
    } else {
      await post.remove();
    }

    res.status(200).json({ msg: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Post not found' });
  }
});

// get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Posts not found' });
  }
});

// create a post
router.post('/', authUser, async (req, res) => {
  try {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = await new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    }).save();

    res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
