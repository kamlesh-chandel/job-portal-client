import { createSlice } from '@reduxjs/toolkit';

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: {
    bookmarkJobs: { items: [] },
  },
  reducers: {
    setBookmarkJobs: (state, action) => {
      state.bookmarkJobs = action.payload; 
    },
    addBookmark: (state, action) => {
      state.bookmarkJobs.items.push(action.payload);
    },
    removeBookmarkById: (state, action) => {
      state.bookmarkJobs.items = state.bookmarkJobs.items.filter(
        b => b.id !== action.payload
      );
    },
  },
});


export const { setBookmarkJobs, addBookmark, removeBookmarkById } =
  bookmarkSlice.actions;

export default bookmarkSlice.reducer;
