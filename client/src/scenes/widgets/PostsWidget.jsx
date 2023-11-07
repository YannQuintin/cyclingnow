import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";


// Post widget is doing 2 things:
// 1: on the home page it is going to grab all the posts from all users (Check into Server / Routes / posts.js) CF. router.get("/", verifyToken, getFeedPosts);
// 2: on the profile page, it is going to look at a specific user's posts (Check into Server / Routes / posts.js) CF. router.get("/:userId/posts", verifyToken, getUserPosts);
const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  // Assuming posts are already present in the state and have a `createdAt` field
  const posts = useSelector((state) => state.posts || []);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const endpoint = isProfile ? `http://localhost:3001/posts/${userId}/posts` : "http://localhost:3001/posts";
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // Sort posts by `createdAt` in descending order
    const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    dispatch(setPosts({ posts: sortedData }));
  };

  useEffect(() => {
    getPosts();
  }, [userId, isProfile]); // eslint-disable-line react-hooks/exhaustive-deps 
  // We add `userId` and `isProfile` to the dependency array to refetch posts when they change

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          createdAt // Assuming this field is present
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            createdAt={createdAt} // You can pass this to the PostWidget if needed
          />
        )
      )}
    </>
  );
};

export default PostsWidget;


// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "state";
// import PostWidget from "./PostWidget";


// // Post widget is doing 2 things:
// // 1: on the home page it is going to grab all the posts from all users (Check into Server / Routes / posts.js) CF. router.get("/", verifyToken, getFeedPosts);
// // 2: on the profile page, it is going to look at a specific user's posts (Check into Server / Routes / posts.js) CF. router.get("/:userId/posts", verifyToken, getUserPosts);
// const PostsWidget = ({ userId, isProfile = false }) => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts || []);
//   const token = useSelector((state) => state.token);

//   const getPosts = async () => {
//     const response = await fetch("http://localhost:3001/posts", {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     dispatch(setPosts({ posts: data }));
//   };

//   const getUserPosts = async () => {
//     const response = await fetch(
//       `http://localhost:3001/posts/${userId}/posts`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     const data = await response.json();
//     dispatch(setPosts({ posts: data }));
//   };

//   useEffect(() => {
//     if (isProfile) {
//       getUserPosts();
//     } else {
//       getPosts();
//     }
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <>
//       {posts.map(
//         ({
//           _id,
//           userId,
//           firstName,
//           lastName,
//           description,
//           location,
//           picturePath,
//           userPicturePath,
//           likes,
//           comments,
//         }) => (
//           <PostWidget
//             key={_id}
//             postId={_id}
//             postUserId={userId}
//             name={`${firstName} ${lastName}`}
//             description={description}
//             location={location}
//             picturePath={picturePath}
//             userPicturePath={userPicturePath}
//             likes={likes}
//             comments={comments}
//           />
//         )
//       )}
//     </>
//   );
// };

// export default PostsWidget;