import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAxiosContext } from './context';
import { AxiosReturn } from './useAxios';


export const axiosService = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosReturn<T, unknown, unknown>> => {
  const { headerDefault, defaultError, defaultReturn } = useAxiosContext();

  const execute = async () => {
    try {
      const response = await axios({
        ...config,
        headers: {
          ...headerDefault,
          ...config.headers,
        },
      });

      return response.data as T;
    } catch (error) {
      return error as AxiosError<typeof defaultError>;
    }
  }

  return { execute }  as AxiosReturn<T, typeof defaultReturn, typeof defaultError>;
};
