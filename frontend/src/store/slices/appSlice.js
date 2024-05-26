import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  blogsUpdated: 0,
  user: {},
  blogs: [],
  mode: "dark",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setBlogsUpdated: (state, action) => {
      state.blogsUpdated = state.blogsUpdated + 1;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {
  setIsAuthenticated,
  setUser,
  setBlogs,
  setMode,
  setBlogsUpdated,
} = appSlice.actions;

export default appSlice.reducer;
