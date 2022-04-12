import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

type IModalConfirmType = {
    title: string;
    open: boolean;
    handleClose: (
        e: {} | React.MouseEvent<HTMLButtonElement | MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => void;
    children: React.ReactNode;
};
const ModalLayout: React.FC<IModalConfirmType> = ({ title, open, handleClose, children }) => {
    return (
        <Dialog open={open}>
            <DialogTitle>{title || "Confirm"}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={(e) => handleClose(e, "CONFIRM")} color="primary" autoFocus>
                    Confirm
                </Button>
                <Button onClick={(e) => handleClose(e, "CANCEL")} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalLayout;
