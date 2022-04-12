import React, { useState } from "react";

import { ConfirmModal } from "components/ConfirmModel";
import useSnackbar from "components/Snackbar/useSnackbar";

import { ITableData, IColumn } from "../models";

import { ModeEdit, Delete, RemoveRedEye } from "@mui/icons-material";
import {
    TableRow,
    TableCell,
    Tooltip,
    IconButton,
    AlertColor,
    styled,
    tableCellClasses,
    Box,
} from "@mui/material";
import useDeleteMutation from "../hooks/useDeleteMutation";
import { getTimeFromStringDate } from "utils/common";
import { useTranslation } from "next-i18next";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    [`&.${tableCellClasses.paddingNone}`]: {
        padding: "5px 16px",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
export const TableData = <T extends Record<string, any>>(
    props: ITableData<T> & { children?: React.ReactNode }
) => {
    const { deleteQuery = "", refetchPage } = props;
    const { t } = useTranslation();
    const showSnackbar = useSnackbar();
    const showSnackbarStatus = (message: string, type: AlertColor) => {
        showSnackbar({
            children: t(message),
            variant: "filled",
            severity: type,
        });
    };
    const [open, setOpen] = useState<boolean>(false);
    const { mutate } = useDeleteMutation(deleteQuery, refetchPage, showSnackbarStatus);
    const [selectedToDeleteId, setSelectedToDeleteId] = useState<number>(0);
    const handleClose = async (
        e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => {
        if (action === "CONFIRM") {
            mutate({
                id: selectedToDeleteId,
            });
        }
        setOpen(false);
    };
    return (
        <React.Fragment>
            <ConfirmModal
                open={open}
                message={t("table:deleteConfirm")}
                handleClose={handleClose}
            />
            {props.rows?.map((row: T, indexRow: number) => {
                return (
                    <StyledTableRow key={row.id}>
                        {props.columns.map((column: IColumn, index: number) => {
                            const { render, link, renderLink } = column;
                            if (render !== undefined) {
                                return (
                                    <StyledTableCell
                                        width={column.width || undefined}
                                        key={index}
                                        padding={"none"}
                                    >
                                        {render(row[column.field])}
                                    </StyledTableCell>
                                );
                            }
                            if (column.type === "index") {
                                return (
                                    <StyledTableCell width={column.width || undefined} key={index}>
                                        {!link ? (
                                            indexRow + 1
                                        ) : (
                                            <a href={`${link}/${row.id}`}>{indexRow + 1}</a>
                                        )}
                                    </StyledTableCell>
                                );
                            }
                            if (column.type === "object") {
                                return (
                                    <StyledTableCell
                                        width={column.width || undefined}
                                        key={index}
                                        padding={"none"}
                                    >
                                        {row[column.field]
                                            ? row[column.field][column.subField || ""]
                                            : ""}
                                    </StyledTableCell>
                                );
                            }
                            if (column.type === "timestamp") {
                                return (
                                    <StyledTableCell
                                        width={column.width || undefined}
                                        key={index}
                                        padding={"none"}
                                    >
                                        {row[column.field]
                                            ? row[column.field][column.subField || ""]
                                                ? row[column.field][column.subField || ""]
                                                : getTimeFromStringDate(row[column.field]) ||
                                                  row[column.field]
                                            : ""}
                                    </StyledTableCell>
                                );
                            }
                            return (
                                <StyledTableCell
                                    width={column.width || undefined}
                                    key={index}
                                    padding={"none"}
                                >
                                    {link ? (
                                        <a href={`${link}/${row.id}`}>{row[column.field]}</a>
                                    ) : renderLink !== undefined ? (
                                        <a href={`${renderLink(row)}`}>{row[column.field]}</a>
                                    ) : (
                                        row[column.field]
                                    )}
                                </StyledTableCell>
                            );
                        })}
                        {(props.isHaveActionDelete ||
                            props.isHaveActionEdit ||
                            props.isHaveActionView) && (
                            <StyledTableCell width={160} padding={"none"}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    {props.isHaveActionEdit && (
                                        <Tooltip title={String(t("table:updateTooltip"))}>
                                            <IconButton
                                                size="large"
                                                onClick={() => {
                                                    if (props.action?.onEdit) {
                                                        props.action?.onEdit(row, () => {
                                                            props.refetchPage();
                                                        });
                                                    }
                                                }}
                                            >
                                                <ModeEdit />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    {props.isHaveActionView && (
                                        <Tooltip title={String(t("table:viewTooltip"))}>
                                            <IconButton
                                                size="large"
                                                onClick={() => {
                                                    if (props.action?.onView) {
                                                        props.action?.onView(row);
                                                    }
                                                }}
                                            >
                                                <RemoveRedEye />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    {props.isHaveActionDelete && (
                                        <Tooltip title={String(t("table:deleteTooltip"))}>
                                            <IconButton
                                                size="large"
                                                onClick={() => {
                                                    setOpen(true);
                                                    setSelectedToDeleteId(row.id);
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                            </StyledTableCell>
                        )}
                    </StyledTableRow>
                );
            })}
        </React.Fragment>
    );
};
