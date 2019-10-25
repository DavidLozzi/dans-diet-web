const CONFIG = {
  APP_NAME: 'Dan&apos;s Diet',
  SERVER_URL: 'http://localhost:3001/',
  API_URL: {
    AUTH: '/auth',
    DIETS: '/diet'
  },
  ACCESS_TOKEN: 'dansdiet-token-storage',
  UI_URL: {
    HOME: '/',
    LANDING: '/landing',
    MYDIET: '/mydiet',
    ERROR: (code) => `/error/${code}`
  },
  DISPLAY_TEXT: {
    ERROR_MESSAGES: {
      AUTH_FAILED: 'authorization failed',
      FORBIDDEN: 'forbidden',
      NOT_FOUND: 'not found',
      UNKNOWN_CODE: 'unknown code',
      NETWORK_ERROR: 'network error'
    }
  },
  EXTERNAL_LINKS: {
    COPYRIGHT: 'https://davidlozzi.com'
  }
};

export default CONFIG;