import jwt_decode from "jwt-decode";

const LOCALSTORAGE_TOKEN_NAME = "token";
class LocalStorageUtils {
    getItem(key: string) {
        if (typeof localStorage !== "undefined") {
            let item = localStorage.getItem(key);
            if (!item) {
                this.setItem(key);
                return localStorage.getItem(key);
            }
            return JSON.parse(item || "{}");
        }
        return undefined;
    }

    setItem(key: string, value = "") {
        if (typeof localStorage !== "undefined" && value !== "") {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    removeItem(key: string) {
        if (typeof localStorage !== "undefined") {
            localStorage.removeItem(key);
        }
    }

    clear() {
        if (typeof localStorage !== "undefined") {
            localStorage.clear();
        }
    }

    getUser() {
        if (typeof localStorage !== "undefined") {
            return this.getItem("user");
        }
        return undefined;
    }

    setUser(token: string) {
        if (typeof localStorage !== "undefined") {
            this.setItem(LOCALSTORAGE_TOKEN_NAME, token);
            this.setItem("user", JSON.stringify(jwt_decode(token)));
        }
        return undefined;
    }
    getToken() {
        return this.getItem(LOCALSTORAGE_TOKEN_NAME);
    }
}

export default new LocalStorageUtils();
