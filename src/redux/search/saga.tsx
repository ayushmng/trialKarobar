import {
  all,
  call,
  fork,
  put,
  StrictEffect,
  takeEvery,
} from 'redux-saga/effects';
import {getSearchContentApi, getSearchContentMetaApi} from './api';

import {SEARCH_CONTENT, SEARCH_CONTENT_META} from './constant';
import {
  getSearchContentSuccess,
  getSearchContentFailed,
  getSearchContent,
  getSearchContentMeta,
  getSearchContentMetaSuccess,
  getSearchContentMetaFailed,
} from './action';

function* handleGetSearchContent({
  payload,
}: ReturnType<typeof getSearchContent>): Generator<StrictEffect, void, any> {
  const {page, term, date, category} = payload as {
    page: number;
    term: string;
    date: string;
    category: string;
  };
  try {
    const data = yield call(() =>
      getSearchContentApi({page, term, date, category}),
    );

    yield put(getSearchContentSuccess(data));
  } catch (error) {
    yield put(getSearchContentFailed(error));
  }
}

function* watchGetSearchContent() {
  yield takeEvery(SEARCH_CONTENT, handleGetSearchContent);
}

function* handleGetSearchContentMeta({
  payload,
}: ReturnType<typeof getSearchContentMeta>): Generator<
  StrictEffect,
  void,
  any
> {
  try {
    const data = yield call(() => getSearchContentMetaApi());
    yield put(getSearchContentMetaSuccess(data));
  } catch (error) {
    yield put(getSearchContentMetaFailed(error));
  }
}

function* watchGetSearchContentMeta() {
  yield takeEvery(SEARCH_CONTENT_META, handleGetSearchContentMeta);
}

export default function* rootSaga(): Generator<StrictEffect> {
  yield all([fork(watchGetSearchContent), fork(watchGetSearchContentMeta)]);
}
