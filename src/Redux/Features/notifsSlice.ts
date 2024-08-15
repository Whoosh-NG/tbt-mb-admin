import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../Stores/store';

const notifsSlice = createSlice({
  name: 'notifsSlice',
  initialState: {
    notifs: [],
  },

  reducers: {
    getNotifs: (state, action) => {
      state.notifs = action.payload;
    },
  },
});

export const { getNotifs } = notifsSlice.actions;
export const selectNotifs = (state: RootState) => state.notifsSlice.notifs;

export default notifsSlice.reducer;
