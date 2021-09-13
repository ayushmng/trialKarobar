import {all} from 'redux-saga/effects';
import authSaga from './auth/saga';
import articleSaga from './article/saga';
import searchSaga from './search/saga';
// import bookmarkSaga from './bookmark/saga';
import categorySaga from './categoryarticle/saga';
// import userProfileSaga from './userProfile/saga';
// import widgetSaga from './widget/saga';
// import reportarticleSaga from './reportarticle/saga';
// import collectionSaga from './collection/saga';
// import smartAdSaga from './smartAd/saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    articleSaga(),
    searchSaga(),
    // bookmarkSaga(),
    categorySaga(),
    // userProfileSaga(),
    // widgetSaga(),
    // reportarticleSaga(),
    // collectionSaga(),
    // smartAdSaga(),
  ]);
}
