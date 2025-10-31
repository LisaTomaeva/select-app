    import { createSlice } from '@reduxjs/toolkit';

    export const select = createSlice({
      name: 'counter',
      initialState: {
        options: [],
      },
      reducers: {
        getAllOptions: (state) => {
          console.log('get options triggered');
        },
        sendOption: (state) => {
        },
      },
    });

    export const { getAllOptions, sendOption } = select.actions;
    export default select.reducer;