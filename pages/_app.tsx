import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import {ThemeProvider} from "@primer/react";

import '../styles/globals.css'
import store, {persistor} from "../store/store";
import {PersistGate} from "redux-persist/integration/react";

export default function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider>
                    <Component {...pageProps} />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    )
}
