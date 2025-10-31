    import { combineReducers } from 'redux';
    import selectReducer from './features/select';

    const rootReducer = combineReducers({
      select: selectReducer,
    });

    export default rootReducer;