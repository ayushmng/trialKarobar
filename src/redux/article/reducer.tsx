import {Action} from './action';
import {
  GET_ALL_ARTICAL,
  CLEAR_ALL_ARTICLE,
  GET_ALL_ARTICAL_SUCCESS,
  GET_ALL_ARTICAL_FAILED,
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

interface InitialState {
  loadingAllArticle: boolean;
  loadingEachArticle: boolean;
  error?: string;
  errorAllArticle?: string;
  errorRefreshAllArticle?: string;
  errorEachArticle?: string;
  data: {
    [key: string]: any;
  };
  article: Array<any>;
  eachArticle: {
    [key: string]: any;
  };
  articleNextPageNo: number;
  refresh: boolean;
  featuredArticle: any;
  errorFeaturedArticle?: string;
  featuredLoading: boolean;
}

const InitialState: InitialState = {
  loadingAllArticle: false,
  loadingEachArticle: false,
  data: [],
  eachArticle: {},
  article: [],
  articleNextPageNo: 1,
  refresh: false,
  featuredArticle: [],
  featuredLoading: false,
};

export default function articleReducer(
  state = InitialState,
  action: Action,
): InitialState {
  console.log('Action Type: ', action.type);
  switch (action.type) {
    case GET_ALL_ARTICAL: {
      return {...state, loadingAllArticle: true, errorAllArticle: ''};
    }
    case CLEAR_ALL_ARTICLE: {
      return {
        ...state,
        errorAllArticle: '',
        data: [],
        article: [],
        articleNextPageNo: 1,
      };
    }
    case GET_ALL_ARTICAL_SUCCESS: {
      let stateData = !!state.article ? [...state.article] : [];
      let actionData = [...action.payload.data.docs];
      let postData = [...stateData, ...actionData];
      return {
        ...state,
        loadingAllArticle: false,
        article: postData,
        data: action.payload.data,
        articleNextPageNo: !!state.articleNextPageNo
          ? state.articleNextPageNo + 1
          : 1,
        errorAllArticle: '',
      };
    }
    case GET_ALL_ARTICAL_FAILED: {
      console.log('GET_ALL_ARTICAL_FAILED', action.payload.message);

      return {
        ...state,
        loadingAllArticle: false,
        errorAllArticle: action.payload.message,
      };
    }
    case REFRESH_GET_ALL_ARTICAL: {
      return {...state, errorRefreshAllArticle: '', refresh: true};
    }
    case REFRESH_GET_ALL_ARTICAL_SUCCESS: {
      return {
        ...state,
        loadingAllArticle: false,
        article: [...action.payload.data.docs],
        data: action.payload.data,
        articleNextPageNo: 2,
        refresh: false,
        errorRefreshAllArticle: '',
      };
    }
    case REFRESH_GET_ALL_ARTICAL_FAILED: {
      return {
        ...state,
        loadingAllArticle: false,
        errorRefreshAllArticle: action.payload.message,
        refresh: false,
      };
    }
    case GET_FEATURED_ARTICAL: {
      return {...state, errorFeaturedArticle: '', featuredLoading: true};
    }
    case GET_FEATURED_ARTICAL_SUCCESS: {
      return {
        ...state,
        featuredLoading: false,
        featuredArticle: [...action.payload.data],
        errorFeaturedArticle: '',
      };
    }
    case GET_FEATURED_ARTICAL_FAILED: {
      return {
        ...state,
        featuredLoading: false,
        errorFeaturedArticle: action.payload.message,
      };
    }
    case SET_REFRESH_FALSE: {
      return {...state, refresh: false};
    }
    case GET_EACH_ARTICAL: {
      return {...state, loadingEachArticle: true, errorEachArticle: ''};
    }
    case GET_EACH_ARTICAL_SUCCESS: {
      return {
        ...state,
        loadingEachArticle: false,
        eachArticle: action.payload.data,
        errorEachArticle: '',
      };
    }
    case GET_EACH_ARTICAL_FAILED: {
      return {
        ...state,
        loadingEachArticle: false,
        errorEachArticle: action.payload.message,
      };
    }

    default: {
      return state;
    }
  }
}
