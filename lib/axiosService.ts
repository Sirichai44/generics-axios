import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAxiosContext } from './context';


export const axiosService = async <T>(
  config: AxiosRequestConfig
): Promise<T | AxiosError> => {
  const { headerDefault, defaultError } = useAxiosContext();

  try {
    const response = await axios({
      ...config,
      headers: {
        ...headerDefault,
        ...config.headers, 
      },
    });

    return response.data;
  } catch (error) {
    return error instanceof AxiosError ? error : defaultError;
  }
};
