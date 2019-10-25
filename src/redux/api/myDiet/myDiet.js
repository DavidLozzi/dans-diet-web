import axios from 'axios';
import CONFIG from 'config';

export const API_MYDIET_PENDING = 'API_MYDIET_PENDING';
export const API_MYDIET_SUCCESS = 'API_MYDIET_SUCCESS';
export const API_MYDIET_FAILURE = 'API_MYDIET_FAILURE';
export const API_MYDIET_SAVE_PENDING = 'API_MYDIET_SAVE_PENDING';
export const API_MYDIET_SAVE_SUCCESS = 'API_MYDIET_SAVE_SUCCESS';
export const API_MYDIET_SAVE_FAILED = 'API_MYDIET_SAVE_FAILED';

export const name = 'mydiet';

const sources = [];
const initialState = {
  diets: [],
  loading: false,
  error: false,
  errorMessage: ''
};

export const selectors = {
  getDiets: (state) => state[name].diets,
  getLoading: (state) => state[name].loading,
  getError: (state) => state[name].error,
  getErrorMessage: (state) => state[name].errorMessage
};

export const actions = {
  loadDiets: () => async (dispatch) => {
    const newSource = axios.CancelToken.source();
    sources.push(newSource);

    dispatch({ type: API_MYDIET_PENDING });

    try {
      const response = await axios.get(CONFIG.API_URL.DIETS, { cancelToken: newSource.token });
      dispatch({ type: API_MYDIET_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: API_MYDIET_FAILURE, payload: error });
    }
  },
  saveDiet: (title, description) => async (dispatch) => {
    const newSource = axios.CancelToken.source();
    sources.push(newSource);

    dispatch({ type: API_MYDIET_SAVE_PENDING });

    try {
      const response = await axios.post(CONFIG.API_URL.DIETS,
        { title, description },
        { cancelToken: newSource.token });
      dispatch({ type: API_MYDIET_SAVE_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: API_MYDIET_SAVE_FAILED, payload: error });
    }
  }
  // cancel: () => async (dispatch) => {
  //   //TODO
  // }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_MYDIET_SAVE_PENDING:
    case API_MYDIET_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
      };
    case API_MYDIET_SAVE_FAILED:
    case API_MYDIET_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload
      };
    case API_MYDIET_SAVE_SUCCESS:
    case API_MYDIET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        diets: action.payload
      };
    default:
      return state;
  }
}
