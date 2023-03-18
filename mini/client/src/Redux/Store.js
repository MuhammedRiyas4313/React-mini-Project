import { configureStore } from "@reduxjs/toolkit";
import AdminAuth from "./AdminAuth";
import ClientAuth from "./ClientAuth";

export const Store = configureStore({
    reducer: {
        Client: ClientAuth,
        Admin: AdminAuth,
    }
});
