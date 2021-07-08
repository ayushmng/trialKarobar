import {AddUser, SignUpConfirm, Signin, FederatedSignin} from '../../api/auth';

import {
  CONFIRM_SIGN_UP,
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  SIGN_UP_CONFIRMED,
  SIGN_UP_CONFIRMED_FAILED,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_OUT,
  SET_USER,
  SET_UP_USER,
  GET_USERNAME,
  GET_USER_PROFILE_FAILED,
  FEDERATED_SIGN_IN,
} from './constant';

export interface Action {
  type:
    | typeof REGISTER_USER
    | typeof REGISTER_USER_SUCCESS
    | typeof REGISTER_USER_FAILED
    | typeof CONFIRM_SIGN_UP
    | typeof SIGN_UP_CONFIRMED
    | typeof SIGN_UP_CONFIRMED_FAILED
    | typeof SIGN_IN
    | typeof SIGN_IN_SUCCESS
    | typeof SIGN_IN_FAILED
    | typeof GET_USERNAME
    | typeof FEDERATED_SIGN_IN
    | typeof GET_USER_PROFILE_FAILED
    | typeof SET_USER
    | typeof SET_UP_USER
    | typeof SIGN_OUT;

  payload: Payload;
}

export type Payload = {
  userRegistration?: any;
  message?: any;
  successMessage?: string;
  username?: string;
  email?: string;
  password?: string;
  code?: string;
  navigation?: any;
  user?: unknown;
  provider?: string;
  userObj?: {
    [key: string]: any;
  };
};

interface Message {
  errorMessage?: string;
  successMessage?: string;
  userName?: string;
}

export const registerUser = ({
  username,
  email,
  password,
  navigation,
}: AddUser): Action => ({
  type: REGISTER_USER,
  payload: {username, email, password, navigation},
});

export const registerUserSuccess = (successMessage: Message): Action => ({
  type: REGISTER_USER_SUCCESS,
  payload: successMessage,
});

export const registerUserFailed = (errorMessage: Message): Action => ({
  type: REGISTER_USER_FAILED,
  payload: {message: errorMessage},
});

export const confirmSignUp = ({
  email,
  code,
  navigation,
}: SignUpConfirm): Action => ({
  type: CONFIRM_SIGN_UP,
  payload: {email, code, navigation},
});

export const signUpConfirmed = (successMessage: Message): Action => ({
  type: SIGN_UP_CONFIRMED,
  payload: successMessage,
});

export const signUpConfirmedFailed = (errorMessage: Message): Action => ({
  type: SIGN_UP_CONFIRMED_FAILED,
  payload: {message: errorMessage},
});

export const signIn = ({email, password, navigation}: Signin): Action => ({
  type: SIGN_IN,
  payload: {email, password, navigation},
});

export const signInSuccess = (payload: Payload): Action => ({
  type: SIGN_IN_SUCCESS,
  payload,
});

export const signInFailed = (errorMessage: Message): Action => ({
  type: SIGN_IN_FAILED,
  payload: {message: errorMessage},
});

export const getUserName = (username: Message): Action => ({
  type: GET_USERNAME,
  payload: username,
});

export const federatedSignIn = ({provider}: FederatedSignin): Action => ({
  type: FEDERATED_SIGN_IN,
  payload: {provider},
});

export const setUser = (): Action => {
  return {
    type: SET_USER,
    payload: {},
  };
};

export const setUpUser = ({navigation}: Payload): Action => {
  return {
    type: SET_UP_USER,
    payload: {navigation},
  };
};

export const getUserProfileFailed = (payload: Payload): Action => {
  return {
    type: GET_USER_PROFILE_FAILED,
    payload,
  };
};

export const signOut = (): Action => ({
  type: SIGN_OUT,
  payload: {},
});
