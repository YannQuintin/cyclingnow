import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  post: [],
};

export const authSlice = createSlice({
  // createSlice is a function that takes an object as an argument
  name: "auth", // name of the slice
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    }, // reducer function
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token; // set the user and token to the action payload user and token
    },
    setLogout: (state) => {
      state.user = null; // set the user and token to null
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error(
          "No user friend not found: index.js setFriends within state folder"
        );
      }
    }, // reducers object
    setPosts: (state, action) => {
      state.post = action.payload.posts; // set the posts to the action payload posts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        // map through the posts
        if (post._id === action.payload.post._id) return action.payload.post; // if the post id is the same as the action payload post id, return the action payload post
        return post; // if the post id is not the same as the action payload post id, return the post
      });
      state.posts = updatedPosts; // set the posts to the updated posts
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
