import { useState } from "react";

import { FieldError } from "react-hook-form";

import { Autocomplete, TextField } from "@mui/material";
import useGetListEntity from "./hooks/useGetListEntity";
import React from "react";

export interface ICustomizeAuto {
    value: number;
    entity: string;
    displayField: string;
    label: string;
    errors?: FieldError;
    inputRef: React.Ref<HTMLInputElement>;
    errorMessage: string;
    changeValue: (key: number, value?: string) => void;
    disabled?: boolean;
    fullWidth?: boolean;
    extraFilterString?: string;
}

const CustomizeAutocomplete = (props: ICustomizeAuto) => {
    const {
        entity,
        displayField,
        errors,
        inputRef,
        errorMessage,
        changeValue,
        value,
        extraFilterString = "",
    } = props;
    const [search, setSearch] = useState("");
    const { data, isLoading, refetch } = useGetListEntity(
        entity,
        displayField,
        search,
        extraFilterString
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const [autoCompleteKey, setAutoCompleteKey] = useState(value);

    const [autoCompleteValue, setAutoCompleteValue] = useState("");

    React.useEffect(() => {
        const getData = (key: number) => {
            const value: Array<{ key: number; value: string }> = data ? data[entity] : [];
            const index: number = value.findIndex((x) => x.key === key);
            if (index != -1) {
                return value[index].value;
            }
            return "";
        };
        setAutoCompleteValue(getData(autoCompleteKey));
    }, [data, entity, autoCompleteKey]);

    React.useEffect(() => {
        refetch();
    }, [extraFilterString, refetch]);

    if (isLoading) {
        return null;
    }
    return (
        <Autocomplete<{ key: number; value: string }>
            id="select-customize"
            options={data ? data[entity] || [] : []}
            getOptionLabel={(option) => option.value}
            value={{
                key: autoCompleteKey,
                value: autoCompleteValue,
            }}
            fullWidth={props.fullWidth}
            isOptionEqualToValue={(option, value) => option.key === value.key}
            loading={isLoading}
            onChange={(_, newValue) => {
                if (newValue) {
                    changeValue(Number(newValue.key), newValue.value);
                    setAutoCompleteKey(newValue.key);
                    setAutoCompleteValue(newValue.value);
                }
            }}
            disabled={props.disabled}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
                    onChange={onChange}
                    inputRef={inputRef}
                    helperText={errors && errorMessage}
                    error={!!errors}
                />
            )}
        />
    );
};

export default CustomizeAutocomplete;
