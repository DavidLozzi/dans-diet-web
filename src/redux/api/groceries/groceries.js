import axios from 'axios';
import CONFIG from 'config';
import { API_FOOD_ADD_FAILED } from '../food/food';

export const API_GROCERIES_SUCCESS = 'API_GROCERIES_SUCCESS';
export const API_GROCERIES_PENDING = 'API_GROCERIES_PENDING';
export const API_GROCERIES_FAILED = 'API_GROCERIES_FAILED';

export const name = 'groceries';

const sources = [];
const initialState = {
  a: { // a will be the character entered
    state: 'empty', // empty, loading, loaded, error
    options: [],
    errorMessage: ''
  }
};

export const actions = {
  search: (text) => async (dispatch) => {
    const newSource = axios.CancelToken.source();
    sources.push(newSource);

    dispatch({ type: API_GROCERIES_PENDING, text });

    axios.get(CONFIG.API_URL.GROCERIES(text),
      { cancelToken: newSource.token })
      .then((response) => {
        dispatch({ type: API_GROCERIES_SUCCESS, options: response, text });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: API_FOOD_ADD_FAILED, error });
      });
  }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_GROCERIES_PENDING:
      return {
        ...state,
        [action.text]: {
          ...state[action.text],
          state: 'loading',
          errorMessage: '',
          options: []
        }
      };
    case API_GROCERIES_SUCCESS:
      return {
        ...state,
        [action.text]: {
          ...state[action.text],
          state: 'loaded',
          errorMessage: '',
          options: action.options
        }
      };
    case API_GROCERIES_FAILED:
      return {
        ...state,
        [action.text]: {
          ...state[action.text],
          state: 'error',
          errorMessage: action.error
        }
      };
    default:
      return state;
  }
}