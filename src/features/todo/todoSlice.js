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
export const getTodoList = createAsyncThunk('todo/getAll', async (filters, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.data.token;

        return await todoService.getTodoList(filters, token);

    } catch (error) {

        const message = (error.response && error.response.data && error.response.data.message) || error.message || error;

        return thunkAPI.rejectWithValue(message)

    }
});

//Delete Todo
export const deleteTodo = createAsyncThunk('todo/delete', async (id, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.data.token;

        return await todoService.deleteTodo(id, token);

    } catch (error) {

        const message = (error.response && error.response.data && error.response.data.message) || error.message || error;

        return thunkAPI.rejectWithValue(message)

    }
})

//update todo
export const updateTodo = createAsyncThunk('todos/update', async (todoData, thunkAPI) => {

    try {


        const token = thunkAPI.getState().auth.user.data.token;

        return await todoService.updateTodo(todoData[0], todoData[1], token);

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
            .addCase(deleteTodo.pending, (state) => {

                state.isLoading = true

            })
            .addCase(deleteTodo.fulfilled, (state, action) => {

                state.isLoading = false;

                state.isSuccess = true;

                state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)

            })
            .addCase(deleteTodo.rejected, (state, action) => {

                state.isLoaded = false;

                state.isError = true;

                state.message = action.payload

            })
            .addCase(updateTodo.pending, (state) => {

                state.isLoading = true

            })
            .addCase(updateTodo.fulfilled, (state, action) => {

                state.isLoading = false;

                state.isSuccess = true;

            })
            .addCase(updateTodo.rejected, (state, action) => {

                state.isLoaded = false;

                state.isError = true;

                state.message = action.payload

            })
    }
});

export const { reset } = todoSlice.actions
export default todoSlice.reducer
