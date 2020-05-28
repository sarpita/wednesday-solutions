import { put, call, takeLatest } from 'redux-saga/effects';
import { getCollection } from '@services/repoApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_ITUNE_COLLECTION  } = homeContainerTypes;
const { successGetItuneCollection, failureGetItuneCollection } = homeContainerCreators;
export function* getItuneCollection(action) {
  const response = yield call(getCollection, action.itunecollectionName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItuneCollection(data));
  } else {
    yield put(failureGetItuneCollection(data));
  }
}
// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNE_COLLECTION, getItuneCollection);
}
