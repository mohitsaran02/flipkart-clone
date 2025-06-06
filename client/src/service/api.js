import axios from 'axios';

//const url = 'http://localhost:8000';
const url = 'https://flipkart-clone-backend-omvf.onrender.com';

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user)
    } catch (error) {
        console.log('Error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${url}/signup`, user)
    } catch (error) {
        console.log("user", user);
        console.log("url", url);
        console.log('Error while calling Signup API: ', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
}

export const getProductById = async (id) => {
    try {
        return await axios.get(`${url}/product/${id}`);
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}

export  const payUsingPaytm = async (data) => {
    try {
        let response = await axios.post(`${url}/payment`, data);
        return response.data;
    } catch (error) {
        console.log('Error', error);
    }
}