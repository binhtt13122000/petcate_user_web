import useQueryClient from "hooks/useQueryClient";
import { useQuery } from "react-query";
import { gql } from "graphql-request";

const useGetListEntity = (
    entity: string,
    displayField: string,
    search: string,
    extraFilterString: string = ""
) => {
    const quyeryClient = useQueryClient();
    search = `%${search}%`;
    return useQuery(["Get" + entity + displayField, search], async () => {
        return quyeryClient.request(
            gql`
            query GetEntityList($search: String = "%%") {
                ${entity}(limit: 5, where: {${displayField}: {_ilike: $search}, ${extraFilterString}}) {
                    key: id
                    value: ${displayField}
                }
            }
        `,
            {
                search: search,
            }
        );
    });
};

export default useGetListEntity;
