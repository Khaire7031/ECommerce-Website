import axios from 'axios';

const URL = 'http://localhost:8000'

export const AuthentiCateSignUp = async (data) => {
    try {
        // Asyncronuos API
        return await axios.post(`${URL}/signup`, data);
    } catch (error) {
        console.log("Error While Calling Sign API : ", error)
    }
}

