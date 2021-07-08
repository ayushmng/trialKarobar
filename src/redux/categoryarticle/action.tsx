import {
  GET_CATEGORIZED_ARTICAL,
  GET_CATEGORIZED_ARTICAL_SUCCESS,
  GET_CATEGORIZED_ARTICAL_FAILED,
  CLEAR_CATEGORIZED_ARTICAL,
  GET_ALL_CATEGORY,
  GET_ALL_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_FAILED,
  SET_CATEGORY,
} from './constant';
import {CategoryArticleProps} from './api';
export type Payload = {
  page?: number;
  limit?: number;
  category?: string;
  _id?: string;
  language?: string;
  message?: string;
  data?: any;
  selectedCategory?: string;
  loggedIn?: boolean;
};

export interface Action {
  type:
    | typeof GET_CATEGORIZED_ARTICAL
    | typeof GET_CATEGORIZED_ARTICAL_SUCCESS
    | typeof GET_CATEGORIZED_ARTICAL_FAILED
    | typeof CLEAR_CATEGORIZED_ARTICAL
    | typeof GET_ALL_CATEGORY
    | typeof GET_ALL_CATEGORY_SUCCESS
    | typeof GET_ALL_CATEGORY_FAILED
    | typeof SET_CATEGORY;
  payload: Payload;
}

export interface ClearType {
  type: typeof CLEAR_CATEGORIZED_ARTICAL;
}

export const getCategorizedArticle = ({
  page,
  category,
  language,
}: CategoryArticleProps): Action => {
  return {
    type: GET_CATEGORIZED_ARTICAL,
    payload: {page, category, language},
  };
};

export const getCategorizedArticleSuccess = (payload: Payload): Action => {
  return {
    type: GET_CATEGORIZED_ARTICAL_SUCCESS,
    payload,
  };
};
export const getCategorizedArticleClear = (): ClearType => {
  return {
    type: CLEAR_CATEGORIZED_ARTICAL,
  };
};

export const getCategorizedArticleFailed = (payload: Payload): Action => {
  return {
    type: GET_CATEGORIZED_ARTICAL_FAILED,
    payload,
  };
};

export const getAllCategory = ({language}: CategoryArticleProps): Action => {
  return {
    type: GET_ALL_CATEGORY,
    payload: {language},
  };
};

export const getAllCategorySuccess = (payload: Payload): Action => {
  return {
    type: GET_ALL_CATEGORY_SUCCESS,
    payload,
  };
};

export const getAllCategoryFailed = (payload: Payload): Action => {
  return {
    type: GET_ALL_CATEGORY_FAILED,
    payload,
  };
};

export const setCategory = ({selectedCategory}: Payload): Action => {
  return {
    type: SET_CATEGORY,
    payload: {selectedCategory},
  };
};
