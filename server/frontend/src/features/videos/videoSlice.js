import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = videoSlice.actions;

export default videoSlice.reducer;