import axios, { AxiosError } from "axios";
import { useAxiosContext } from "./context";

export type Method = "GET" | "POST" | "PUT" | "DELETE";
export type Return = "DEFAULT" | Record<string, any>;

export type AxiosParams<T extends Method> = T extends "POST" | "PUT"
  ? { method: T; data: any; url: string }
  : { method: T; url: string };

export type AxiosReturn<U, DefaultReturn, DefaultError> = U extends "DEFAULT"
  ? { execute: () => Promise<DefaultReturn | AxiosError<DefaultError>> }
  : { execute: () => Promise<U | AxiosError<DefaultError>> };

export const useAxios = <T extends Method, U extends Return>(
  params: AxiosParams<T>,
  useDefault: boolean = false
): AxiosReturn<U, typeof defaultReturn, typeof defaultError> => {
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
      return error as AxiosError<typeof defaultError>;
    }
  };

  return { execute } as AxiosReturn<U, typeof defaultReturn, typeof defaultError>;
};
