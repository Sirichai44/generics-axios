import React, { createContext, useContext, ReactNode } from "react";
import { useAxios } from "./useAxios";
import { isAxiosError } from "axios";

type AxiosDefaults<DefaultReturn, DefaultError> = {
  defaultReturn: DefaultReturn;
  defaultError: DefaultError;
  headerDefault: Record<string, any>;
};

const AxiosContext = createContext<AxiosDefaults<any, any> | null>(null);

export const AxiosProvider = <DefaultReturn, DefaultError>({
  children,
  defaults,
}: {
  children: ReactNode;
  defaults: AxiosDefaults<DefaultReturn, DefaultError>;
}) => {
  return (
    <AxiosContext.Provider value={defaults}>{children}</AxiosContext.Provider>
  );
};

export const useAxiosContext = <DefaultReturn, DefaultError>() => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxiosContext must be used within an AxiosProvider");
  }
  return context as AxiosDefaults<DefaultReturn, DefaultError>;
};