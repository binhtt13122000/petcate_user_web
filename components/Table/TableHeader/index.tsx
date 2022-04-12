import { ITableHeader, IColumn } from "../models";

import { TableHead, TableRow, TableCell, TableSortLabel, Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useTranslation } from "next-i18next";

export const TableHeader: React.FC<ITableHeader> = (props: ITableHeader) => {
    const { columns, isHaveAction = true, enableSort = false, orderBy, createSortHandler } = props;
    const { t } = useTranslation();
    return (
        <TableHead>
            <TableRow style={{ width: "100%" }}>
                {columns.map((column: IColumn, index: number) => {
                    return (
                        <TableCell
                            width={column.width || undefined}
                            sortDirection={orderBy.field === column.field ? orderBy.order : "asc"}
                            key={index}
                            align={column.align || "left"}
                        >
                            {enableSort && !column.disableSort ? (
                                <TableSortLabel
                                    active={orderBy.field === column.field}
                                    direction={
                                        orderBy.field === column.field ? orderBy.order : "asc"
                                    }
                                    onClick={() => createSortHandler(column.field, orderBy.order)}
                                >
                                    {t(column.title)}
                                    {orderBy.field === column.field ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {orderBy.order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            ) : (
                                t(column.title)
                            )}
                        </TableCell>
                    );
                })}
                {isHaveAction && (
                    <TableCell align="center" width={160}>
                        {t("table:manipulation")}
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};
