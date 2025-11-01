import { createSlice } from '@reduxjs/toolkit';
import { SelectState } from '../../types';

    export const select = createSlice({
      name: 'select',
      initialState: {
        options: [],
        saveStatusMsg: '',
        selectedOption: '',
      },
      reducers: {
        getAllOptions: (state: SelectState, action: any) => {
          state.options = action.payload;
        },
        getAllOptionsAsync: (state: SelectState) => {},
        sendOption: (state, action) => {
          state.saveStatusMsg = action.payload.message;
        },
        sendOptionAsync: (state: SelectState) => {},
        setSelectedOption: (state: SelectState, action) => {
          state.selectedOption = action.payload;
        }
      },
    });

    export const { getAllOptions, sendOption, getAllOptionsAsync, sendOptionAsync, setSelectedOption } = select.actions;
    export default select.reducer;