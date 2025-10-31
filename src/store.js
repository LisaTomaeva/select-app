    import { configureStore } from '@reduxjs/toolkit';
    import selectReducer from './features/select';

    export const store = configureStore({
      reducer: {
        select: selectReducer,
      },
    });