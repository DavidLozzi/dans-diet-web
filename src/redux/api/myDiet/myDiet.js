import axios from 'axios';
import CONFIG from 'config';

export const API_MYDIET_PENDING = 'API_MYDIET_PENDING';
export const API_MYDIET_SUCCESS = 'API_MYDIET_SUCCESS';
export const API_MYDIET_FAILURE = 'API_MYDIET_FAILURE';
export const API_MYDIET_GET_PENDING = 'API_MYDIET_GET_PENDING';
export const API_MYDIET_GET_SUCCESS = 'API_MYDIET_GET_SUCCESS';
export const API_MYDIET_GET_FAILED = 'API_MYDIET_GET_FAILED';
export const API_MYDIET_SAVE_PENDING = 'API_MYDIET_SAVE_PENDING';
export const API_MYDIET_SAVE_SUCCESS = 'API_MYDIET_SAVE_SUCCESS';
export const API_MYDIET_SAVE_FAILED = 'API_MYDIET_SAVE_FAILED';
export const API_MYDIET_UPDATE_PENDING = 'API_MYDIET_UPDATE_PENDING';
export const API_MYDIET_UPDATE_SUCCESS = 'API_MYDIET_UPDATE_SUCCESS';
export const API_MYDIET_UPDATE_FAILED = 'API_MYDIET_UPDATE_FAILED';
export const API_MYDIET_DELETE_PENDING = 'API_MYDIET_DELETE_PENDING';
export const API_MYDIET_DELETE_SUCCESS = 'API_MYDIET_DELETE_SUCCESS';
export const API_MYDIET_DELETE_FAILED = 'API_MYDIET_DELETE_FAILED';

export const name = 'mydiet';

const sources = [];
const initialState = {
  diets: [],
  diet: {},
  loading: true,
  error: false,
  errorMessage: ''
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
  getDiet: (id) => async (dispatch) => {
    const newSource = axios.CancelToken.source();
    sources.push(newSource);

    dispatch({ type: API_MYDIET_GET_PENDING });

    try {
      const response = await axios.get(CONFIG.API_URL.DIET(id), { cancelToken: newSource.token });
      dispatch({ type: API_MYDIET_GET_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: API_MYDIET_GET_FAILED, payload: error });
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
  },
  updateDiet: (diet) => async (dispatch) => {
    const newSource = axios.CancelToken.source();
    sources.push(newSource);

    dispatch({ type: API_MYDIET_UPDATE_PENDING });

    try {
      const response = await axios.put(CONFIG.API_URL.DIET(diet._id),
        { ...diet },
        { cancelToken: newSource.token });
      dispatch({ type: API_MYDIET_UPDATE_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: API_MYDIET_UPDATE_FAILED, payload: error });
    }
  },
  deleteDiet: (dietId) => async (dispatch) => {
    const newSource = axios.CancelToken.source();
    sources.push(newSource);

    dispatch({ type: API_MYDIET_DELETE_PENDING });

    try {
      const response = await axios.delete(CONFIG.API_URL.DIET(dietId),
        { cancelToken: newSource.token });
      dispatch({ type: API_MYDIET_DELETE_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: API_MYDIET_DELETE_FAILED, payload: error });
    }
  }
  // cancel: () => async (dispatch) => {
  //   //TODO
  // }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_MYDIET_DELETE_PENDING:
    case API_MYDIET_UPDATE_PENDING:
    case API_MYDIET_SAVE_PENDING:
    case API_MYDIET_GET_PENDING:
    case API_MYDIET_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
      };
    case API_MYDIET_DELETE_FAILED:
    case API_MYDIET_UPDATE_FAILED:
    case API_MYDIET_SAVE_FAILED:
    case API_MYDIET_GET_FAILED:
    case API_MYDIET_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload
      };
    case API_MYDIET_DELETE_SUCCESS:
    case API_MYDIET_UPDATE_SUCCESS:
    case API_MYDIET_SAVE_SUCCESS:
    case API_MYDIET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        diets: action.payload
      };
    case API_MYDIET_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        diet: action.payload
      };
    default:
      return state;
  }
}
