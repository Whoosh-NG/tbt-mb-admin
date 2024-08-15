import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../Stores/store';

interface GlobalState {
  count: number;
  searchQuery: string;
  withdrawalMethod: string;
  pageName: string;
  // Allow any property with boolean, number, or string type
  [key: string]: boolean | number | string;
}

const initialState: GlobalState = {
  count: 0,
  searchQuery: '',
  withdrawalMethod: '',
  pageName: '',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,

  reducers: {
    toggleShow: (state, action: PayloadAction<string | number>) => {
      // Toggle icon state based on the IDs
      const id = action.payload;
      return {
        ...state,
        [id]: !state[id],
      };
    },

    increment: (state, action) => {
      state.count = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    updateWithdrawalMethod: (state, action) => {
      state.withdrawalMethod = action.payload;
    },

    updatePageName: (state, action: PayloadAction<string>) => {
      state.pageName = action.payload;
    },
  },
});

export const {
  toggleShow,
  increment,
  setSearchQuery,
  updateWithdrawalMethod,
  updatePageName,
} = globalSlice.actions;

export const selectGlobal = (state: RootState) => state.globalSlice;
export const selectSearch = (state: RootState) => state.globalSlice.searchQuery;
export const selectWithdrawalMethod = (state: RootState) =>
  state.globalSlice.withdrawalMethod;
export const selectPageName = (state: RootState) => state.globalSlice.pageName;

export default globalSlice.reducer;
