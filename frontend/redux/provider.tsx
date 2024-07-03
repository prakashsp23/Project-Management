"use client";

// import {store} from "@/redux/store";
import { Provider } from "react-redux";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
  // <Provider store={store}>{children}</Provider>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          {children}
          </PersistGate>
        </Provider>
);

};
