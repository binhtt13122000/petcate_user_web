import { useContext } from "react";

import { GraphQLQueryClientContext } from "context/QueryClientContext";

function useQueryClient() {
    const { queryClient } = useContext(GraphQLQueryClientContext);

    return queryClient;
}

export default useQueryClient;
