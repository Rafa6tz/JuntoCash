import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categorieService from "./categorieService";

const initialState = {
    incomeCategories: [],
    expenseCategories: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Get income categories for wallet
export const getIncomeCategories = createAsyncThunk('categories/getIncome', async(walledId, thunkAPI) => {
    try {
        const state = thunkAPI.getState()
        const token = state.auth.user.token
        return await categorieService.getIncomeCategories(walledId, token)
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

//Get expense categories for wallet
export const getExpenseCategories = createAsyncThunk('categories/getExpense', async(walledId, thunkAPI) => {
    try {
        const state = thunkAPI.getState()
        const token = state.auth.user.token
        return await categorieService.getExpenseCategories(walledId, token)
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

export const categorieSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIncomeCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getIncomeCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.incomeCategories = action.payload
            })
            .addCase(getIncomeCategories.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getExpenseCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getExpenseCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.expenseCategories = action.payload
            })
            .addCase(getExpenseCategories.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = categorieSlice.actions
export default categorieSlice.reducer
