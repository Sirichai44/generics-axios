// useAxios.ts
import { useState } from 'react';
import { axiosService } from './axiosService';
import { AxiosError, AxiosRequestConfig } from 'axios';

export type Method = "GET" | "POST" | "PUT" | "DELETE";
export type Return = "DEFAULT" | Record<string, any>;

export type AxiosParams<T extends Method> = T extends "POST" | "PUT"
  ? { method: T; data: any; url: string }
  : { method: T; url: string };

// ฟังก์ชัน `useAxios` สำหรับ React component
export const useAxios = <T extends Method, U extends Return>(
  params: AxiosParams<T>,
  useDefault: boolean = false
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<U | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const execute = async () => {
    setLoading(true);
    try {
      const result = await axiosService<U>(params);

      if (useDefault) {
        setData(result as U);
      } else {
        setData(result);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof AxiosError ? err : new AxiosError('Unknown Error'));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { execute, data, error, loading };
};
