import { createSlice } from '@reduxjs/toolkit';
import { Store } from '../../types';

    export const select = createSlice({
      name: 'select',
      initialState: {
        options: [],
        saveStatusMsg: '',
        selectedOption: '',
      },
      reducers: {
        getAllOptions: (state: Store, action: any) => {
          state.options = action.payload;
        },
        getAllOptionsAsync: (state: Store) => {},
        sendOption: (state, action) => {
          state.saveStatusMsg = action.payload.message;
        },
        sendOptionAsync: (state: Store) => {},
        setSelectedOption: (state: Store, action) => {
          state.selectedOption = action.payload;
        }
      },
    });

    export const { getAllOptions, sendOption, getAllOptionsAsync, sendOptionAsync, setSelectedOption } = select.actions;
    export default select.reducer;