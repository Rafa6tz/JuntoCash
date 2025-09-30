import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import wallerReducer from "../features/wallet/walletSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        wallet: wallerReducer
    }
})