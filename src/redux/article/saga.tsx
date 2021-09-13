import {
  all,
  call,
  fork,
  put,
  StrictEffect,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  getAllArticleApi,
  getAllArticleAuthApi,
  getEachArticleApi,
  getEachAuthArticleApi,
  getFeaturedArticleApi,
} from './api';

import {
  GET_ALL_ARTICAL,
  REFRESH_GET_ALL_ARTICAL,
  GET_EACH_ARTICAL,
  GET_FEATURED_ARTICAL,
} from './constant';
import {
  getAllArticleSuccess,
  getAllArticleFailed,
  getAllArticle,
  getFeaturedArticleSuccess,
  getFeaturedArticleFailed,
  getFeaturedArticle,
  refreshGetAllArticleSuccess,
  refreshGetAllArticleFailed,
  getEachArticle,
  getEachArticleFailed,
  getEachArticleSuccess,
  clearAllArticle,
} from './action';

function* handleGetAllArticle({
  payload,
}: ReturnType<typeof getAllArticle>): Generator<StrictEffect, void, any> {
  const {page, language, loggedIn} = payload;
  try {
    if (page === 1) {
      yield put(clearAllArticle());
    }
    const data = yield call(() =>
      // getAllArticleApi({page, language}),
      loggedIn
        ? getAllArticleAuthApi({page, language})
        : getAllArticleApi({page, language}),
    );

    yield put(getAllArticleSuccess(data));
    console.log(data);
  } catch (error) {
    console.log('error get all article', error);

    yield put(getAllArticleFailed(error));
  }
}

function* watchGetAllArticle() {
  yield takeLatest(GET_ALL_ARTICAL, handleGetAllArticle);
}

function* handleGetFeaturedArticle({
  payload,
}: ReturnType<typeof getFeaturedArticle>): Generator<StrictEffect, void, any> {
  const {language} = payload;
  try {
    const data = yield call(() => getFeaturedArticleApi({language}));
    yield put(getFeaturedArticleSuccess(data));
  } catch (error) {
    yield put(getFeaturedArticleFailed(error));
  }
}

function* watchGetFeaturedArticle() {
  yield takeLatest(GET_FEATURED_ARTICAL, handleGetFeaturedArticle);
}

function* handleGetEachArticle({
  payload,
}: ReturnType<typeof getEachArticle>): Generator<StrictEffect, void, any> {
  const {_id, loggedIn} = payload;
  try {
    const data = yield call(() =>
      loggedIn ? getEachAuthArticleApi({_id}) : getEachArticleApi({_id}),
    );
    yield put(getEachArticleSuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(getEachArticleFailed(error));
  }
}

function* watchGetEachArticle() {
  yield takeEvery(GET_EACH_ARTICAL, handleGetEachArticle);
}

function* handleRefreshGetAllArticle({
  payload,
}: ReturnType<typeof getAllArticle>): Generator<StrictEffect, void, any> {
  const {page, language, loggedIn} = payload;
  try {
    const data = yield call(() =>
      loggedIn
        ? getAllArticleAuthApi({page, language})
        : getAllArticleApi({page, language}),
    );
    yield put(refreshGetAllArticleSuccess(data));
  } catch (error) {
    yield put(refreshGetAllArticleFailed(error));
  }
}

function* watchRefreshGetAllArticle() {
  yield takeLatest(REFRESH_GET_ALL_ARTICAL, handleRefreshGetAllArticle);
}

export default function* rootSaga(): Generator<StrictEffect> {
  yield all([
    fork(watchGetAllArticle),
    fork(watchGetEachArticle),
    fork(watchRefreshGetAllArticle),
    fork(watchGetFeaturedArticle),
  ]);
}
