import Post from "../models/Post.js";
import User from "../models/User.js";

//* CREATE endpoint */

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find(); // GRABBING
    res.status(201).json(post); // THE NEWSFEED
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}; // handles the function we created in Index.js file

//* READ endpoints */

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }); //* here were are re-using the get Posts for all users and limiting it to a single user's posts
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//* UPDATE endpoints */

export const likePost = async (req, res) => {
  try {
    const { id } = req.params; //* grab relevant post
    const { userId } = req.body; //* grab relevant user
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId); //* we're checking if the userId exists, if it does, it means the post has been like by current user.

    if (isLiked) {
      //* this if else statement deletes if it already exists, and sets it if it does not.
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      //* update the post and passing or removing the like
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
