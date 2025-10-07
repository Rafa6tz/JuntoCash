import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import walletService from "./walletService";

const initialState = {
    wallets: [],
    balance: 0,
    selectedWallet: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Get wallet balance
export const getWalletBalance = createAsyncThunk('wallet/getBalance', async(walletId, thunkAPI) => {
    try {
        const state = thunkAPI.getState()
        const token = state.auth.user.token
        return await walletService.getWalletBalance(walletId, token)
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) || 
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get all wallets from user
export const getWallets = createAsyncThunk('wallet/getWallets', async(_, thunkAPI) => {
    try {
        const state = thunkAPI.getState()
        const token = state.auth.user.token
        return await walletService.getWallets(token)
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) || 
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setSelectedWallet: (state, action) => {
            state.selectedWallet = action.payload
        },
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWalletBalance.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWalletBalance.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.balance = action.payload.balance
            })
            .addCase(getWalletBalance.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.balance = 0
            })
            .addCase(getWallets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWallets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.wallets = action.payload

                if(action.payload.length > 0 && !state.selectedWallet) {
                    state.selectedWallet = action.payload[0]
                }
            })
            .addCase(getWallets.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.wallets = []
            })
    }
})

export const { reset, setSelectedWallet } = walletSlice.actions
export default walletSlice.reducer