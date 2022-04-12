import { ReactNode, useCallback, useState, useMemo, createContext } from "react";

import { GraphQLClient } from "graphql-request";
import { NEXT_PUBLIC_HASURA_END_POINT, NEXT_PUBLIC_HASURA_ADMIN_SECRET } from "configurations";

import LocalStorageUtils from "utils/LocaltorageUtils";

interface QueryClientContextProps {
    queryClient: GraphQLClient;
    updateQueryClient: (token: string) => void;
}

export const GraphQLQueryClientContext = createContext({} as QueryClientContextProps);
const GraphQLQueryClientContextProvider = ({ children }: { children: ReactNode }) => {
    const defaultQueryClient = useMemo(() => {
        const queryClient = new GraphQLClient(NEXT_PUBLIC_HASURA_END_POINT, {
            headers: {
                Authorization: `Bearer ${LocalStorageUtils.getToken()}`,
                "x-hasura-admin-secret": NEXT_PUBLIC_HASURA_ADMIN_SECRET,
            },
        });
        return queryClient;
    }, []);

    const [queryClient, setQueryClient] = useState<GraphQLClient>(defaultQueryClient);

    const updateQueryClient = useCallback((token: string) => {
        const queryClient = new GraphQLClient(NEXT_PUBLIC_HASURA_END_POINT, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-hasura-admin-secret": NEXT_PUBLIC_HASURA_ADMIN_SECRET,
            },
        });
        setQueryClient(queryClient);
    }, []);

    const memoValue = useMemo(() => {
        return {
            queryClient,
            updateQueryClient,
        };
    }, [queryClient, updateQueryClient]);

    return (
        <GraphQLQueryClientContext.Provider value={memoValue}>
            {children}
        </GraphQLQueryClientContext.Provider>
    );
};

export default GraphQLQueryClientContextProvider;
