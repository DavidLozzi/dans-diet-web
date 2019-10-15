/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';
import CONFIG from 'config';

import { getFromLocalStorage } from 'utils/localStorage/localStorage';

axios.defaults.baseURL = CONFIG.SERVER_URL;

axios.interceptors.request.use((config) => {
  let accessToken = null;
  if (config.url.indexOf(CONFIG.AUTH_URL) === -1) {
    accessToken = getFromLocalStorage(CONFIG.ACCESS_TOKEN);
    if (!accessToken) {
      window.location.href = '/';
      return Promise.reject(new axios.Cancel('Auth failed'));
    }
  }
  return {
    ...config,
    headers: {
      ...config.headers,
      authorization: `Bearer ${accessToken ? accessToken.accessToken.accessToken : null}`
    }
  };
}, (error) => Promise.reject(error)
);

axios.interceptors.response.use((response) => {
  switch (response.status) {
    default:
      return response.data;
  }
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        window.location.reload();
        return Promise.reject(new Error(CONFIG.DISPLAY_TEXT.ERROR_MESSAGES.AUTH_FAILED));
      case 403:
        return Promise.reject({ message: CONFIG.DISPLAY_TEXT.ERROR_MESSAGES.FORBIDDEN, error });
      case 404:
        return Promise.reject({ message: CONFIG.DISPLAY_TEXT.ERROR_MESSAGES.NOT_FOUND, error });
      default:
        return Promise.reject(new Error(CONFIG.DISPLAY_TEXT.ERROR_MESSAGES.UNKNOWN_CODE, error.response));
    }
  } else if (error.request) {
    return Promise.reject(new Error(CONFIG.DISPLAY_TEXT.ERROR_MESSAGES.NETWORK_ERROR, error.request));
  } else {
    return Promise.reject({ cancelled: true });
  }
});
