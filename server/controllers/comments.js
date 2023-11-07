
import Comment from '../models/comment.js';
import Post from '../models/Post.js';

//* CREATE COMMENT endpoint */
export const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const comment = new Comment({ content, post: postId });
    await comment.save();
    post.comments.push(comment._id);
    await post.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//* READ endpoint - GET COMMENTS FOR POST */
export const getCommentsForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post.comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//* UPDATE COMMENT endpoint */
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//* DELETE COMMENT */
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    const post = await Post.findById(comment.post);
    post.comments.pull(comment._id);
    await post.save();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};