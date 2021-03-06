import { useMemo } from "react";
import { initApolloClient } from "../withApollo";

export function useApollo(initialState: any) {
  const store = useMemo(() => initApolloClient(initialState), [initialState]);
  return store;
}
