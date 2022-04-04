import axios from "axios"
import qs from "qs"

const API_URL = '/api/todo';


// Create Todo
const createTodo = async (todoData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }

    const response = await axios.post(API_URL, todoData, config);


    return response.data

};

// Get Todo List
const getTodoList = async (params, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params
    }

    const response = await axios.get(API_URL + '/list', config);

    return response.data

};

// Delete Todo
const deleteTodo = async (id, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + `/${id}`, config);


    return response.data

};

// update Todo
const updateTodo = async (id, todoData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }

    const response = await axios.put(API_URL + `/${id}`, todoData, config);

    return response.data

};

const todoService = {
    createTodo,
    getTodoList,
    deleteTodo,
    updateTodo
}

export default todoService