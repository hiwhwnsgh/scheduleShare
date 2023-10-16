// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAction: null, 
};

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    check: (state, action) => {
      state.isAction = action.payload; // 로그인 토큰 저장
    },
    unCheck: (state) => {
      state.isAction = null; // 로그아웃 시 토큰 삭제
    },
  },
});

export const { check, unCheck } = writeSlice.actions;

export default writeSlice.reducer;
