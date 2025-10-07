import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import wallerReducer from "../features/wallet/walletSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import categorieReducer from "../features/categories/categorieSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        wallet: wallerReducer,
        transaction: transactionReducer,
        categories: categorieReducer
    }
})