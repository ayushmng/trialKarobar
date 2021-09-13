import {Action} from './action';
import {
  SEARCH_CONTENT,
  SEARCH_CONTENT_SUCCESS,
  SEARCH_CONTENT_FAILED,
  CLEAR_SEARCH_CONTENT,
  SEARCH_CONTENT_META,
  SEARCH_CONTENT_META_SUCCESS,
  SEARCH_CONTENT_META_FAILED,
} from './constant';

interface InitialState {
  loadingSearchContent: boolean;
  loadingSearchContentMeta: boolean;
  errorSearch?: string;
  message?: string;
  searchNextPageNo?: number;
  searchData: {
    [key: string]: any;
  };
  search?: Array<any>;
  searchMeta: Array<any>;
}

const InitialState: InitialState = {
  loadingSearchContent: false,
  loadingSearchContentMeta: false,
  errorSearch: '',
  searchNextPageNo: 1,
  searchData: {},
  search: [],
  searchMeta: [],
};

export default function searchReducer(
  state = InitialState,
  action: Action,
): InitialState {
  switch (action.type) {
    case SEARCH_CONTENT: {
      return {...state, loadingSearchContent: true, errorSearch: ''};
    }
    case CLEAR_SEARCH_CONTENT: {
      return {
        ...state,
        loadingSearchContent: false,
        search: [],
        errorSearch: '',
        searchData: {},
        searchNextPageNo: 1,
      };
    }

    case SEARCH_CONTENT_SUCCESS: {
      let stateSearch = !!state.search ? [...state.search] : [];
      let actionData = [...action.payload.data.docs];
      let postData = [...stateSearch, ...actionData];
      return {
        ...state,
        loadingSearchContent: false,
        search: postData,
        searchData: action.payload.data,
        searchNextPageNo: !!state.searchNextPageNo
          ? state.searchNextPageNo + 1
          : 1,
        errorSearch: '',
      };
    }
    case SEARCH_CONTENT_FAILED: {
      return {
        ...state,
        loadingSearchContent: false,
        errorSearch: action.payload.message,
      };
    }
    case SEARCH_CONTENT_META: {
      return {...state, loadingSearchContentMeta: true, errorSearch: ''};
    }
    case SEARCH_CONTENT_META_SUCCESS: {
      return {
        ...state,
        loadingSearchContentMeta: false,
        searchMeta: action.payload.data,
        errorSearch: '',
      };
    }
    case SEARCH_CONTENT_META_FAILED: {
      return {
        ...state,
        loadingSearchContentMeta: false,
        errorSearch: action.payload.message,
      };
    }
    default: {
      return state;
    }
  }
}
