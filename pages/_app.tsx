import "../styles/globals.css";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import GraphQLQueryClientContextProvider from "context/QueryClientContext";
import { appWithTranslation } from "next-i18next";
import SnackbarProvider from "context/SnackbarProvider.context";
import { CssBaseline } from "@mui/material";
import { AppPropsWithLayout } from "utils/common";
import DefaultLayout from "components/Layout/DefaultLayout";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const queryClient = new QueryClient({
        queryCache: new QueryCache(),
    });
    const getLayout =
        Component.getLayout ??
        ((page) => {
            return <DefaultLayout>{page}</DefaultLayout>;
        });

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <GraphQLQueryClientContextProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <SnackbarProvider>
                            <CssBaseline />
                            {getLayout(<Component {...pageProps} />)}
                        </SnackbarProvider>
                    </LocalizationProvider>
                </GraphQLQueryClientContextProvider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default appWithTranslation(MyApp);
