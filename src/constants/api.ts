// End points
export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
};

export const XSRF_TOKEN: any = {
  AUTH: 'X-XSRF-TOKEN',
  BASIC_INFORMATION: 'X-XSRF-TOKEN',
};

export const XSRF_COOKIE: any = {
  AUTH: 'XSRF-TOKEN',
  BASIC_INFORMATION: 'XSRF-TOKEN',
};

export const ENDPOINT: any = {
  AUTH: {
    VALIDATE: '/auth/validate-jwt',
    CLEAN: '/auth/clean',
    CSRF: '/auth/csrf',
    PUBLIC_KEY: '/auth/pkey',
    LOGIN: '/auth/jwe',
  },
  BASIC_INFORMATION: {
    CONTACT: '/basic-information/contact',
  }
};