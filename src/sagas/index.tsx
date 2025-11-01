    import { takeEvery, put, delay } from 'redux-saga/effects';
    import { getAllOptions, sendOption } from '../features/select';
import { Action } from 'redux-saga';

    function* getOptionsAsyncSaga(): any {
      const response = yield fetch('http://localhost:3001/options/for/select');
      const jsonData = yield response.json();
      yield put({type: 'select/getAllOptions', payload: jsonData});
      console.log('23123123123')
      return jsonData;
    }

    function* saveOptionAsyncSaga(action: any): any {
      const { payload } = action;
      console.log('VAL', payload, action);
      const response = yield fetch('http://localhost:3001/selected/option', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: payload
        }),
      });
      
      const jsonData = yield response.json();
      yield put({type: 'select/sendOption', payload: jsonData});
      return jsonData;
    }

    function* rootSaga() {
      yield takeEvery('select/getAllOptionsAsync', getOptionsAsyncSaga);
      yield takeEvery('select/sendOptionAsync', saveOptionAsyncSaga);
    }

    export default rootSaga;