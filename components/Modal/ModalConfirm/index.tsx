import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React from "react";

type IModalConfirmType = {
    message: string;
    open: boolean;
    handleClose: (
        e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => void;
};

const ModalConfirm: React.FC<IModalConfirmType> = ({ open, handleClose, message }) => {
    return (
        <Dialog open={open}>
            <DialogTitle>CONFIRM</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
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

export default ModalConfirm;
