// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload; // 로그인 토큰 저장
    },
    logout: (state) => {
      state.token = null; // 로그아웃 시 토큰 삭제
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
