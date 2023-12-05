import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/auth.service';

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  try {
    const data = await authService.fetchUser();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
});
