import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
} from 'axios';
import { DatabaseManager } from './database.manager';
import { ConfigEntity } from 'src/entity';
import { DataSource } from 'typeorm';
// import { ConfigService } from './database.manager';
// import { State } from 'src/app.state';

axios.defaults.timeout = 5000;

axios.defaults.headers.common = {
  Accept: '*/*',
  referer: 'https://t.bilibili.com/',
  Connection: 'keep-alive',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
};

axios.interceptors.request.use(
  (config) => {
    config.headers.cookie = '';
    config.maxContentLength = Infinity;
    config.maxBodyLength = Infinity;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

let dataSource: DataSource | null = null;

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { status } = response;
    if (status >= 200 || status < 300) {
      if (typeof response.data.code === 'number' && response.data.code !== 0) {
        console.error('登录过期，请刷新登录信息');

        dataSource = dataSource || DatabaseManager.getDataSource();
        const cfgRepository = dataSource.getRepository(ConfigEntity);

        /* cfgRepository.update(
          {
            id: 1,
          },
          {
            value: 'false',
            type: 'boolean',
          },
        ); */
      }

      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  (error: AxiosError) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export const rq = function <T>(config: AxiosRequestConfig): AxiosPromise<T> {
  return axios(config) as AxiosPromise<T>;
};
