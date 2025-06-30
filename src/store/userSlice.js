import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,  // Store the entire decoded token
  avatarUrl: '', // Keep avatarUrl separate since it comes from the API response
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { token, avatarUrl } = action.payload;
      state.token = token;
      state.avatarUrl = avatarUrl;
    },
    clearUserInfo: (state) => {
      state.token = null;
      state.avatarUrl = '';
    },
  },
});

// Selectors for commonly used token fields
export const selectUserFullName = (state) => state.user.token?.name || '';
export const selectUserFirstName = (state) => state.user.token?.name?.split(' ')[0] || '';
export const selectUserLastName = (state) => {
  const nameParts = state.user.token?.name?.split(' ') || [];
  return nameParts[nameParts.length - 1] || '';
};
export const selectUserEmail = (state) => state.user.token?.email || '';
export const selectUserRoles = (state) => state.user.token?.roles || [];
export const selectUserAccountId = (state) => state.user.token?.acc || '';
export const selectUserAvatarUrl = (state) => state.user.avatarUrl;

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;