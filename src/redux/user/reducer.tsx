import {Action} from './action';
import {
  GET_USER_LANGUAGE,
  CHANGE_USER_LANGUAGE,
  CHANGE_THEME,
  CHANGE_FONTSIZE,
  CHANGE_BACKGROUND_TYPE,
} from './constant';

interface InitialState {
  language: string;
  theme?: string;
  fontSize?: number;
  backgroundType?: string;
}

const InitialState: InitialState = {
  language: 'en',
  theme: 'default',
  fontSize: 16,
  backgroundType: 'Classic',
};

export default function userReducer(
  state = InitialState,
  action: Action,
): InitialState {
  switch (action.type) {
    case GET_USER_LANGUAGE: {
      return {...state, language: state.language};
    }
    case CHANGE_USER_LANGUAGE: {
      return {
        ...state,
        language: action.payload.language!,
      };
    }
    case CHANGE_THEME: {
      return {
        ...state,
        theme: state.theme === 'dark' ? 'default' : 'dark',
      };
    }
    case CHANGE_BACKGROUND_TYPE: {
      return {
        ...state,
        backgroundType: action.payload.backgroundType,
      };
    }
    case CHANGE_FONTSIZE: {
      return {
        ...state,
        fontSize: action.payload.fontSize,
      };
    }
    default: {
      return state;
    }
  }
}
