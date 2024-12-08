"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider {...themeProps} navigate={router.push}>
          {children}
          <Toaster />
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
}
