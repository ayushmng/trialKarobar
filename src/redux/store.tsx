import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {reducers as rootReducer} from './reducers';
import rootSaga from './sagas';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// persist data of userProfile
// -for showing userDetails data in profile screen even when user open app without internet connection
// persist data of bookmarkReducer
// -stores overall bookmark of a user and is used for offline read of bookmarked article
// persist data of userReducer
// -stores user defined state of the app such as theme, language, fontSize, backgroundType
// persist data of widgetReducer
// -stores user defined widget
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'userProfileReducer',
    'bookmarkReducer',
    'userReducer',
    'widgetReducer',
  ],
};
const persistedReducer = persistReducer(persistConfig as any, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
let persistor: any;

// const rootReducer = combineReducers({
//   cardData: reducer,
//   darkMode: themeReducer,
// });

function configureStore(initialState = {}) {
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  persistor = persistStore(store as any);

  sagaMiddleware.run(rootSaga);

  return store;
}

const storeObj = configureStore();
export {storeObj, persistor};
