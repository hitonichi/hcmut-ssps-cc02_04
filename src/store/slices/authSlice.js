import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../actions/authActions';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  // Empty since we mostly use extrareducers
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload };
    },
    removeUser: (state) => {
      return { ...state, user: false };
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
