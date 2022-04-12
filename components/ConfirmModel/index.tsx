import { useTranslation } from "next-i18next";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export interface IConfirmModel {
    message: string;
    open: boolean;
    handleClose: (
        e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => void;
}
export const ConfirmModal: React.FC<IConfirmModel> = (props: IConfirmModel) => {
    const { open, handleClose, message } = props;
    const { t } = useTranslation();
    return (
        <Dialog open={open}>
            <DialogTitle>{t("common:confirmHeader")}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => handleClose(e, "CONFIRM")} color="primary" autoFocus>
                    {t("common:approve")}
                </Button>
                <Button onClick={(e) => handleClose(e, "CANCEL")} color="secondary">
                    {t("common:cancel")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
