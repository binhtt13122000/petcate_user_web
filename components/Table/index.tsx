import {
    Box,
    Paper,
    Toolbar,
    Typography,
    Tooltip,
    IconButton,
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    TablePagination,
    Table,
    LabelDisplayedRowsArgs,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import useTableQuery from "./hooks/useTableQuery";
import { ITable, Order, TypeRecord } from "./models";
import { TableHeader } from "./TableHeader";
import { TableData } from "./TableData";
import { AddBoxRounded } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { CheckboxesHeader } from "./CheckboxesHeader";
import { IColumn } from "./models/index";
import { FilterTable } from "./FilterTable";

const CRUDTable = (props: ITable & { children?: React.ReactNode }) => {
    const { t } = useTranslation();
    const { columns, entity, firstOrderField, defaultFilter, defaultFilterForCount, queryKey } =
        props;
    const [paging, setPaging] = useState<{ offset: number; limit: number }>({
        offset: 0,
        limit: 5,
    });

    const [selectedColumns, setSelectedColumns] = useState<IColumn[]>([...columns]);
    const [orderBy, setOrderBy] = useState<{ field: string; order: Order }>({
        field: firstOrderField,
        order: "desc",
    });

    const generateFilter = () => {
        let fields = columns
            .filter((column) => !column.disable)
            .filter((column) => !column.disableFilter)
            .map((column) => {
                return {
                    type: column.type,
                    value: column.field,
                };
            });
        let obj: Record<
            string,
            { value: string | Array<{ key: string; value: string }>; type: TypeRecord }
        > = {};
        fields.forEach((field) => {
            if (field.type === "enum") {
                const index: number = columns?.findIndex((x: IColumn) => x.field === field.value);
                if (index !== -1) {
                    const value = columns[index].enumValue || [];
                    obj[field.value] = {
                        value: value,
                        type: "enum",
                    };
                }
            } else {
                obj[field.value] = {
                    value: "",
                    type: field.type || "string",
                };
            }
        });
        return obj;
    };

    const [filters, setFilters] = useState(generateFilter());

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        filters[name].value = value;
        setFilters({ ...filters });
    };

    const onTimeHandleChange = (date: Date | null, name: string) => {
        if (date != null) {
            filters[name].value = String(date);
            setFilters({ ...filters });
        }
    };

    const onEnumHandleChange = (name: string, data: Array<{ key: string; value: string }>) => {
        filters[name].value = data;
        setFilters({ ...filters });
    };

    const { isLoading, data, isError, refetch } = useTableQuery(
        queryKey,
        [...selectedColumns],
        paging.limit,
        paging.offset,
        entity,
        orderBy.field,
        orderBy.order,
        filters,
        defaultFilter,
        defaultFilterForCount
    );

    const refetchPage = () => {
        refetch();
        setPaging(() => {
            return {
                offset: 0,
                limit: 5,
            };
        });
    };

    const onAddHandler = () => {
        if (props.action?.onAdd) {
            props.action?.onAdd(() => {
                refetchPage();
            });
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPaging(() => {
            return {
                offset: newPage,
                limit: 5,
            };
        });
        refetch();
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPaging(() => {
            return {
                offset: 0,
                limit: parseInt(event.target.value, 10),
            };
        });
        refetch();
    };

    const createSortHandler = (field: string, direction: Order) => {
        setOrderBy({
            ...orderBy,
            field: field,
            order: direction === "asc" ? "desc" : "asc",
        });
    };

    const total = data
        ? data[`${entity}_aggregate`]
            ? data[`${entity}_aggregate`]["aggregate"]
                ? data[`${entity}_aggregate`]["aggregate"]["count"]
                : 0
            : 0
        : 0;

    const emptyRows = data ? paging.limit - (data[entity] ? data[entity].length : 0) : 0;

    const labelDisplayedRows = (paginationInfo: LabelDisplayedRowsArgs) => {
        const { from, to, count } = paginationInfo;
        return String(t("table:pagination", { from, to, count }));
        // return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
    };

    if (isError) {
        return <div>error</div>;
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2, overflowX: "auto" }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    }}
                >
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {t(`${props.title}`)}
                    </Typography>
                    <React.Fragment>
                        <CheckboxesHeader
                            selectedColumns={selectedColumns.filter((col) => !col.disable)}
                            setSelectedColumns={setSelectedColumns}
                            columns={columns.filter((col) => !col.disable)}
                        />
                        {!!props?.action?.onAdd && (
                            <Tooltip title={String(t("table:addTooltip"))}>
                                <IconButton size="large" onClick={() => onAddHandler()}>
                                    <AddBoxRounded />
                                </IconButton>
                            </Tooltip>
                        )}
                    </React.Fragment>
                </Toolbar>
                <TableContainer style={{ width: "100%" }}>
                    <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                        <TableHeader
                            enableSort={props.sort}
                            columns={selectedColumns.filter((col) => !col.disable)}
                            isHaveAction={
                                !!props?.action?.onEdit ||
                                !!props?.action?.deleteQuery ||
                                !!props?.action?.onView
                            }
                            orderBy={orderBy}
                            createSortHandler={createSortHandler}
                        />
                        <TableBody>
                            {props.enableFilter && (
                                <FilterTable
                                    onChange={onHandleChange}
                                    filters={filters}
                                    columns={selectedColumns.filter((col) => !col.disable)}
                                    isHaveAction={
                                        !!props?.action?.deleteQuery ||
                                        !!props?.action?.onEdit ||
                                        !!props?.action?.onView
                                    }
                                    onTimeHandleChange={onTimeHandleChange}
                                    onEnumHandleChange={onEnumHandleChange}
                                />
                            )}
                            {isLoading ? (
                                <TableRow
                                    style={{
                                        height: 53 * (paging.limit || 5),
                                    }}
                                >
                                    <TableCell colSpan={selectedColumns.length + 1}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <CircularProgress />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <React.Fragment>
                                    <TableData
                                        rowPerPage={paging.limit}
                                        rows={data[entity] || []}
                                        columns={selectedColumns.filter((col) => !col.disable)}
                                        isHaveActionDelete={!!props?.action?.deleteQuery}
                                        deleteQuery={props?.action?.deleteQuery}
                                        isHaveActionEdit={!!props?.action?.onEdit}
                                        isHaveActionView={!!props?.action?.onView}
                                        page={paging?.offset}
                                        action={props.action}
                                        refetchPage={refetchPage}
                                    />
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: 53 * emptyRows,
                                            }}
                                        >
                                            <TableCell
                                                colSpan={
                                                    !!props?.action?.deleteQuery ||
                                                    !!props?.action?.onEdit ||
                                                    !!props?.action?.onView
                                                        ? selectedColumns.length + 1
                                                        : selectedColumns.length
                                                }
                                            />
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={total}
                        rowsPerPage={paging.limit}
                        page={Math.min(total, paging.offset)}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelDisplayedRows={labelDisplayedRows}
                        labelRowsPerPage={String(t("table:labelRowsPerPage"))}
                    />
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default CRUDTable;
