import axios from 'axios';
import CONFIG from 'config';

import { saveToLocalStorage, removeFromLocalStorage, getFromLocalStorage } from 'utils/localStorage/localStorage';

export const loginUser = (email, password) => axios
  .post(CONFIG.API_URL.AUTH,
    {
      email,
      password
    }
  )
  .then((data) => {
    saveToLocalStorage(CONFIG.ACCESS_TOKEN, data.token);
    return true;
  })
  .catch((err) => {
    console.error(err);
    return false;
  });

export const logoutUser = () => {
  removeFromLocalStorage(CONFIG.ACCESS_TOKEN);
  window.location.href = CONFIG.UI_URL.HOME;
};

export const isUserLoggedIn = () => {
  const accessToken = getFromLocalStorage(CONFIG.ACCESS_TOKEN);
  if (!accessToken) {
    return false;
  }
  return true;
};