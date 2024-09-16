import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
} from 'axios';
import { DatabaseManager } from './database.manager';
// import { ConfigService } from './database.manager';
// import { State } from 'src/app.state';

axios.defaults.timeout = 5000;

axios.defaults.headers.common = {
  Accept: '*/*',
  referer: 'https://t.bilibili.com/',
  Connection: 'keep-alive',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
};

axios.interceptors.request.use(
  async (config) => {
    const cookies = await DatabaseManager.getUserAccount();
    config.headers.cookie = cookies;
    config.maxContentLength = Infinity;
    config.maxBodyLength = Infinity;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { status } = response;
    if (status >= 200 || status < 300) {
      if (typeof response.data.code === 'number' && response.data.code !== 0) {
        console.error('登录过期，请刷新登录信息');

        const cfgRepository = DatabaseManager.getConfigRepository();
        cfgRepository.update(
          {
            type: 'system',
          },
          {
            value: 'error|登录过期，请更新登录信息',
            type: 'notify',
          },
        );
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

export const rq = async function <T>(
  config: AxiosRequestConfig,
): Promise<RqResponseType<T>> {
  const res = await (axios(config) as AxiosPromise<RqResponseType<T>>);
  if (res.status === 200) {
    return res.data;
  }

  return Promise.reject(res);
};

export default axios;
