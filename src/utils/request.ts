import Fly from 'flyio/dist/npm/wx';
import { ServiceBaseURL } from './consts';

const service = new Fly();

service.config.baseURL = `${ServiceBaseURL}/api`;

service.interceptors.request.use((config, promise) => {
  config.headers = {
    Authorization: `Bearer `
  };
  return config;
});

service.interceptors.response.use(
  response => {
    const res = response.data;

    if (res.msg) {
      return Promise.reject(res.msg);
    }

    return res.ret === 0 ? response.data.data : '';
  },
  err => {
    console.error(`service error: `, err);
    return Promise.reject(err);
  }
);

export default service;
