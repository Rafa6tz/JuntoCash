import axios from 'axios';

const API_URL = 'http://localhost:5000/categories/'

//Get income categories for wallet
const getIncomeCategories = async (walledId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + `${walledId}/income`, token)
    return response.data
}

//Get expense categories for wallet
const getExpenseCategories = async (walledId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + `${walledId}/expense`, token)
    return response.data
}

const categorieService = {
    getIncomeCategories,
    getExpenseCategories
}
export default categorieService;
