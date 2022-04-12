import { ICheckBoxHeader, IColumn } from "../models";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import useSnackbar from "../../Snackbar/useSnackbar";
import { useTranslation } from "next-i18next";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CheckboxesHeader: React.FC<ICheckBoxHeader> = (props: ICheckBoxHeader) => {
    const { t } = useTranslation();
    const showSnackbar = useSnackbar();
    return (
        <Autocomplete
            multiple
            id="checkbox header"
            options={props.columns}
            disableCloseOnSelect
            value={props.selectedColumns as IColumn[]}
            isOptionEqualToValue={(option, value) => option.field === value.field}
            getOptionLabel={(option) => option.title}
            onChange={(event, newValue) => {
                if (newValue.length !== 0) {
                    newValue = newValue.sort((a, b) => {
                        return a.index - b.index;
                    });
                    props.setSelectedColumns([...newValue]);
                } else {
                    showSnackbar({
                        severity: "warning",
                        children: t("table:notifyFiltering"),
                    });
                }
            }}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {t(option.title)}
                </li>
            )}
            style={{ width: 500 }}
            renderTags={() => null}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size="small"
                    variant="standard"
                    value={t("table:currentSelect", {
                        rowNumber: props.selectedColumns.length,
                    })}
                    placeholder={t("table:currentSelect", {
                        rowNumber: props.selectedColumns.length,
                    })}
                />
            )}
        />
    );
};
