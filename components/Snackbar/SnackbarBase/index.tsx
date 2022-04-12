import React from "react";

import {
    Snackbar as MaterialSnackbar,
    SnackbarProps as MaterialSnackbarProps,
    Slide as MaterialSlide,
    SlideProps as MaterialSlideProps,
    Alert as MaterialAlert,
    AlertProps as MaterialAlertProps,
} from "@mui/material";

export interface SlideBaseProps extends MaterialSlideProps {
    unmountOnExit?: boolean;
    mountOnEnter?: boolean;
}

export interface AlertBaseProps extends MaterialAlertProps {}

export interface SnackbarBaseProps extends MaterialSnackbarProps {}

const SlideBase = React.forwardRef<unknown, SlideBaseProps>((props: SlideBaseProps, ref) => {
    return <MaterialSlide ref={ref} {...props} />;
});

const SnackbarBase = (props: SnackbarBaseProps) => {
    return <MaterialSnackbar TransitionComponent={SlideBase} {...props} />;
};

export const AlertBase = React.forwardRef<HTMLDivElement, AlertBaseProps>(
    (props: AlertBaseProps, ref) => {
        const { variant, ...rest } = props;
        return <MaterialAlert variant={variant || "filled"} {...rest} ref={ref} />;
    }
);

export default SnackbarBase;
