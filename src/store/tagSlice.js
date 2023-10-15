// tagsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
  name: "tags",
  initialState: [],
  reducers: {
    addTag: (state, action) => {
      const tag = action.payload;
      if (!state.includes(tag)) {
        state.push(tag);
      }
    },
    removeTag: (state, action) => {
      const tagToRemove = action.payload;
      return state.filter((tag) => tag !== tagToRemove);
    },
    clearTags: (state) => {
      // 태그 필드를 초기화하는 액션 및 리듀서 추가
      return [];
    },
  },
});

export const { addTag, removeTag, clearTags } = tagsSlice.actions;

export default tagsSlice.reducer;
