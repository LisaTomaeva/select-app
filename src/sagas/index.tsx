import { takeEvery, put } from 'redux-saga/effects';
import { SELECT_OPTIONS_URL, SEND_OPTION_URL } from '../consts';

function* getOptionsAsyncSaga(): any {
  const response = yield fetch(SELECT_OPTIONS_URL);
  const jsonData = yield response.json();
  yield put({type: 'select/getAllOptions', payload: jsonData});
  return jsonData;
}

function* saveOptionAsyncSaga(action: any): any {
  const { payload } = action;
  try {
    const response = yield fetch(SEND_OPTION_URL, {
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
  } catch (err: any) {
    return err.message;
  }
}      

function* rootSaga() {
  yield takeEvery('select/getAllOptionsAsync', getOptionsAsyncSaga);
  yield takeEvery('select/sendOptionAsync', saveOptionAsyncSaga);
}

export default rootSaga;