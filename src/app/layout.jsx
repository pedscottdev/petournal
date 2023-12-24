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
import { useRouter } from "next/navigation";
import { SocketContext } from "../core/socket/socket";
import socketio from "socket.io-client";
// import { Inter } from 'next/font/google'

// const font = Inter ({ subsets: ['latin'] })
const queryClient = new QueryClient();
export default function RootLayout({ children }) {
    const router = useRouter();
    const tokenLocal = store.getState().user.accessToken;
    const [socket, setSocket] = React.useState(null);

    React.useEffect(() => {
        if (tokenLocal) {
            const newSocket = socketio(process.env.HOST, {
                extraHeaders: { Authorization: `${tokenLocal}` },
            });
            setSocket(newSocket);

            return () => {
                // Cleanup function to close the socket when the component unmounts
                newSocket.close();
            };
        }
    }, [tokenLocal]);

    React.useEffect(() => {
        if (!tokenLocal) {
            router.push("/login");
        }
    }, [tokenLocal]);

    return (
        <html lang="en">
            <head>
                <title>Petournal</title>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="">
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <PersistGate persistor={persistor} loading={null}>
                            <SocketContext.Provider value={socket}>
                                <div className="">
                                    <Sidebar />
                                    <div className=" sm:ml-[80px] xl:ml-[275px]">
                                        <Toaster />
                                        <Header />
                                        {children}
                                    </div>
                                </div>
                                <ProgressBar
                                    height="4px"
                                    color="#9B66FD"
                                    options={{ showSpinner: false }}
                                    // shallowRouting
                                />
                            </SocketContext.Provider>
                        </PersistGate>
                    </QueryClientProvider>
                </Provider>
            </body>
        </html>
    );
}
