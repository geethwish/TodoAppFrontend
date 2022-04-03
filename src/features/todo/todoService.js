import axios from "axios"

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
const getTodoList = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + '/list', config);


    return response.data

};

const todoService = {
    createTodo,
    getTodoList
}

export default todoService