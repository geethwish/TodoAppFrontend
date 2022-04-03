import axios from 'axios';

const API_URL = '/api/users';


// Login users
const login = async (userData) => {

    const response = await axios.post(API_URL + '/login', userData);

    if (response.data) {

        localStorage.setItem('user', JSON.stringify(response.data))

    }

    return response.data

};

// Register users
const register = async (userData) => {

    const response = await axios.post(API_URL, userData);

    if (response.data) {

        localStorage.setItem('user', JSON.stringify(response.data))

    }

    return response.data

};

// Logout
const logout = async () => {

    localStorage.removeItem('user');

}

const authService = {
    register,
    logout,
    login
}

export default authService