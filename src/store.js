    import { configureStore } from '@reduxjs/toolkit';
    import selectReducer from './features/select';
    import createSagaMiddleware from 'redux-saga';
    import rootSaga from './sagas';
    import rootReducer from './rootReducer';

    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
    });

    sagaMiddleware.run(rootSaga);

    export { store };