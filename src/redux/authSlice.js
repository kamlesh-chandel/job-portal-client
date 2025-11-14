import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null
  },
  reducers: {
    setloading: (state, action) => {
      state.loading = action.payload
    },
    setAuthUser: (state, action) => {
        state.user = action.payload;
    }
  },
})

export const { setloading, setAuthUser   } = authSlice.actions

export default authSlice.reducer