import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppChildren } from "../types/provider";
import { APP_ENV } from "../config/env";

const client = new QueryClient();

function AppProviders({ children }: AppChildren) {
  return (
    <>
      <QueryClientProvider client={client}>
        <Provider store={store}>{children}</Provider>
        {APP_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={true} />
        )}
      </QueryClientProvider>
    </>
  );
}

export default AppProviders;
