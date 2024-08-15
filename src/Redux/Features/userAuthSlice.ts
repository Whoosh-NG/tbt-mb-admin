import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../Stores/store';

interface UserAuthState {
  authUser: {
    userId: string;
    userEmail: string;
    userName: string;
    userRole: string;
  };

  isLoggedIn: boolean;
  isLoginVerified: boolean;
}

const initialState: UserAuthState = {
  authUser: {
    userId: '',
    userEmail: '',
    userName: '',
    userRole: '',
  },

  isLoggedIn: false,
  isLoginVerified: false,
};

export const userAuthSlice = createSlice({
  name: 'userDatas',
  initialState: initialState,

  reducers: {
    userAuthData: (state, action) => {
      state.authUser = action.payload;
      state.isLoggedIn = true;
    },

    verifyLogins: (state, action) => {
      state.isLoginVerified = action.payload;
    },
  },
});

export const { userAuthData, verifyLogins } = userAuthSlice.actions;

export const selectUserData = (state: RootState) => state.userAuthSlice;

export default userAuthSlice.reducer;
