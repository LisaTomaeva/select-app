    import { createSlice } from '@reduxjs/toolkit';

    export const select = createSlice({
      name: 'select',
      initialState: {
        options: [],
      },
      reducers: {
        getAllOptions: (state, action) => {
          console.log('get options triggered');
          console.log(action.payload);
          state.options = action.payload;
        },
        getAllOptionsAsync: (state) => {
        },
        sendOption: (state) => {
        },
      },
    });

    export const { getAllOptions, sendOption, getAllOptionsAsync } = select.actions;
    export default select.reducer;