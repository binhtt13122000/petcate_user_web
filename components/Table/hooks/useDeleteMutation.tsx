import useQueryClient from "hooks/useQueryClient";
import { useMutation } from "react-query";
import { gql } from "graphql-request";
import { AlertColor } from "@mui/material";
const useDeleteMutation = (
    query: string,
    refectPage: () => void,
    showSnackbarStatus: (message: string, type: AlertColor) => void
) => {
    const queryClient = useQueryClient();
    const result = useMutation(
        [""],
        async (variable: { id: number }) => {
            const result = queryClient.request(
                gql`
                    ${query}
                `,
                variable
            );
            return result;
        },
        {
            onError: () => {
                showSnackbarStatus("error:deleteError", "error");
            },
            onSuccess: () => {
                refectPage();
                showSnackbarStatus("success:deleteSuccess", "success");
            },
        }
    );
    return result;
};

export default useDeleteMutation;
