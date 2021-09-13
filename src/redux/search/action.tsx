import {
  SEARCH_CONTENT,
  SEARCH_CONTENT_SUCCESS,
  SEARCH_CONTENT_FAILED,
  CLEAR_SEARCH_CONTENT,
  SEARCH_CONTENT_META,
  SEARCH_CONTENT_META_SUCCESS,
  SEARCH_CONTENT_META_FAILED,
} from './constant';
import {SearchContentProps} from './api';
export type Payload = {
  message?: string;
  data?: any;
  page?: number;
  limit?: number;
  term?: string;
  date?: string;
  category?: string;
};

export interface Action {
  type:
    | typeof SEARCH_CONTENT
    | typeof SEARCH_CONTENT_SUCCESS
    | typeof SEARCH_CONTENT_FAILED
    | typeof CLEAR_SEARCH_CONTENT
    | typeof SEARCH_CONTENT_META
    | typeof SEARCH_CONTENT_META_SUCCESS
    | typeof SEARCH_CONTENT_META_FAILED;
  payload: Payload;
}

export const getSearchContent = ({
  page,
  term,
  date,
  category,
}: SearchContentProps): Action => {
  console.log('term and page is ', term, page, date, category);
  return {
    type: SEARCH_CONTENT,
    payload: {page, term, date, category},
  };
};
export const clearSearchContent = (): Action => {
  return {
    type: CLEAR_SEARCH_CONTENT,
    payload: {},
  };
};
export const getSearchContentSuccess = (payload: Payload): Action => {
  return {
    type: SEARCH_CONTENT_SUCCESS,
    payload,
  };
};

export const getSearchContentFailed = (payload: Payload): Action => {
  return {
    type: SEARCH_CONTENT_FAILED,
    payload,
  };
};

export const getSearchContentMeta = (): Action => {
  return {
    type: SEARCH_CONTENT_META,
    payload: {},
  };
};

export const getSearchContentMetaSuccess = (payload: Payload): Action => {
  return {
    type: SEARCH_CONTENT_META_SUCCESS,
    payload,
  };
};

export const getSearchContentMetaFailed = (payload: Payload): Action => {
  return {
    type: SEARCH_CONTENT_META_FAILED,
    payload,
  };
};
