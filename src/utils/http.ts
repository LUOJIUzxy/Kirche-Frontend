/* eslint-disable linebreak-style */
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  ENDPOINT,
  HTTP_METHOD,
  XSRF_COOKIE,
  XSRF_TOKEN,
} from '../constants/api';

const http: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080',
  //baseURL: process.env.NEXT_APP_BASE_URL,
  timeout: 5000,
});

//intercept（拦截）requests
//only used to add X-XSRF-TOKEN header to all requests
http.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    if (config.method === HTTP_METHOD.GET.toLowerCase()) {
      //because if it's a GET method, we don't add any X-XSRF-TOKEN
      return config;
    }

    const headers = config.headers;
    // console.log('config.headers.getContentType');
    // console.log(config.headers.getContentType);

    if (
      config.method === HTTP_METHOD.POST.toLowerCase() ||
      config.method === HTTP_METHOD.PATCH.toLowerCase()
    ) {
      // add header
      // TODO: check if it is needed to add this header
      // headers['Content-Type'] = 'application/json';
    }

    let token_name = XSRF_COOKIE.AUTH;
    let token_key = XSRF_TOKEN.AUTH;
    let token_value = '';
    let token_url = ENDPOINT.AUTH.CSRF;

    for (const prefix in ENDPOINT) {
      const endPoint = ENDPOINT[prefix];
      //check which request it is(the url in the config
      //[the request we intercepts/'re gonna send] matches which ENDPOINT)
      //more precisely, if the request belongs to our ENDPOINT,
      //we're going to add the X for it
      if (Object.values(endPoint).includes(config.url)) {
        //although they're all the same for XSRF_TOEKN/COOKIE
        token_key = XSRF_TOKEN[prefix];
        token_name = XSRF_COOKIE[prefix];
        //only ENDPOINT[AUTH] contains CSRF endpoint?
        token_url = endPoint.CSRF;
      }
    }

    if (document.cookie) {
      token_value = document.cookie
        .split(token_name + '=')?.[1]
        .split(';')?.[0];
    }
    //if there's no cookie existing for now
    if (!token_value) {
      //get the cookie(X-XSRF-TOKEN) from
      await XSRF_TOKEN.getToken(token_url);
      token_value = document.cookie
        .split(token_name + '=')?.[1]
        .split(';')?.[0];
      headers[token_key] = token_value;
    } else {
      headers[token_key] = token_value;
    }

    return config;
  },
  (error: AxiosError) => {
    Promise.reject(
      (error.response && error.response.data) ||
        'Something went wrong with the Request'
    );
  }
);

//called when doing info exchange with backend
http.interceptors.response.use(
  (response) => {
    //console.log('??????');
    return response;
  },
  (error) =>
    Promise.reject(
      (error.response && error.response.data) ||
        'Something went wrong with the response'
    )
);

// export default axiosInstance;
export default http;
