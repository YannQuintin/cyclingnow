import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;

//! BELOW IS THE RESULT OF A PROMPT IN COPILOTE /WORKSPACE TO ADD COMMENTS INTO POST.JS

// import mongoose from "mongoose";
// import Comment from "./Comment.js"; // Assuming Comment.js is in the same directory

// const postSchema = mongoose.Schema(
//   {
//      ... other fields ...
//     comments: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Comment'
//     }],
//   },
//   { timestamps: true }
// );

// const Post = mongoose.model("Post", postSchema);

// export default Post;
