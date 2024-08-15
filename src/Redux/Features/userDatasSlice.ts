import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../Stores/store';
import { IAdminData } from '@/Interfaces/Admin';

export interface UserDataState {
  admin: IAdminData;
}

const initialState = {
  admin: [] as IAdminData[],
};

const userDatasSlice = createSlice({
  name: 'userDatas',
  initialState,
  reducers: {
    getAllAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { getAllAdmin } = userDatasSlice.actions;

export const selectAllAdmin = (state: RootState) => state.userDatasSlice.admin;

// export const selectUser = (state) => state.userDatasSlice;

export default userDatasSlice.reducer;
