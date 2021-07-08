import {
  GET_ALL_ARTICAL,
  GET_ALL_ARTICAL_SUCCESS,
  GET_ALL_ARTICAL_FAILED,
  CLEAR_ALL_ARTICLE,
  GET_FEATURED_ARTICAL,
  GET_FEATURED_ARTICAL_SUCCESS,
  GET_FEATURED_ARTICAL_FAILED,
  REFRESH_GET_ALL_ARTICAL,
  REFRESH_GET_ALL_ARTICAL_SUCCESS,
  REFRESH_GET_ALL_ARTICAL_FAILED,
  SET_REFRESH_FALSE,
  GET_EACH_ARTICAL,
  GET_EACH_ARTICAL_SUCCESS,
  GET_EACH_ARTICAL_FAILED,
} from './constant';
import {ArticleProps} from './api';
export type Payload = {
  message?: string;
  data?: any;
  page?: number;
  limit?: number;
  category?: string;
  _id?: string;
  language?: string;
  loggedIn?: boolean;
};

export interface Action {
  type:
    | typeof GET_ALL_ARTICAL
    | typeof GET_ALL_ARTICAL_SUCCESS
    | typeof GET_ALL_ARTICAL_FAILED
    | typeof CLEAR_ALL_ARTICLE
    | typeof REFRESH_GET_ALL_ARTICAL
    | typeof REFRESH_GET_ALL_ARTICAL_SUCCESS
    | typeof REFRESH_GET_ALL_ARTICAL_FAILED
    | typeof SET_REFRESH_FALSE
    | typeof GET_EACH_ARTICAL
    | typeof GET_EACH_ARTICAL_SUCCESS
    | typeof GET_EACH_ARTICAL_FAILED
    | typeof GET_FEATURED_ARTICAL
    | typeof GET_FEATURED_ARTICAL_SUCCESS
    | typeof GET_FEATURED_ARTICAL_FAILED;
  payload: Payload;
}

export interface ClearAllType {
  type: typeof CLEAR_ALL_ARTICLE;
}

export const getAllArticle = ({
  page,
  language,
  loggedIn,
}: ArticleProps): Action => {
  return {
    type: GET_ALL_ARTICAL,
    payload: {page, language, loggedIn},
  };
};

export const refreshGetAllArticle = ({
  page,
  language,
  loggedIn,
}: ArticleProps): Action => {
  return {
    type: REFRESH_GET_ALL_ARTICAL,
    payload: {page, language, loggedIn},
  };
};

export const setRefreshFalse = (): Action => {
  return {
    type: SET_REFRESH_FALSE,
    payload: {},
  };
};

export const clearAllArticle = (): ClearAllType => {
  return {
    type: CLEAR_ALL_ARTICLE,
  };
};

export const getAllArticleSuccess = (payload: Payload): Action => {
  return {
    type: GET_ALL_ARTICAL_SUCCESS,
    payload,
  };
};

export const getAllArticleFailed = (payload: Payload): Action => {
  return {
    type: GET_ALL_ARTICAL_FAILED,
    payload,
  };
};

export const getEachArticle = ({_id}: ArticleProps): Action => {
  return {
    type: GET_EACH_ARTICAL,
    payload: {_id},
  };
};

export const getEachArticleSuccess = (payload: Payload): Action => {
  return {
    type: GET_EACH_ARTICAL_SUCCESS,
    payload,
  };
};

export const getEachArticleFailed = (payload: Payload): Action => {
  return {
    type: GET_EACH_ARTICAL_FAILED,
    payload,
  };
};

export const refreshGetAllArticleSuccess = (payload: Payload): Action => {
  return {
    type: REFRESH_GET_ALL_ARTICAL_SUCCESS,
    payload,
  };
};

export const refreshGetAllArticleFailed = (payload: Payload): Action => {
  return {
    type: REFRESH_GET_ALL_ARTICAL_FAILED,
    payload,
  };
};

export const getFeaturedArticle = ({language}: Payload): Action => {
  return {
    type: GET_FEATURED_ARTICAL,
    payload: {language},
  };
};

export const getFeaturedArticleSuccess = (payload: Payload): Action => {
  return {
    type: GET_FEATURED_ARTICAL_SUCCESS,
    payload,
  };
};

export const getFeaturedArticleFailed = (payload: Payload): Action => {
  return {
    type: GET_FEATURED_ARTICAL_FAILED,
    payload,
  };
};
