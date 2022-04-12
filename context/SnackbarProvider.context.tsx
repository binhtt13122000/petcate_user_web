import React, { createContext, useState } from "react";

import SnackbarBase, {
    AlertBase,
    AlertBaseProps,
    SnackbarBaseProps,
} from "components/Snackbar/SnackbarBase";

export type showSnackbar = (
    newAlert: AlertBaseProps,
    snackbarBase?: SnackbarBaseProps,
    time?: number
) => void;
export const SnackbarContext = createContext<showSnackbar>(({}) => {});

const SnackbarProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [alert, setAlert] = useState<AlertBaseProps>({});
    const [snackbar, setSnackbar] = useState<SnackbarBaseProps>({});
    const [open, setOpen] = useState<boolean>(false);

    const showSnackbar = (newAlert: AlertBaseProps, snackbarBase?: SnackbarBaseProps) => {
        setAlert({
            variant: "filled",
            severity: "success",
            ...newAlert,
        });
        if (snackbarBase) {
            setSnackbar(snackbarBase);
        }
        setOpen(true);
    };

    const handleClose = (e?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
        if (!open) {
            setAlert({});
        }
    };

    return (
        <SnackbarContext.Provider value={showSnackbar}>
            {children}
            <SnackbarBase
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open}
                onClose={() => handleClose()}
                autoHideDuration={5000}
                {...snackbar}
            >
                <AlertBase
                    sx={{ alignItems: "center" }}
                    variant="filled"
                    {...alert}
                    onClose={handleClose}
                />
            </SnackbarBase>
        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;
