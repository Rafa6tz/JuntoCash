import axios from "axios";


// Create new transaction
const createTransaction = async (transactionData, walletId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`http:localhost:5000/wallets/${walletId}/transactions`, transactionData, config);

    return response.data;
}

// Get user transactions
const getTransactions = async (walletId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
}

const transactionService = {
    createTransaction,
    getTransactions,
}
export default transactionService;