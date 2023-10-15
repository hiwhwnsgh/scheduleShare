import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    loginId: null,
    nickname: null,
    role: null,
};
const userData = {};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const dataItems = action.payload.split('\n');
            dataItems.forEach(item => {
                const [key, value] = item.split(':').map(item => item.trim());
                userData[key] = value;
            });
            const { userId,loginId, nickname, role } = userData;
            state.userId = userId;
            state.loginId = loginId;
            state.nickname = nickname;
            state.role = role;
        },
        clearUser: (state) => {
        state.userId = null;
        state.loginId = null;
        state.nickname = null;
        state.role = null;
        },
    },
}

)
export const { setUser, clearUser } = userSlice.actions;
export const selectUserInfo = (state) => {
    return {
      loginId: state.user.loginId,
      nickname: state.user.nickname,
      role: state.user.role,
    };
};
export default userSlice.reducer;
