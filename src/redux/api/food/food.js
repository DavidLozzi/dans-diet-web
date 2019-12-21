import axios from 'axios';
import CONFIG from 'config';

export const API_FOOD_ADD_PENDING = 'API_FOOD_ADD_PENDING';
export const API_FOOD_ADD_SUCCESS = 'API_FOOD_ADD_SUCCESS';
export const API_FOOD_ADD_FAILED = 'API_FOOD_ADD_FAILED';
export const API_FOOD_UPDATE_PENDING = 'API_FOOD_UPDATE_PENDING';
export const API_FOOD_UPDATE_SUCCESS = 'API_FOOD_UPDATE_SUCCESS';
export const API_FOOD_UPDATE_FAILED = 'API_FOOD_UPDATE_FAILED';
export const API_FOOD_DELETE_PENDING = 'API_FOOD_DELETE_PENDING';
export const API_FOOD_DELETE_SUCCESS = 'API_FOOD_DELETE_SUCCESS';
export const API_FOOD_DELETE_FAILED = 'API_FOOD_DELETE_FAILED';

export const name = 'food';

const sources = [];
const initialState = {
  food: {},
  loading: true,
  error: false,
  errorMessage: ''
};

export const actions = {
  addFood: ( food ) => async (dispatch) => {
    const newSource = axios.CancelToken.source();
    sources.push(newSource);

    dispatch({ type: API_FOOD_ADD_PENDING });

    try {
      const response = await axios.post(CONFIG.API_URL.FOOD,
        { ...food },
        { cancelToken: newSource.token });
      dispatch({ type: API_FOOD_ADD_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: API_FOOD_ADD_FAILED, payload: error });
    }
  },
  updateFood: (food) => async (dispatch) => {
    const newSource = axios.CancelToken.source();
    sources.push(newSource);

    dispatch({ type: API_FOOD_UPDATE_PENDING });

    try {
      const response = await axios.put(CONFIG.API_URL.AFOOD(food._id),
        { ...food },
        { cancelToken: newSource.token });
      dispatch({ type: API_FOOD_UPDATE_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: API_FOOD_UPDATE_FAILED, payload: error });
    }
  },
  deleteFood: (dietId) => async (dispatch) => {
    const newSource = axios.CancelToken.source();
    sources.push(newSource);

    dispatch({ type: API_FOOD_DELETE_PENDING });

    try {
      const response = await axios.delete(CONFIG.API_URL.DIET(dietId),
        { cancelToken: newSource.token });
      dispatch({ type: API_FOOD_DELETE_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: API_FOOD_DELETE_FAILED, payload: error });
    }
  }
  // cancel: () => async (dispatch) => {
  //   //TODO
  // }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_FOOD_DELETE_PENDING:
    case API_FOOD_UPDATE_PENDING:
    case API_FOOD_ADD_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
      };
    case API_FOOD_DELETE_FAILED:
    case API_FOOD_UPDATE_FAILED:
    case API_FOOD_ADD_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload
      };
    case API_FOOD_DELETE_SUCCESS:
    case API_FOOD_UPDATE_SUCCESS:
    case API_FOOD_ADD_SUCCESS:
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
