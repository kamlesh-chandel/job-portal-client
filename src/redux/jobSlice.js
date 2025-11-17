import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    allAdminJobs: [],
    searchJobByText: '',
    appliedJobs: [],
    searchedQuery: '',
  },
  reducers: {

    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setAllAdminJobs,
  setSearchJobByText,
  setSearchedQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
