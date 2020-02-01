import axios from 'axios';
import CONFIG from 'config';

export const API_PHOTOS_SUCCESS = 'API_PHOTOS_SUCCESS';
export const API_PHOTOS_PENDING = 'API_PHOTOS_PENDING';
export const API_PHOTOS_FAILED = 'API_PHOTOS_FAILED';

export const name = 'photos';

const sources = [];
const initialState = {
  state: 'empty', // empty, loading, loaded, error
  photos: [],
  errorMessage: ''
};

export const actions = {
  search: (text) => async (dispatch) => {
    const newSource = axios.CancelToken.source();
    sources.push(newSource);

    dispatch({ type: API_PHOTOS_PENDING, text });

    axios.get(CONFIG.API_URL.PHOTOS(text),
      { cancelToken: newSource.token })
      .then((response) => {
        dispatch({ type: API_PHOTOS_SUCCESS, photos: response });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: API_PHOTOS_FAILED, error });
      });
  }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_PHOTOS_PENDING:
      return {
        ...state,
        state: 'loading',
        errorMessage: ''
      };
    case API_PHOTOS_SUCCESS:
      return {
        ...state,
        state: 'loaded',
        errorMessage: '',
        photos: action.photos
      };
    case API_PHOTOS_FAILED:
      return {
        ...state,
        state: 'error',
        errorMessage: action.error
      };
    default:
      return state;
  }
}