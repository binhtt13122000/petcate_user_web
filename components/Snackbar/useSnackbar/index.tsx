import { useContext } from "react";

import { SnackbarContext } from "context/SnackbarProvider.context";

const useSnackbar = () => useContext(SnackbarContext);

export default useSnackbar;
