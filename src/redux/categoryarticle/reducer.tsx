import {Action} from './action';
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

interface InitialState {
  loadingCategoryArticle: boolean;
  loadingAllCategory: boolean;
  errorCategoryArticle?: string;
  categoryData: {
    [key: string]: any;
  };
  allCategory: Array<any>;
  categoryArticle: Array<any>;
  categoryNextPageNo: number;
  category?: string;
  error?: string;
}

const InitialState: InitialState = {
  error: '',
  loadingCategoryArticle: false,
  loadingAllCategory: false,
  categoryNextPageNo: 1,
  category: '',
  categoryData: [],
  categoryArticle: [],
  allCategory: [],
};

export default function categoryReducer(
  state = InitialState,
  action: Action,
): InitialState {
  switch (action.type) {
    case GET_CATEGORIZED_ARTICAL: {
      return {...state, loadingCategoryArticle: true, errorCategoryArticle: ''};
    }
    case GET_CATEGORIZED_ARTICAL_SUCCESS: {
      let stateCategoryData = !!state.categoryArticle
        ? [...state.categoryArticle]
        : [];
      let actionCategoryData = [...action.payload.data.docs];
      let postCategoryData = [...stateCategoryData, ...actionCategoryData];

      return {
        ...state,
        loadingCategoryArticle: false,
        categoryArticle: postCategoryData,
        categoryData: action.payload.data,
        categoryNextPageNo: !!state.categoryNextPageNo
          ? state.categoryNextPageNo + 1
          : 1,
        errorCategoryArticle: '',
      };
    }
    case CLEAR_CATEGORIZED_ARTICAL: {
      return {
        ...state,
        categoryArticle: [],
        categoryData: [],
        categoryNextPageNo: 1,
        errorCategoryArticle: '',
      };
    }
    case GET_CATEGORIZED_ARTICAL_FAILED: {
      return {
        ...state,
        errorCategoryArticle: action.payload.message,
        loadingCategoryArticle: false,
      };
    }
    case SET_CATEGORY: {
      return {
        ...state,
        category: action.payload.selectedCategory,
      };
    }
    case GET_ALL_CATEGORY: {
      return {...state, loadingAllCategory: true, error: ''};
    }
    case GET_ALL_CATEGORY_SUCCESS: {
      console.log('get category success ', action.payload.data.docs[0]);
      return {
        ...state,
        error: '',
        loadingAllCategory: false,
        allCategory: action.payload.data.docs,
        category: action.payload.data.docs[0],
      };
    }
    case GET_ALL_CATEGORY_FAILED: {
      console.log('error: ', action.payload);

      return {
        ...state,
        error: action.payload.message,
        allCategory: [],
        loadingAllCategory: false,
      };
    }
    default: {
      return state;
    }
  }
}
