import axios from 'axios';

const API_URL = 'https://juntocash-1.onrender.com/categories/'

//Get income categories for wallet
const getIncomeCategories = async (walledId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + `${walledId}/income`, config)
    return response.data
}

//Get expense categories for wallet
const getExpenseCategories = async (walledId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + `${walledId}/expense`, config)
    return response.data
}

const categorieService = {
    getIncomeCategories,
    getExpenseCategories
}
export default categorieService;
