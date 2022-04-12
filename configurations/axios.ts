import axios from "axios";

import { NEXT_PUBLIC_API_ROOT_URL } from "./index";
// import LocalStorageUtil from "./utils/LocalStorageUtil";

export default axios.create({
    baseURL: NEXT_PUBLIC_API_ROOT_URL,
    headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${LocalStorageUtil.getToken()}`,
    },
});
