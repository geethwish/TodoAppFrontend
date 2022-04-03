import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
});

export const { reset } = todoSlice.actions
export default todoSlice.reducer
