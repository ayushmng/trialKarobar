import {Action} from './action';
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  SIGN_IN,
  FEDERATED_SIGN_IN,
  //   GET_USERNAME,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  //   RESEND_VERIFICATION_CODE,
  //   RESEND_VERIFICATION_CODE_SUCCESS,
  //   RESEND_VERIFICATION_CODE_FAILED,
  CONFIRM_SIGN_UP,
  SIGN_UP_CONFIRMED,
  SIGN_UP_CONFIRMED_FAILED,
  SIGN_OUT,
  //   FORGOT_PASSWORD,
  //   FORGOT_PASSWORD_SUCCESS,
  //   FORGOT_PASSWORD_ERROR,
  //   FORGOT_PASSWORD_RESET,
  //   FORGOT_PASSWORD_RESET_SUCCESS,
  //   FORGOT_PASSWORD_RESET_ERROR,
  //   CHANGE_PASSWORD,
  //   CHANGE_PASSWORD_FAILED,
  //   CHANGE_PASSWORD_SUCCESS,
  //   CLEAR_ALERT_ERROR,
  //   FEDERATED_LOADING,
  //   CLEAR_AUTH,
  SET_USER,
  SET_UP_USER,
} from './constant';

export type Error = {
  message: string;
  code: string;
  name: string;
};

interface InitialState {
  userRegistration: string;
  error: Error | string;
  loading: boolean;
  federatedLoading: boolean;
  userName?: string;
  message?: string;
  user?: unknown;
  loggedIn: boolean;
  forgotUserName?: unknown;
  forgotPasswordReset?: unknown;
  newPassword?: string;
  oldPassword?: string;
  initialLoginLoading: boolean;
  resendLoading: boolean;
  userObj?: {
    [key: string]: any;
  };
}

const InitialState: InitialState = {
  userRegistration: '',
  error: '',
  loading: false,
  federatedLoading: false,
  userName: '',
  loggedIn: false,
  initialLoginLoading: false,
  resendLoading: false,
};

export default function authReducer(
  state: InitialState = InitialState,
  action: Action,
): InitialState {
  switch (action.type) {
    case REGISTER_USER: {
      return {...state, loading: true, error: ''};
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        userRegistration: action.payload.userRegistration,
        error: '',
        loading: false,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        error: action.payload.message,
        loading: false,
        userRegistration: '',
      };
    }
    case SIGN_IN: {
      return {...state, error: '', loading: true};
    }
    // case FEDERATED_LOADING: {
    //   return {...state, federatedLoading: true};
    // }
    case FEDERATED_SIGN_IN: {
      return {...state, error: ''};
    }

    // case GET_USERNAME: {
    //   return {
    //     ...state,
    //     error: '',
    //     loading: false,
    //     userName: action.payload.userName,
    //   };
    // }
    case SET_UP_USER: {
      return {
        ...state,
        error: '',
        initialLoginLoading: true,
      };
    }
    case SET_USER: {
      return {
        ...state,
        error: '',
        initialLoginLoading: true,
      };
    }

    case SIGN_IN_SUCCESS: {
      console.log('sign in success ', JSON.stringify(action.payload));
      return {
        ...state,
        error: '',
        message: action.payload.successMessage,
        loading: false,
        federatedLoading: false,
        user: action.payload.user,
        loggedIn: true,
        userObj: action.payload.userObj,
        initialLoginLoading: false,
      };
    }

    case SIGN_IN_FAILED: {
      console.log('sign In failed ', action.payload);
      return {
        ...state,
        error: action.payload.message,
        loading: false,
        federatedLoading: false,
        message: '',
        loggedIn: false,
        initialLoginLoading: false,
      };
    }

    case CONFIRM_SIGN_UP: {
      return {...state, error: '', loading: true, message: ''};
    }

    case SIGN_UP_CONFIRMED: {
      return {
        ...state,
        error: '',
        loading: false,
        message: action.payload.successMessage,
      };
    }
    case SIGN_UP_CONFIRMED_FAILED: {
      return {
        ...state,
        error: action.payload.message,
        loading: false,
        message: '',
      };
    }

    // case RESEND_VERIFICATION_CODE: {
    //   return {...state, error: '', message: '', resendLoading: true};
    // }
    // case RESEND_VERIFICATION_CODE_SUCCESS: {
    //   return {
    //     ...state,
    //     error: '',
    //     message: action.payload.successMessage,
    //     resendLoading: false,
    //   };
    // }
    // case RESEND_VERIFICATION_CODE_FAILED: {
    //   return {
    //     ...state,
    //     error: action.payload.message,
    //     resendLoading: false,
    //     message: '',
    //   };
    // }
    case SIGN_OUT: {
      return {
        ...state,
        error: '',
        user: '',
        message: '',
        loggedIn: false,
      };
    }

    // case FORGOT_PASSWORD: {
    //   return {...state, loading: true, error: ''};
    // }

    // case FORGOT_PASSWORD_SUCCESS: {
    //   return {
    //     ...state,
    //     loading: false,
    //     forgotUserName: action.payload,
    //     error: '',
    //   };
    // }
    // case FORGOT_PASSWORD_ERROR: {
    //   return {
    //     ...state,
    //     loading: false,
    //     forgotUserName: '',
    //     error: action.payload.message,
    //   };
    // }
    // case FORGOT_PASSWORD_RESET: {
    //   return {...state, loading: true, error: ''};
    // }

    // case FORGOT_PASSWORD_RESET_SUCCESS: {
    //   return {
    //     ...state,
    //     loading: false,
    //     forgotPasswordReset: action.payload,
    //     error: '',
    //   };
    // }

    // case FORGOT_PASSWORD_RESET_ERROR: {
    //   return {
    //     ...state,
    //     loading: false,
    //     forgotPasswordReset: '',
    //     error: action.payload.message,
    //   };
    // }

    // case CHANGE_PASSWORD: {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // }
    // case CHANGE_PASSWORD_SUCCESS: {
    //   return {
    //     ...state,
    //     error: '',
    //     loading: false,
    //     message: action.payload.successMessage,
    //   };
    // }
    // case CHANGE_PASSWORD_FAILED: {
    //   return {
    //     ...state,
    //     error: action.payload.message,
    //     loading: false,
    //     message: '',
    //   };
    // }
    // case CLEAR_ALERT_ERROR: {
    //   return {
    //     ...state,
    //     error: '',
    //   };
    // }
    // case CLEAR_AUTH: {
    //   return {
    //     ...state,
    //     error: '',
    //     user: '',
    //     message: '',
    //     loggedIn: false,
    //   };
    // }
    default: {
      return state;
    }
  }
}
