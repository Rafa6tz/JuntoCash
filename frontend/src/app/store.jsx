import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import wallerReducer from "../features/wallet/walletSlice";
import transactionReducer from "../features/transaction/transactionSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        wallet: wallerReducer,
        transaction: transactionReducer
    }
})