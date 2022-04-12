import { IFilterTable, IColumn } from "../models";

import { FilterList } from "@mui/icons-material";
import {
    TableRow,
    TableCell,
    TextField,
    InputAdornment,
    Autocomplete,
    Checkbox,
    Popper,
    PopperProps,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/lab";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useTranslation } from "next-i18next";
import useSnackbar from "components/Snackbar/useSnackbar";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const FilterTable: React.FC<IFilterTable> = (props: IFilterTable) => {
    const { t } = useTranslation();
    const showSnackbar = useSnackbar();
    return (
        <TableRow>
            {props.columns?.map((column: IColumn, index: number) => {
                if (column.disableFilter) {
                    return <TableCell width={column.width || undefined} key={index}></TableCell>;
                }
                if (column.type === "enum") {
                    return (
                        <TableCell key={index} width={column.width || undefined}>
                            <Autocomplete
                                multiple
                                id="filter"
                                options={column.enumValue || []}
                                disableCloseOnSelect
                                value={
                                    props.filters[column.field].value as Array<{
                                        key: string;
                                        value: string;
                                    }>
                                }
                                isOptionEqualToValue={(option, value) => option.key === value.key}
                                getOptionLabel={(option) => option.value}
                                onChange={(event, newValue) => {
                                    if (newValue.length !== 0) {
                                        props.onEnumHandleChange(column.field, newValue);
                                    } else {
                                        showSnackbar({
                                            severity: "warning",
                                            children: t("table:notifyFiltering"),
                                        });
                                    }
                                }}
                                fullWidth
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            size="small"
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            // style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {t(option.value)}
                                    </li>
                                )}
                                PopperComponent={PopperMy}
                                renderTags={() => null}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        variant="standard"
                                        value={t("table:currentSelect", {
                                            rowNumber: props.filters[column.field].value.length,
                                        })}
                                        placeholder={
                                            props.filters[column.field].value.length ===
                                            column.enumValue?.length
                                                ? ""
                                                : t("table:currentSelect", {
                                                      rowNumber:
                                                          props.filters[column.field].value.length,
                                                  })
                                        }
                                    />
                                )}
                            />
                        </TableCell>
                    );
                }
                if (column.type === "time") {
                    return (
                        <TableCell key={index} width={column.width || undefined}>
                            <TimePicker
                                value={
                                    props.filters[column.field].value === ""
                                        ? null
                                        : new Date(props.filters[column.field].value as string)
                                }
                                ampm={false}
                                openTo="hours"
                                views={["hours", "minutes", "seconds"]}
                                inputFormat="HH:mm:ss"
                                mask="__:__:__"
                                onChange={(date) => props.onTimeHandleChange(date, column.field)}
                                renderInput={(params) => (
                                    <TextField size="small" variant="standard" {...params} />
                                )}
                            />
                        </TableCell>
                    );
                }
                if (column.type === "date") {
                    return (
                        <TableCell key={index} width={column.width || undefined}>
                            <DatePicker
                                value={
                                    props.filters[column.field].value === ""
                                        ? null
                                        : new Date(props.filters[column.field].value as string)
                                }
                                onChange={(date) => props.onTimeHandleChange(date, column.field)}
                                renderInput={(params) => (
                                    <TextField size="small" variant="standard" {...params} />
                                )}
                            />
                        </TableCell>
                    );
                }
                return (
                    <TableCell key={index} width={column.width || undefined}>
                        <TextField
                            size="small"
                            variant="standard"
                            type="text"
                            name={column.field}
                            value={props.filters[column.field].value}
                            onChange={props.onChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <FilterList />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </TableCell>
                );
            })}
            {props.isHaveAction && <TableCell width={160}></TableCell>}
        </TableRow>
    );
};

const PopperMy = function (props: PopperProps) {
    return (
        <Popper
            {...props}
            style={{
                width: "fit-content",
            }}
            placement="bottom-start"
        />
    );
};
