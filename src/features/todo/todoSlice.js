import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

const initialState = {
    todos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null
};

//create new todo
export const createTodo = createAsyncThunk('todos/create', async (todoData, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.data.token;

        return await todoService.createTodo(todoData, token);

    } catch (error) {

        const message = (error.response && error.response.data && error.response.data.message) || error.message || error;

        return thunkAPI.rejectWithValue(message)

    }
})

//Get todo list
export const getTodoList = createAsyncThunk('todo/getAll', async (_, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.data.token;

        return await todoService.getTodoList(token);

    } catch (error) {

        const message = (error.response && error.response.data && error.response.data.message) || error.message || error;

        return thunkAPI.rejectWithValue(message)

    }
})

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodo.pending, (state) => {

                state.isLoading = true

            })
            .addCase(createTodo.fulfilled, (state, action) => {

                state.isLoading = false;

                state.isSuccess = true;

                state.todos.push(action.payload)

            })
            .addCase(createTodo.rejected, (state, action) => {

                state.isLoaded = false;

                state.isError = true;

                state.message = action.payload

            })
            .addCase(getTodoList.pending, (state) => {

                state.isLoading = true

            })
            .addCase(getTodoList.fulfilled, (state, action) => {

                state.isLoading = false;

                state.isSuccess = true;

                state.todos = action.payload

            })
            .addCase(getTodoList.rejected, (state, action) => {

                state.isLoaded = false;

                state.isError = true;

                state.message = action.payload

            })
    }
});

export const { reset } = todoSlice.actions
export default todoSlice.reducer
