import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    searchJobByText: '',
    appliedJobs: [],
    searchedQuery: '',
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },
  },
});

export const { setAllJobs, setAllAdminJobs, setSearchJobByText, setSearchedQuery , setAppliedJobs} =
  jobSlice.actions;
export default jobSlice.reducer;
