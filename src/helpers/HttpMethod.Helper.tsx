import axios, { AxiosRequestConfig, Canceler } from 'axios';

const allPendingRequestsRecord: { id: string; cancel: Canceler }[] = [];
const getUniqueId = (config: AxiosRequestConfig) => `url=${config.url}&method=${config.method}`;

/**
 * @author Aladdin Al-Awadat (alaamohammadyou@gmail.com)
 * @description this is to intercept any request before go to the backend & send
 * the common headers like token with it
 */
axios.interceptors.request.use(
  (configurations: AxiosRequestConfig) => {
    const configurationsLocal: AxiosRequestConfig = configurations;
    configurationsLocal.cancelToken = new axios.CancelToken((cancel) => {
      allPendingRequestsRecord.push({ id: getUniqueId(configurations), cancel });
    });
    configurationsLocal.headers = {
      'Content-Type': 'application/json',
    };
    return configurationsLocal;
  },
  (error) => {
    Promise.reject(error);
  }
);

/**
 * @author Aladdin Al-Awadat (alaamohammadyou@gmail.com)
 * @description this method is to remove all requests when change the page (on destroy or logout)
 */
export const removeAllPendingRequestsRecordHttp = () => {
  allPendingRequestsRecord.forEach((item) => {
    item.cancel('page changes'); // cancel request
  });
  allPendingRequestsRecord.splice(0); // remove all records
};

// interceptors for handle any  response
axios.interceptors.response.use(
  (response) => response,
  (error) => error.response
);

export const HttpServices = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
