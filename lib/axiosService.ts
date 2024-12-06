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

    return response.data as T;
  } catch (error) {
    return error as AxiosError<typeof defaultError>;
  }
};
