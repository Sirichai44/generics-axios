import axios, { AxiosError } from "axios";
import { useAxiosContext } from "./context";

export type Method = "GET" | "POST" | "PUT" | "DELETE";
export type Return = "DEFAULT" | Record<string, any>;

export type AxiosParams<T extends Method> = T extends "POST" | "PUT"
  ? { method: T; data: any; url: string }
  : { method: T; url: string };

type AxiosReturn<U, DefaultReturn> = U extends "DEFAULT"
  ? { execute: () => Promise<DefaultReturn | AxiosError<any>> }
  : { execute: () => Promise<U | AxiosError<any>> };

export const useAxios = <T extends Method, U extends Return>(
  params: AxiosParams<T>,
  useDefault: boolean = false
): AxiosReturn<U, any> => {
  const { defaultReturn, defaultError, headerDefault } = useAxiosContext();

  const execute = async () => {
    try {
      const response = await axios({
        ...params,
        headers: {
          ...headerDefault,
        },
      });

      if (useDefault) {
        return defaultReturn
      }

      return response.data;
    } catch (error) {
      return error instanceof AxiosError ? error : defaultError;
    }
  };

  return { execute } as AxiosReturn<U, typeof defaultReturn>;
};


