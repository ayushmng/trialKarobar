import {combineReducers} from 'redux';
import authReducer from './auth/reducer';
import articleReducer from './article/reducer';
import searchReducer from './search/reducer';
import userReducer from './user/reducer';
// import bookmarkReducer from './bookmark/reducer';
import categoryReducer from './categoryarticle/reducer';
// import userProfileReducer from './userProfile/reducer';
import dataReducer from './data/reducer';
// import widgetReducer from './widget/reducer';
// import reportarticleReducer from './reportarticle/reducer';
// import collectionReducer from './collection/reducer';
// import smartAdReducer from './smartAd/reducer';

export const reducers = combineReducers({
  authReducer,
  articleReducer,
  searchReducer,
  userReducer,
  //   userProfileReducer,
  //   bookmarkReducer,
  categoryReducer,
  dataReducer,
  //   widgetReducer,
  //   reportarticleReducer,
  //   collectionReducer,
  //   smartAdReducer,
});

export type RootState = ReturnType<typeof reducers>;
