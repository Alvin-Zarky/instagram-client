import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppChildren } from "../types/provider";

const client = new QueryClient();

function AppProviders({ children }: AppChildren) {
  return (
    <>
      <QueryClientProvider client={client}>
        <Provider store={store}>{children}</Provider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default AppProviders;
