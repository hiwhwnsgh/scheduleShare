// src/store/reducers.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contentInputValue: '', // input 상태를 저장할 필드 추가
  titleInputValue: '', // titleinput 상태를 저장할 필드 추가

};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setContentInputValue: (state, action) => {
      state.contentInputValue = action.payload; // 입력값으로 상태 업데이트
    },
    setTitleInputValue: (state, action) => {
        state.titleInputValue = action.payload; // titleinput 상태 업데이트
    }
  },
  
});

export const { setContentInputValue, setTitleInputValue } = inputSlice.actions;
export default inputSlice.reducer;
