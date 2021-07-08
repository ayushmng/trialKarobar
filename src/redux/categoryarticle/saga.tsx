import {
  all,
  call,
  cancelled,
  fork,
  put,
  StrictEffect,
  // takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  getCategorizedArticleApi,
  // getCategorizedArticleAuthApi,
  getAllCategoryApi,
} from './api';

import {
  GET_CATEGORIZED_ARTICAL,
  GET_ALL_CATEGORY,
  // GET_CATEGORIZED_AUTH_ARTICAL,
} from './constant';
import {
  getCategorizedArticleSuccess,
  getCategorizedArticleFailed,
  getCategorizedArticle,
  getAllCategory,
  getAllCategoryFailed,
  getAllCategorySuccess,
  // getCategorizedAuthArticle,
} from './action';

function* handleGetCategorizedArticle({
  payload,
}: ReturnType<typeof getCategorizedArticle>): Generator<
  StrictEffect,
  void,
  any
> {
  const {page, category, language} = payload;
  try {
    const data = yield call(() =>
      getCategorizedArticleApi({page, category, language}),
    );

    yield put(getCategorizedArticleSuccess(data));
  } catch (error) {
    console.log('error is', error);

    yield put(getCategorizedArticleFailed(error));
  } finally {
    if (yield cancelled()) {
      // the task was cancelled
      console.log('cancelled called by saga');
    }
  }
}

function* watchGetCategorizedArticle() {
  yield takeLatest(GET_CATEGORIZED_ARTICAL, handleGetCategorizedArticle);
}

// function* handleGetCategorizedAuthArticle({
//   payload,
// }: ReturnType<typeof getCategorizedAuthArticle>) {
//   const {page, category, language} = payload;
//   try {
//     const data = yield call(() =>
//       getCategorizedArticleAuthApi({page, category, language}),
//     );
//     yield put(getCategorizedArticleSuccess(data));
//   } catch (error) {
//     console.log('error', error);
//     yield put(getCategorizedArticleFailed(error));
//   } finally {
//     if (yield cancelled()) {
//       // the task was cancelled
//       console.log('cancelled called by saga');
//     }
//   }
// }

// function* watchGetCategorizedAuthArticle() {
//   yield takeLatest(
//     GET_CATEGORIZED_AUTH_ARTICAL,
//     handleGetCategorizedAuthArticle,
//   );
// }

function* handleGetAllCategory({
  payload,
}: ReturnType<typeof getAllCategory>): Generator<StrictEffect, void, any> {
  const {language} = payload;
  try {
    const data = yield call(() => getAllCategoryApi({language}));
    yield put(getAllCategorySuccess(data));
  } catch (error) {
    yield put(getAllCategoryFailed(error));
  }
}

function* watchGetAllCategory() {
  yield takeLatest(GET_ALL_CATEGORY, handleGetAllCategory);
}

export default function* rootSaga(): Generator<StrictEffect> {
  yield all([
    fork(watchGetCategorizedArticle),
    fork(watchGetAllCategory),
    // fork(watchGetCategorizedAuthArticle),
  ]);
}
