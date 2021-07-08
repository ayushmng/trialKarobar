import {
  PLAY_ARTICLE,
  GET_NETWORK_CONNECTION,
  TOGGLE_BACKGROUND_TYPES,
  TOGGLE_LANGUAGE_MODAL,
} from './constant';
export type Payload = {
  network?: boolean;
  playmp3?: boolean;
  openLanguageModal?: boolean;
  openBackgroundTypes?: boolean;
};

export interface Action {
  type:
    | typeof PLAY_ARTICLE
    | typeof GET_NETWORK_CONNECTION
    | typeof TOGGLE_BACKGROUND_TYPES
    | typeof TOGGLE_LANGUAGE_MODAL;

  payload: Payload;
}

export const getNetworkConnection = ({network}: Payload): Action => {
  return {
    type: GET_NETWORK_CONNECTION,
    payload: {network},
  };
};

export const changePlayArticle = ({playmp3}: Payload): Action => {
  return {
    type: PLAY_ARTICLE,
    payload: {playmp3},
  };
};

export const toggleLanguageModal = ({openLanguageModal}: Payload): Action => {
  return {
    type: TOGGLE_LANGUAGE_MODAL,
    payload: {openLanguageModal},
  };
};

export const toggleBackgroundTypes = ({
  openBackgroundTypes,
}: Payload): Action => {
  return {
    type: TOGGLE_BACKGROUND_TYPES,
    payload: {openBackgroundTypes},
  };
};
