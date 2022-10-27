import { AxiosError, AxiosResponse } from "axios";
import { DependencyList, useEffect, useReducer } from "react";

type AsyncData = AxiosResponse<any, any> | null;
type AsyncError = AxiosError | Error | null | boolean;

export type RequestState = {
  loading: boolean;
  data: AsyncData;
  error: AsyncError;
};

export type Action =
  | { type: "LOADING" }
  | { type: "SUCCESS"; data: AsyncData }
  | { type: "ERROR"; error: AsyncError };

function asyncReducer(state: RequestState, action: Action): RequestState {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
}

const initialState: RequestState = {
  loading: false,
  data: null,
  error: false,
};

export function useAsync(
  callback: () => Promise<any>,
  deps: DependencyList = []
): [RequestState, () => Promise<void>] {
  const [state, dispatch] = useReducer(asyncReducer, initialState);
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      dispatch({ type: "SUCCESS", data });
    } catch (e: any) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return [state, fetchData];
}
