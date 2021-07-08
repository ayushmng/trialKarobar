import {Action} from './action';
import {
  PLAY_ARTICLE,
  GET_NETWORK_CONNECTION,
  TOGGLE_LANGUAGE_MODAL,
  TOGGLE_BACKGROUND_TYPES,
} from './constant';

interface InitialState {
  networkConnection?: boolean | null;
  playmp3?: boolean;
  openLanguageModal?: boolean;
  openBackgroundTypes?: boolean;
}

const InitialState: InitialState = {
  networkConnection: null,
  openLanguageModal: false,
  openBackgroundTypes: false,
};

export default function dataReducer(
  state = InitialState,
  action: Action,
): InitialState {
  switch (action.type) {
    case GET_NETWORK_CONNECTION: {
      return {
        ...state,
        networkConnection: action.payload.network,
      };
    }

    case PLAY_ARTICLE: {
      return {
        ...state,
        playmp3: action.payload.playmp3,
      };
    }
    case TOGGLE_LANGUAGE_MODAL: {
      return {
        ...state,
        openLanguageModal: action.payload.openLanguageModal,
      };
    }
    case TOGGLE_BACKGROUND_TYPES: {
      return {
        ...state,
        openBackgroundTypes: action.payload.openBackgroundTypes,
      };
    }

    default: {
      return state;
    }
  }
}
