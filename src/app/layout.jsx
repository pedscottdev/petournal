"use client";
import * as React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { persistor, store } from "../core/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
// import { Inter } from 'next/font/google'

// const font = Inter ({ subsets: ['latin'] })
const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Petournal</title>
        {/* <link type="icon"></link> */}
      </head>
      <body>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <PersistGate persistor={persistor} loading={null}>
              <div>
                <Sidebar />
                <div className="sm:ml-[80px] xl:ml-[275px]">
                  <Toaster />
                  <Header />
                  {children}
                </div>
              </div>
              <ProgressBar
                height="4px"
                color="#9B66FD"
                options={{ showSpinner: true }}
                shallowRouting
              />
            </PersistGate>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
