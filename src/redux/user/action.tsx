import {
  GET_USER_LANGUAGE,
  CHANGE_USER_LANGUAGE,
  CHANGE_THEME,
  CHANGE_FONTSIZE,
  CHANGE_BACKGROUND_TYPE,
} from './constant';

export type Payload = {
  language?: string;
  network?: boolean;
  theme?: string;
  playmp3?: boolean;
  backgroundType?: string;
  fontSize?: number;
};

export interface Action {
  type:
    | typeof GET_USER_LANGUAGE
    | typeof CHANGE_USER_LANGUAGE
    | typeof CHANGE_THEME
    | typeof CHANGE_BACKGROUND_TYPE
    | typeof CHANGE_FONTSIZE;

  payload: Payload;
}

export const getUserLanguage = (): Action => {
  return {
    type: GET_USER_LANGUAGE,
    payload: {},
  };
};

export const changeUserLanguage = (language: string): Action => {
  return {
    type: CHANGE_USER_LANGUAGE,
    payload: {language: language},
  };
};

export const changeTheme = (): Action => {
  return {
    type: CHANGE_THEME,
    payload: {},
  };
};

export const changeFontSize = ({fontSize}: Payload): Action => {
  return {
    type: CHANGE_FONTSIZE,
    payload: {fontSize},
  };
};

export const changeBackgroundType = ({backgroundType}: Payload): Action => {
  return {
    type: CHANGE_BACKGROUND_TYPE,
    payload: {backgroundType},
  };
};
