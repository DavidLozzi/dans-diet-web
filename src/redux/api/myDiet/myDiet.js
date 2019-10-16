import axios from 'axios';
import CONFIG from 'config';

export const API_MYDIET_PENDING = 'API_MYDIET_PENDING';
export const API_MYDIET_SUCCESS = 'API_MYDIET_SUCCESS';
export const API_MYDIET_FAILURE = 'API_MYDIET_FAILURE';

export const name = 'mydiet';

const sources = [];
const initialState = {
  diets: [],
  loading: false,
  error: false,
  errorMessage: ''
};

export const selectors = {
  getDiets: (state) => state[name].diets
};

export const actions = {
  loadDiets: () => async (dispatch) => {
    const newSource = axios.CancelToken.source();
    sources.push(newSource);

    dispatch({ type: API_MYDIET_PENDING });

    try {
      const response = await axios.get(CONFIG.API_URL.GETDIETS, { cancelToken: newSource.token });
      dispatch({ type: API_MYDIET_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: API_MYDIET_FAILURE, payload: error });
    }
  },
  // cancel: () => async (dispatch) => {
  //   //TODO
  // }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_MYDIET_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
      };
    case API_MYDIET_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload
      };
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
