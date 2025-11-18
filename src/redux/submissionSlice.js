import { createSlice } from '@reduxjs/toolkit';

const submissionSlice = createSlice({
  name: 'submission',
  initialState: {
    jobSubmissions: [],
  },
  reducers: {
    setJobSubmissions: (state, action) => {
      state.jobSubmissions = action.payload;
    },
  },
});

export const { setJobSubmissions } = submissionSlice.actions;
export default submissionSlice.reducer;
