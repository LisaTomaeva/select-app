    import { takeEvery, put, delay } from 'redux-saga/effects';
    import { getAllOptions, sendOption } from '../features/select';

    function* getOptionsAsyncSaga(): any {
      const response = yield fetch('http://localhost:3001/selectList');
      const jsonData = yield response.json();
      yield put({type: 'select/getAllOptions', payload: jsonData});
      console.log('23123123123')
      return jsonData;
    }

    function* rootSaga() {
      yield takeEvery('select/getAllOptionsAsync', getOptionsAsyncSaga);
    }

    export default rootSaga;