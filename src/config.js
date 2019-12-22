const CONFIG = {
  APP_NAME: 'Dan&apos;s Diet',
  SERVER_URL: 'http://localhost:3001/',
  API_URL: {
    AUTH: '/auth',
    DIETS: '/diet',
    VIEW: '/view',
    DIET: (dietId) => `/diet/${dietId}`,
    VIEW_DIET: (shareId) => `/view/${shareId}`,
    SHARE_DIET: (dietId) => `/diet/${dietId}/share`,
    UNSHARE_DIET: (dietId) => `/diet/${dietId}/unshare`,
    FOOD: '/food',
    AFOOD: (foodId) => `/food/${foodId}`
  },
  ACCESS_TOKEN: 'dansdiet-token-storage',
  UI_URL: {
    HOME: '/',
    LANDING: '/landing',
    MYDIET: '/mydiet',
    ERROR: (code) => `/error/${code}`,
    FOOD: (dietId) => `/mydiet/${dietId}/food`,
    VIEWDIET: '/viewdiet',
    VIEW: (shareId) => `/viewdiet/${shareId}`
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
  },
  OPTIONS: {
    ADD: 'Add',
    EDIT: 'Edit'
  },
  RESTRICTIONS: {
    RESTRICTED: 'Restricted',
    ALLOWED: 'Allowed'
  }
};

export default CONFIG;