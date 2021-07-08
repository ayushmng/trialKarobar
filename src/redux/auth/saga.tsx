import {Alert} from 'react-native';
import {
  all,
  call,
  fork,
  put,
  putResolve,
  StrictEffect,
  takeEvery,
} from 'redux-saga/effects';
import {
  REGISTER_USER,
  CONFIRM_SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  SET_USER,
  SET_UP_USER,
  CLEAR_AUTH,
  FEDERATED_SIGN_IN,
} from './constant';
import {
  registerUser,
  registerUserSuccess,
  registerUserFailed,
  confirmSignUp,
  signUpConfirmed,
  signUpConfirmedFailed,
  signIn,
  signInFailed,
  signInSuccess,
  getUserName,
  setUpUser,
  setUser,
  federatedSignIn,
  signOut,
} from './action';

import {
  addUserApi,
  confirmSignUpApi,
  signInApi,
  getSession,
  federatedSignInApi,
  signOutApi,
} from '../../api/auth';

const alertBox = (title: string, message: string) =>
  Alert.alert(title, message, [
    // {
    //   text: 'Cancel',
    //   onPress: () => console.log('Cancel Pressed'),
    //   style: 'cancel',
    // },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

function* handleRegisterUser({
  payload,
}: ReturnType<typeof registerUser>): Generator<StrictEffect, void, any> {
  const {email, password, username, navigation} = payload;
  try {
    const data = yield call(() => addUserApi({email, password, username}));
    yield put(registerUserSuccess({successMessage: 'Successfully Registered'}));
    yield navigation.replace('ConfirmSignUp', {email: email});
  } catch (error) {
    alertBox(error.code, error.message);
    yield put(registerUserFailed(error));
  }
}

function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, handleRegisterUser);
}

function* handleConfirmSignUp({
  payload,
}: ReturnType<typeof confirmSignUp>): Generator<StrictEffect, void, any> {
  const {email, code, navigation} = payload;
  try {
    const data = yield call(() => confirmSignUpApi({email, code}));
    yield put(signUpConfirmed({successMessage: 'SignUp Confirmed'}));
    yield navigation.replace('LoginForm');
  } catch (error) {
    yield put(signUpConfirmedFailed(error));
  }
}

function* watchConfirmSignUp() {
  yield takeEvery(CONFIRM_SIGN_UP, handleConfirmSignUp);
}

function* handleSignIn({
  payload,
}: ReturnType<typeof signIn>): Generator<StrictEffect, void, any> {
  const {email, password, navigation} = payload;
  try {
    const res = yield call(() => signInApi({email, password}));
    console.log(res, ' Api response');
    // yield put(signInSuccess(res));

    const response = yield call(() => getSession());
    const user = response.attributes || {};
    const idToken = response.signInUserSession.idToken.jwtToken;
    yield put(
      signInSuccess({
        userObj: response,
        user: {...user, idToken},
        successMessage: 'Sign In Success',
      }),
    );
    yield navigation.replace('Dashboard');
  } catch (error) {
    console.log('Error Code', error.code);
    alertBox(error.code, error.message);
    if (error.code === 'UserNotConfirmedException') {
      yield put(getUserName({userName: email}));
      yield navigation.replace('ConfirmSignUp', {email: email});
    } else {
      yield put(signInFailed(error));
    }
    console.log(error);
  }
}

function* handleSetUpUser({
  payload,
}: ReturnType<typeof setUpUser>): Generator<StrictEffect, void, any> {
  const {navigation} = payload;
  let response;
  try {
    //call currentAuthenticated User for checking user login
    response = yield call(() => getSession());
    console.log('User response', response);
  } catch (error) {
    console.log('error while setUser', error);
    yield put(signInFailed(error));
    return;
  }
  try {
    const user = response.attributes || {};
    const idToken = response.signInUserSession.idToken.jwtToken;
    console.log('User token', idToken);
    //call getUserProfile Api to get User Data

    // const userProfileData = yield call(() => getUserProfileApi());
    // console.log('userProfileData is', userProfileData);

    //navigation goback is called here once the userProfileSuccess is done then loggedIn is true...
    yield navigation.canGoBack() && navigation.goBack();
    //set User bookmark in bookmark reducer
    // yield put(setAllBookmarks({bookmarkIds: userProfileData.data.bookmarks}));
    //set User Profile Details in userProfile reducer
    // yield put(getUserProfileSuccess(userProfileData.data.profileDetail));

    //signInSucces is called last because if userProfileApi is a success then only the signIn is success
    yield put(
      signInSuccess({
        userObj: response,
        user: {...user, idToken},
        successMessage: 'Sign In Success',
      }),
    );
    console.log('User response', signInSuccess);
  } catch (error) {
    console.log('error while userProfile api failed ', error);
    //call amplify signOut if error occurs while getting userProfile Api
    yield call(() => signOutApi());
    // yield put(getUserProfileFailed(error));
  }
}

function* handleSetUser(): Generator<StrictEffect, void, any> {
  try {
    //call currentAuthenticated User for checking user login
    const response = yield call(() => getSession());
    const user = response.attributes || {};
    const idToken = response.signInUserSession.idToken.jwtToken;
    yield put(
      signInSuccess({
        userObj: response,
        user: {...user, idToken},
        successMessage: 'Sign In Success',
      }),
    );
    console.log('Sign in success with username: ' + `${user}`);
  } catch (error) {
    console.log(error);
    yield put(signInFailed(error));
    return;
  }
}

function* handleFederatedSignIn({payload}: ReturnType<typeof federatedSignIn>) {
  try {
    const {provider} = payload;
    yield call(() => federatedSignInApi({provider}));
    console.log('Login through: ', provider);
  } catch (error) {
    console.log(error);
    yield put(signInFailed(error));
  }
}

function* handleSignOut({payload}: ReturnType<typeof signOut>) {
  try {
    yield call(() => signOutApi());
    yield put({type: CLEAR_AUTH});
    // yield put({type: CLEAR_USER_PROFILE});
    // yield put(removeAllBookmarks());
    // yield put(removeAllCollection());
    yield;
  } catch (error) {
    console.log('logout failed', error);
  }
}

function* watchSignInUser() {
  yield takeEvery(SIGN_IN, handleSignIn);
  yield takeEvery(FEDERATED_SIGN_IN, handleFederatedSignIn);
  // yield takeEvery(SET_UP_USER, handleSetUpUser);
  yield takeEvery(SET_USER, handleSetUser);
}

function* watchSignOut() {
  yield takeEvery(SIGN_OUT, handleSignOut);
}

export default function* rootSaga(): Generator<StrictEffect> {
  yield all([
    fork(watchRegisterUser),
    fork(watchSignInUser),
    fork(watchConfirmSignUp),
    // fork(watchResendVerificationCode),
    fork(watchSignOut),
    // fork(watchForgotPassword),
    // fork(watchForgotPasswordReset),
    // fork(watchChangePassword),
  ]);
}
